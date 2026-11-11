import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateGST } from './gstCalculator';

test('GST Exclusive Intra-state calculation (18% on 10,000)', () => {
  const result = calculateGST({
    amount: 10000,
    rate: 18,
    calculationType: 'exclusive',
    transactionType: 'intra_state',
  });

  assert.equal(result.taxableAmount, 10000);
  assert.equal(result.totalGst, 1800);
  assert.equal(result.cgst, 900);
  assert.equal(result.sgst, 900);
  assert.equal(result.igst, 0);
  assert.equal(result.finalInvoiceAmount, 11800);
});

test('GST Exclusive Inter-state calculation (18% on 10,000)', () => {
  const result = calculateGST({
    amount: 10000,
    rate: 18,
    calculationType: 'exclusive',
    transactionType: 'inter_state',
  });

  assert.equal(result.taxableAmount, 10000);
  assert.equal(result.totalGst, 1800);
  assert.equal(result.cgst, 0);
  assert.equal(result.sgst, 0);
  assert.equal(result.igst, 1800);
  assert.equal(result.finalInvoiceAmount, 11800);
});

test('GST Inclusive Intra-state calculation (18% on 11,800)', () => {
  const result = calculateGST({
    amount: 11800,
    rate: 18,
    calculationType: 'inclusive',
    transactionType: 'intra_state',
  });

  assert.equal(result.taxableAmount, 10000);
  assert.equal(result.totalGst, 1800);
  assert.equal(result.cgst, 900);
  assert.equal(result.sgst, 900);
  assert.equal(result.igst, 0);
  assert.equal(result.finalInvoiceAmount, 11800);
});

test('Zero rate or zero amount handles cleanly without errors', () => {
  const zeroAmount = calculateGST({
    amount: 0,
    rate: 18,
    calculationType: 'exclusive',
    transactionType: 'intra_state',
  });
  assert.equal(zeroAmount.totalGst, 0);
  assert.equal(zeroAmount.finalInvoiceAmount, 0);

  const zeroRate = calculateGST({
    amount: 5000,
    rate: 0,
    calculationType: 'exclusive',
    transactionType: 'intra_state',
  });
  assert.equal(zeroRate.taxableAmount, 5000);
  assert.equal(zeroRate.totalGst, 0);
  assert.equal(zeroRate.finalInvoiceAmount, 5000);
});
