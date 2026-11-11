/**
 * Indian Income Tax Estimator Utility
 * Decoupled calculation engine for Indian personal income tax with side-by-side regime comparison.
 */

import {
  TAX_CONFIG_BY_FY,
  DEFAULT_FY,
  type AgeCategory,
  type TaxSlab,
} from '../data/taxRules';

export interface TaxInput {
  financialYear?: string;
  ageCategory: AgeCategory;
  salaryIncome: number;
  otherIncome: number;
  deduction80C?: number;
  deduction80D?: number;
  deductionNps?: number;
  otherDeductions?: number;
}

export interface SlabBreakdown {
  slabLabel: string;
  taxableAmountInSlab: number;
  rate: number;
  taxAmount: number;
}

export interface RegimeTaxBreakdown {
  regimeName: string;
  grossIncome: number;
  standardDeduction: number;
  chapterVIADeductions: number;
  totalDeductions: number;
  taxableIncome: number;
  basicTax: number;
  slabBreakdown: SlabBreakdown[];
  rebate87A: number;
  marginalRelief: number;
  taxAfterRebate: number;
  surcharge: number;
  cess: number;
  totalTax: number;
}

export interface TaxComparisonResult {
  financialYear: string;
  assessmentYear: string;
  grossIncome: number;
  newRegime: RegimeTaxBreakdown;
  oldRegime: RegimeTaxBreakdown;
  recommendedRegime: 'new' | 'old' | 'equal';
  taxSavings: number;
  disclaimer: string;
}

export function calculateSlabTax(
  taxableIncome: number,
  slabs: TaxSlab[]
): { basicTax: number; slabBreakdown: SlabBreakdown[] } {
  let remaining = Math.max(0, taxableIncome);
  let totalTax = 0;
  const breakdown: SlabBreakdown[] = [];

  for (const slab of slabs) {
    if (remaining <= slab.min) {
      break;
    }

    const slabUpper = slab.max !== null ? slab.max : Infinity;
    const slabSpan = slabUpper - slab.min;
    const taxableInThisSlab = Math.min(Math.max(0, remaining - slab.min), slabSpan);

    const taxForSlab = Math.round((taxableInThisSlab * slab.rate) / 100);
    totalTax += taxForSlab;

    const label =
      slab.max !== null
        ? `₹${(slab.min / 100000).toFixed(1)}L – ₹${(slab.max / 100000).toFixed(1)}L (${slab.rate}%)`
        : `Above ₹${(slab.min / 100000).toFixed(1)}L (${slab.rate}%)`;

    breakdown.push({
      slabLabel: label,
      taxableAmountInSlab: taxableInThisSlab,
      rate: slab.rate,
      taxAmount: taxForSlab,
    });
  }

  return { basicTax: totalTax, slabBreakdown: breakdown };
}

export function computeRegimeTax(
  grossIncome: number,
  salaryIncome: number,
  eligibleChapterVIA: number,
  standardDeductionRate: number,
  rebateLimit: number,
  maxRebate: number,
  slabs: TaxSlab[],
  regimeName: string,
  isNewRegime: boolean
): RegimeTaxBreakdown {
  // Standard deduction applies only up to salary income
  const standardDeduction = Math.min(salaryIncome, standardDeductionRate);
  const chapterVIADeductions = isNewRegime ? 0 : eligibleChapterVIA;
  const totalDeductions = standardDeduction + chapterVIADeductions;
  const taxableIncome = Math.max(0, grossIncome - totalDeductions);

  const { basicTax, slabBreakdown } = calculateSlabTax(taxableIncome, slabs);

  let rebate87A = 0;
  let marginalRelief = 0;
  let taxAfterRebate = basicTax;

  if (taxableIncome <= rebateLimit) {
    // 100% rebate under section 87A up to max rebate
    rebate87A = Math.min(basicTax, maxRebate);
    taxAfterRebate = Math.max(0, basicTax - rebate87A);
  } else if (isNewRegime && taxableIncome > 700000) {
    // Marginal relief under New Regime: tax cannot exceed excess income over 7,00,000
    const excessIncome = taxableIncome - 700000;
    if (basicTax > excessIncome) {
      marginalRelief = basicTax - excessIncome;
      taxAfterRebate = excessIncome;
    }
  }

  // Surcharge (Standard Indian personal tax rates for high income)
  let surchargeRate = 0;
  if (taxableIncome > 20000000) {
    surchargeRate = isNewRegime ? 0.25 : 0.25; // Budget capped new regime surcharge at 25%
  } else if (taxableIncome > 10000000) {
    surchargeRate = 0.15;
  } else if (taxableIncome > 5000000) {
    surchargeRate = 0.10;
  }
  const surcharge = Math.round(taxAfterRebate * surchargeRate);

  // Health and Education Cess: 4% of (tax + surcharge)
  const cess = Math.round((taxAfterRebate + surcharge) * 0.04);
  const totalTax = taxAfterRebate + surcharge + cess;

  return {
    regimeName,
    grossIncome,
    standardDeduction,
    chapterVIADeductions,
    totalDeductions,
    taxableIncome,
    basicTax,
    slabBreakdown,
    rebate87A,
    marginalRelief,
    taxAfterRebate,
    surcharge,
    cess,
    totalTax,
  };
}

export function estimateIncomeTax(input: TaxInput): TaxComparisonResult {
  const fyKey = input.financialYear && TAX_CONFIG_BY_FY[input.financialYear] ? input.financialYear : DEFAULT_FY;
  const config = TAX_CONFIG_BY_FY[fyKey];

  const salary = Math.max(0, Number(input.salaryIncome) || 0);
  const other = Math.max(0, Number(input.otherIncome) || 0);
  const grossIncome = salary + other;

  // Chapter VI-A deductions for Old Regime
  const raw80C = Math.max(0, Number(input.deduction80C) || 0);
  const capped80C = Math.min(raw80C, 150000); // 80C cap ₹1.5L
  const raw80D = Math.max(0, Number(input.deduction80D) || 0);
  const rawNps = Math.max(0, Number(input.deductionNps) || 0);
  const cappedNps = Math.min(rawNps, 50000); // 80CCD(1B) cap ₹50k
  const rawOther = Math.max(0, Number(input.otherDeductions) || 0);

  const totalOldDeductions = capped80C + raw80D + cappedNps + rawOther;

  const age = input.ageCategory || 'normal';

  // New Regime Calculation
  const newSlabs = config.newRegime.slabsByAge[age];
  const newRegimeResult = computeRegimeTax(
    grossIncome,
    salary,
    0,
    config.newRegime.standardDeductionSalary,
    config.newRegime.rebate87ALimit,
    config.newRegime.maxRebate87A,
    newSlabs,
    config.newRegime.name,
    true
  );

  // Old Regime Calculation
  const oldSlabs = config.oldRegime.slabsByAge[age];
  const oldRegimeResult = computeRegimeTax(
    grossIncome,
    salary,
    totalOldDeductions,
    config.oldRegime.standardDeductionSalary,
    config.oldRegime.rebate87ALimit,
    config.oldRegime.maxRebate87A,
    oldSlabs,
    config.oldRegime.name,
    false
  );

  let recommendedRegime: 'new' | 'old' | 'equal' = 'equal';
  let taxSavings = 0;

  if (newRegimeResult.totalTax < oldRegimeResult.totalTax) {
    recommendedRegime = 'new';
    taxSavings = oldRegimeResult.totalTax - newRegimeResult.totalTax;
  } else if (oldRegimeResult.totalTax < newRegimeResult.totalTax) {
    recommendedRegime = 'old';
    taxSavings = newRegimeResult.totalTax - oldRegimeResult.totalTax;
  }

  return {
    financialYear: config.financialYear,
    assessmentYear: config.assessmentYear,
    grossIncome,
    newRegime: newRegimeResult,
    oldRegime: oldRegimeResult,
    recommendedRegime,
    taxSavings,
    disclaimer:
      'This calculator provides an indicative tax estimate based on the information entered. Actual tax liability may differ depending on applicable provisions, deductions, exemptions and individual circumstances. Please consult a tax professional for a final computation.',
  };
}
