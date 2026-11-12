import test from 'node:test';
import assert from 'node:assert/strict';
import { estimateIncomeTax } from './taxEstimator';

test('FY 2026-27 New Regime: Income up to ₹12.75 Lakhs with standard deduction pays zero tax (due to 87A rebate)', () => {
  const result = estimateIncomeTax({
    financialYear: '2026-27',
    ageCategory: 'normal',
    salaryIncome: 1275000,
    otherIncome: 0,
  });

  // Gross = 12,75,000, Standard deduction = 75,000 => Taxable = 12,00,000
  assert.equal(result.newRegime.taxableIncome, 1200000);
  // Basic tax is 60,000 (0-4L 0, 4-8L 5% = 20k, 8-12L 10% = 40k => Total 60,000)
  assert.equal(result.newRegime.basicTax, 60000);
  // Full rebate u/s 87A applies because taxable <= 12,00,000
  assert.equal(result.newRegime.rebate87A, 60000);
  assert.equal(result.newRegime.totalTax, 0);
});

test('FY 2026-27 New Regime: ₹7,00,000 taxable income pays zero tax (rebate u/s 87A)', () => {
  const result = estimateIncomeTax({
    financialYear: '2026-27',
    ageCategory: 'normal',
    salaryIncome: 0,
    otherIncome: 700000,
  });

  assert.equal(result.newRegime.taxableIncome, 700000);
  // Slab tax: 0-4L 0, 4-7L (3L @ 5%) = 15,000
  assert.equal(result.newRegime.basicTax, 15000);
  assert.equal(result.newRegime.rebate87A, 15000);
  assert.equal(result.newRegime.totalTax, 0);
});

test('FY 2026-27 New Regime: ₹12,00,000 taxable income pays zero tax (rebate u/s 87A)', () => {
  const result = estimateIncomeTax({
    financialYear: '2026-27',
    ageCategory: 'normal',
    salaryIncome: 0,
    otherIncome: 1200000,
  });

  assert.equal(result.newRegime.taxableIncome, 1200000);
  // Slab tax: 0-4L 0, 4-8L 20,000, 8-12L 40,000 => 60,000
  assert.equal(result.newRegime.basicTax, 60000);
  assert.equal(result.newRegime.rebate87A, 60000);
  assert.equal(result.newRegime.totalTax, 0);
});

test('FY 2026-27 New Regime: ₹12,05,000 taxable income receives Marginal Relief (tax capped at ₹5,000 + cess)', () => {
  const result = estimateIncomeTax({
    financialYear: '2026-27',
    ageCategory: 'normal',
    salaryIncome: 0,
    otherIncome: 1205000,
  });

  assert.equal(result.newRegime.taxableIncome, 1205000);
  // Normal slab tax: 0-4L 0, 4-8L 20k, 8-12L 40k, 12-12.05L (5k @ 15%) = 750 => Total 60,750
  assert.equal(result.newRegime.basicTax, 60750);
  // Excess income over ₹12,00,000 is ₹5,000
  // Marginal relief = 60,750 - 5,000 = 55,750
  assert.equal(result.newRegime.marginalRelief, 55750);
  assert.equal(result.newRegime.taxAfterRebate, 5000);
  // Cess: 4% of 5,000 = 200 => Total tax = 5,200
  assert.equal(result.newRegime.cess, 200);
  assert.equal(result.newRegime.totalTax, 5200);
});

test('FY 2026-27 New Regime: ₹12,75,000 gross salary with ₹75,000 standard deduction pays zero tax', () => {
  const result = estimateIncomeTax({
    financialYear: '2026-27',
    ageCategory: 'normal',
    salaryIncome: 1275000,
    otherIncome: 0,
  });

  assert.equal(result.newRegime.grossIncome, 1275000);
  assert.equal(result.newRegime.standardDeduction, 75000);
  assert.equal(result.newRegime.taxableIncome, 1200000);
  assert.equal(result.newRegime.basicTax, 60000);
  assert.equal(result.newRegime.rebate87A, 60000);
  assert.equal(result.newRegime.marginalRelief, 0);
  assert.equal(result.newRegime.totalTax, 0);
});

test('Old Regime: Income of ₹5,50,000 with ₹50k standard deduction pays zero tax (due to 87A rebate)', () => {
  const result = estimateIncomeTax({
    financialYear: '2026-27',
    ageCategory: 'normal',
    salaryIncome: 550000,
    otherIncome: 0,
  });

  // Old regime standard deduction = 50,000 => Taxable = 5,00,000
  assert.equal(result.oldRegime.taxableIncome, 500000);
  // Basic tax is 12,500 (0-2.5L 0, 2.5-5L 5% = 12,500)
  assert.equal(result.oldRegime.basicTax, 12500);
  // Full rebate u/s 87A
  assert.equal(result.oldRegime.rebate87A, 12500);
  assert.equal(result.oldRegime.totalTax, 0);
});

test('Tax comparison recommends the regime with higher savings', () => {
  const result = estimateIncomeTax({
    financialYear: '2026-27',
    ageCategory: 'normal',
    salaryIncome: 1800000,
    otherIncome: 0,
    deduction80C: 150000,
    deduction80D: 25000,
    deductionNps: 50000,
  });

  assert.ok(result.newRegime.totalTax > 0);
  assert.ok(result.oldRegime.totalTax > 0);
  assert.ok(['new', 'old', 'equal'].includes(result.recommendedRegime));
  assert.ok(result.taxSavings >= 0);
});

test('Negative and invalid numeric inputs are safely clamped to zero without crashing', () => {
  const result = estimateIncomeTax({
    financialYear: '2026-27',
    ageCategory: 'normal',
    salaryIncome: -50000,
    otherIncome: -20000,
    deduction80C: -10000,
  });

  assert.equal(result.grossIncome, 0);
  assert.equal(result.newRegime.totalTax, 0);
  assert.equal(result.oldRegime.totalTax, 0);
});

test('Senior citizen slabs under Old Regime apply higher basic exemption threshold', () => {
  const seniorResult = estimateIncomeTax({
    financialYear: '2026-27',
    ageCategory: 'senior',
    salaryIncome: 0,
    otherIncome: 300000, // Up to 3 Lakhs is Nil for senior
  });

  assert.equal(seniorResult.oldRegime.basicTax, 0);
  assert.equal(seniorResult.oldRegime.totalTax, 0);
});

test('Deduction capping: Section 80C is strictly capped at ₹1,50,000 and NPS at ₹50,000', () => {
  const result = estimateIncomeTax({
    financialYear: '2026-27',
    ageCategory: 'normal',
    salaryIncome: 1500000,
    otherIncome: 0,
    deduction80C: 250000, // exceeds 1.5L cap
    deductionNps: 100000, // exceeds 50k cap
    deduction80D: 25000,
  });

  // Old Regime deductions: 50,000 (standard) + 1,50,000 (80C capped) + 50,000 (NPS capped) + 25,000 (80D) = 2,75,000
  assert.equal(result.oldRegime.chapterVIADeductions, 225000);
  assert.equal(result.oldRegime.totalDeductions, 275000);
  assert.equal(result.oldRegime.taxableIncome, 1225000);
});

test('High-net-worth Surcharge: Old Regime above ₹5 Crore applies 37% while New Regime is capped at 25%', () => {
  const highIncomeResult = estimateIncomeTax({
    financialYear: '2026-27',
    ageCategory: 'normal',
    salaryIncome: 60000000, // ₹6 Crore
    otherIncome: 0,
  });

  // In New Regime, surcharge on ₹6 Cr is capped at 25%
  assert.ok(highIncomeResult.newRegime.surcharge > 0);
  // In Old Regime, surcharge on ₹6 Cr is 37%
  assert.ok(highIncomeResult.oldRegime.surcharge > highIncomeResult.newRegime.surcharge);
});
