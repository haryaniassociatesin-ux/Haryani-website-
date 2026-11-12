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

test('Custom decimal rate calculation (12.5% on ₹20,000)', () => {
  const result = calculateGST({
    amount: 20000,
    rate: 12.5,
    calculationType: 'exclusive',
    transactionType: 'intra_state',
  });

  assert.equal(result.taxableAmount, 20000);
  assert.equal(result.totalGst, 2500);
  assert.equal(result.cgst, 1250);
  assert.equal(result.sgst, 1250);
  assert.equal(result.igst, 0);
  assert.equal(result.finalInvoiceAmount, 22500);
});

test('Negative amounts are safely clamped to zero', () => {
  const result = calculateGST({
    amount: -15000,
    rate: 18,
    calculationType: 'exclusive',
    transactionType: 'intra_state',
  });

  assert.equal(result.taxableAmount, 0);
  assert.equal(result.totalGst, 0);
  assert.equal(result.finalInvoiceAmount, 0);
});

test('Standard GST Rates: 5%, 12%, 28% intra-state and inter-state calculations', () => {
  // 5% Intra-state
  const r5Intra = calculateGST({ amount: 1000, rate: 5, calculationType: 'exclusive', transactionType: 'intra_state' });
  assert.equal(r5Intra.totalGst, 50);
  assert.equal(r5Intra.cgst, 25);
  assert.equal(r5Intra.sgst, 25);
  assert.equal(r5Intra.igst, 0);
  assert.equal(r5Intra.finalInvoiceAmount, 1050);

  // 12% Inter-state
  const r12Inter = calculateGST({ amount: 5000, rate: 12, calculationType: 'exclusive', transactionType: 'inter_state' });
  assert.equal(r12Inter.totalGst, 600);
  assert.equal(r12Inter.cgst, 0);
  assert.equal(r12Inter.sgst, 0);
  assert.equal(r12Inter.igst, 600);
  assert.equal(r12Inter.finalInvoiceAmount, 5600);

  // 28% Inclusive Intra-state
  const r28Inclusive = calculateGST({ amount: 1280, rate: 28, calculationType: 'inclusive', transactionType: 'intra_state' });
  assert.equal(r28Inclusive.taxableAmount, 1000);
  assert.equal(r28Inclusive.totalGst, 280);
  assert.equal(r28Inclusive.cgst, 140);
  assert.equal(r28Inclusive.sgst, 140);
  assert.equal(r28Inclusive.igst, 0);
});

test('Correct rounding to two decimal places without floating point drift', () => {
  // Amount with fractional division
  const result = calculateGST({ amount: 999.99, rate: 18, calculationType: 'exclusive', transactionType: 'intra_state' });
  assert.equal(result.taxableAmount, 999.99);
  assert.equal(result.totalGst, 180);
  assert.equal(result.cgst, 90);
  assert.equal(result.sgst, 90);
  assert.equal(result.finalInvoiceAmount, 1179.99);
});
