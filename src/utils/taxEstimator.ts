/**
 * Indian Income Tax Estimator Utility
 * Decoupled calculation engine for Indian personal income tax with side-by-side regime comparison.
 */

import {
  TAX_CONFIG_BY_FY,
  DEFAULT_FY,
  TAX_DISCLAIMER,
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
  } else if (isNewRegime && taxableIncome > rebateLimit) {
    // Marginal relief under New Regime: tax cannot exceed excess income over the rebate threshold (e.g. ₹12,00,000 for FY 2026-27 or ₹7,00,000 for FY 2024-25)
    const excessIncome = taxableIncome - rebateLimit;
    if (basicTax > excessIncome) {
      marginalRelief = basicTax - excessIncome;
      taxAfterRebate = excessIncome;
    }
  }

  // Surcharge (Standard Indian personal tax rates for high net-worth income)
  let surcharge = 0;
  if (taxableIncome > 5000000) {
    let surchargeRate = 0;
    let threshold = 5000000;

    if (!isNewRegime && taxableIncome > 50000000) {
      surchargeRate = 0.37; // 37% surcharge for Old Regime above ₹5 Crore
      threshold = 50000000;
    } else if (taxableIncome > 20000000) {
      surchargeRate = 0.25; // Capped at 25% under New Regime
      threshold = 20000000;
    } else if (taxableIncome > 10000000) {
      surchargeRate = 0.15;
      threshold = 10000000;
    } else {
      surchargeRate = 0.10;
      threshold = 5000000;
    }

    const rawSurcharge = Math.round(taxAfterRebate * surchargeRate);

    // Surcharge Marginal Relief:
    // Total (Tax + Surcharge) cannot exceed (Tax at threshold + Surcharge at threshold) + (Taxable Income - Threshold)
    const { basicTax: taxAtThreshold } = calculateSlabTax(threshold, slabs);
    let thresholdSurchargeRate = 0;
    if (threshold === 10000000) thresholdSurchargeRate = 0.10;
    else if (threshold === 20000000) thresholdSurchargeRate = 0.15;
    else if (threshold === 50000000) thresholdSurchargeRate = 0.25;

    const maxAllowedTaxPlusSurcharge = (taxAtThreshold * (1 + thresholdSurchargeRate)) + (taxableIncome - threshold);
    const actualTaxPlusSurcharge = taxAfterRebate + rawSurcharge;

    if (actualTaxPlusSurcharge > maxAllowedTaxPlusSurcharge) {
      const relief = actualTaxPlusSurcharge - maxAllowedTaxPlusSurcharge;
      surcharge = Math.max(0, rawSurcharge - relief);
    } else {
      surcharge = rawSurcharge;
    }
  }

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
    disclaimer: TAX_DISCLAIMER,
  };
}
