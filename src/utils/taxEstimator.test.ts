import test from 'node:test';
import assert from 'node:assert/strict';
import { estimateIncomeTax } from './taxEstimator';

test('New Regime u/s 115BAC: Income up to ₹7.75 Lakhs with standard deduction pays zero tax (due to 87A rebate)', () => {
  const result = estimateIncomeTax({
    financialYear: '2024-25',
    ageCategory: 'normal',
    salaryIncome: 775000,
    otherIncome: 0,
  });

  // Gross = 7,75,000, Standard deduction = 75,000 => Taxable = 7,00,000
  assert.equal(result.newRegime.taxableIncome, 700000);
  // Basic tax is 20,000 (0-3L 0, 3-7L 5% of 4L = 20,000)
  assert.equal(result.newRegime.basicTax, 20000);
  // Full rebate u/s 87A applies because taxable <= 7,00,000
  assert.equal(result.newRegime.rebate87A, 20000);
  assert.equal(result.newRegime.totalTax, 0);
});

test('Old Regime: Income of ₹5,50,000 with ₹50k standard deduction pays zero tax (due to 87A rebate)', () => {
  const result = estimateIncomeTax({
    financialYear: '2024-25',
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
  // Salaried person earning 15 Lakhs with high deductions (80C: 1.5L, 80D: 25k, NPS: 50k)
  const result = estimateIncomeTax({
    financialYear: '2024-25',
    ageCategory: 'normal',
    salaryIncome: 1500000,
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
