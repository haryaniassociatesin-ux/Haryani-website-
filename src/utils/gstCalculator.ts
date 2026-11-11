/**
 * Indian GST Calculation Utility
 * Pure functions for GST-inclusive, GST-exclusive, intra-state and inter-state math.
 */

export type GstCalculationType = 'exclusive' | 'inclusive';
export type GstTransactionType = 'intra_state' | 'inter_state';

export interface GstInput {
  amount: number;
  rate: number; // percentage, e.g. 18 for 18%
  calculationType: GstCalculationType;
  transactionType: GstTransactionType;
}

export interface GstResult {
  originalAmount: number;
  taxableAmount: number;
  gstRate: number;
  totalGst: number;
  cgst: number;
  sgst: number;
  igst: number;
  finalInvoiceAmount: number;
  calculationType: GstCalculationType;
  transactionType: GstTransactionType;
  isIntraState: boolean;
}

/**
 * Rounds a number to two decimal places
 */
export function round2(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

/**
 * Calculates Indian GST breakdown based on statutory rules.
 */
export function calculateGST(input: GstInput): GstResult {
  const amount = Math.max(0, Number(input.amount) || 0);
  const rate = Math.max(0, Number(input.rate) || 0);
  const isExclusive = input.calculationType === 'exclusive';
  const isIntraState = input.transactionType === 'intra_state';

  let taxableAmount = 0;
  let totalGst = 0;
  let finalInvoiceAmount = 0;

  if (amount === 0 || rate === 0) {
    taxableAmount = amount;
    totalGst = 0;
    finalInvoiceAmount = amount;
  } else if (isExclusive) {
    // GST = Taxable Amount × GST Rate / 100
    // Total Amount = Taxable Amount + GST
    taxableAmount = amount;
    totalGst = round2((taxableAmount * rate) / 100);
    finalInvoiceAmount = round2(taxableAmount + totalGst);
  } else {
    // Inclusive:
    // Taxable Amount = Inclusive Amount / (1 + GST Rate / 100)
    // GST = Inclusive Amount - Taxable Amount
    taxableAmount = round2(amount / (1 + rate / 100));
    totalGst = round2(amount - taxableAmount);
    finalInvoiceAmount = amount;
  }

  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  if (isIntraState) {
    // Intra-state split: 50% CGST and 50% SGST. IGST is strictly 0.
    cgst = round2(totalGst / 2);
    sgst = round2(totalGst - cgst); // Ensure exact sum matches totalGst without rounding drift
    igst = 0;
  } else {
    // Inter-state: 100% IGST. CGST and SGST are strictly 0.
    igst = totalGst;
    cgst = 0;
    sgst = 0;
  }

  return {
    originalAmount: amount,
    taxableAmount,
    gstRate: rate,
    totalGst,
    cgst,
    sgst,
    igst,
    finalInvoiceAmount,
    calculationType: input.calculationType,
    transactionType: input.transactionType,
    isIntraState,
  };
}
