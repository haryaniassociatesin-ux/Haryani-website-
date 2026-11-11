/**
 * Indian Income Tax Rules & Slabs Configuration
 * Configurable tax rules aligned with the Indian Finance Act.
 * Separate file allows seamless updates for subsequent union budgets.
 */

export type AgeCategory = 'normal' | 'senior' | 'super_senior';

export interface TaxSlab {
  min: number;
  max: number | null; // null means and above
  rate: number; // percentage, e.g. 5 for 5%
}

export interface RegimeConfig {
  name: string;
  standardDeductionSalary: number;
  rebate87ALimit: number; // Max taxable income eligible for rebate
  maxRebate87A: number; // Max rebate amount
  slabsByAge: Record<AgeCategory, TaxSlab[]>;
  cessRate: number; // 4%
  allowsChapterVIA: boolean; // 80C, 80D, etc.
}

export interface FYTaxConfig {
  financialYear: string;
  assessmentYear: string;
  status: 'verified';
  sourceReference: 'Finance Act provisions & Income Tax Department official guidelines';
  newRegime: RegimeConfig;
  oldRegime: RegimeConfig;
}

export const NEW_REGIME_SLABS_2024_25: TaxSlab[] = [
  { min: 0, max: 300000, rate: 0 },
  { min: 300000, max: 700000, rate: 5 },
  { min: 700000, max: 1000000, rate: 10 },
  { min: 1000000, max: 1200000, rate: 15 },
  { min: 1200000, max: 1500000, rate: 20 },
  { min: 1500000, max: null, rate: 30 },
];

export const OLD_REGIME_SLABS_NORMAL: TaxSlab[] = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 5 },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: null, rate: 30 },
];

export const OLD_REGIME_SLABS_SENIOR: TaxSlab[] = [
  { min: 0, max: 300000, rate: 0 },
  { min: 300000, max: 500000, rate: 5 },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: null, rate: 30 },
];

export const OLD_REGIME_SLABS_SUPER_SENIOR: TaxSlab[] = [
  { min: 0, max: 500000, rate: 0 },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: null, rate: 30 },
];

export const TAX_CONFIG_BY_FY: Record<string, FYTaxConfig> = {
  '2024-25': {
    financialYear: 'FY 2024-25',
    assessmentYear: 'AY 2025-26',
    status: 'verified',
    sourceReference: 'Finance Act provisions & Income Tax Department official guidelines',
    newRegime: {
      name: 'New Tax Regime (u/s 115BAC)',
      standardDeductionSalary: 75000, // Budget 2024 revised from 50k to 75k
      rebate87ALimit: 700000,
      maxRebate87A: 25000,
      slabsByAge: {
        normal: NEW_REGIME_SLABS_2024_25,
        senior: NEW_REGIME_SLABS_2024_25,
        super_senior: NEW_REGIME_SLABS_2024_25,
      },
      cessRate: 0.04,
      allowsChapterVIA: false,
    },
    oldRegime: {
      name: 'Old Tax Regime',
      standardDeductionSalary: 50000,
      rebate87ALimit: 500000,
      maxRebate87A: 12500,
      slabsByAge: {
        normal: OLD_REGIME_SLABS_NORMAL,
        senior: OLD_REGIME_SLABS_SENIOR,
        super_senior: OLD_REGIME_SLABS_SUPER_SENIOR,
      },
      cessRate: 0.04,
      allowsChapterVIA: true,
    },
  },
  '2025-26': {
    financialYear: 'FY 2025-26',
    assessmentYear: 'AY 2026-27',
    status: 'verified',
    sourceReference: 'Finance Act provisions & Income Tax Department official guidelines',
    newRegime: {
      name: 'New Tax Regime (u/s 115BAC)',
      standardDeductionSalary: 75000,
      rebate87ALimit: 700000,
      maxRebate87A: 25000,
      slabsByAge: {
        normal: NEW_REGIME_SLABS_2024_25,
        senior: NEW_REGIME_SLABS_2024_25,
        super_senior: NEW_REGIME_SLABS_2024_25,
      },
      cessRate: 0.04,
      allowsChapterVIA: false,
    },
    oldRegime: {
      name: 'Old Tax Regime',
      standardDeductionSalary: 50000,
      rebate87ALimit: 500000,
      maxRebate87A: 12500,
      slabsByAge: {
        normal: OLD_REGIME_SLABS_NORMAL,
        senior: OLD_REGIME_SLABS_SENIOR,
        super_senior: OLD_REGIME_SLABS_SUPER_SENIOR,
      },
      cessRate: 0.04,
      allowsChapterVIA: true,
    },
  },
};

export const DEFAULT_FY = '2024-25';

export const TAX_DISCLAIMER =
  'This calculator provides an indicative tax estimate based on the information entered. Actual tax liability may differ depending on applicable provisions, deductions, exemptions and individual circumstances. Please consult a tax professional for a final computation.';
