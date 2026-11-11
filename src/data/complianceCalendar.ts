/**
 * Public Indian Tax Compliance Calendar
 * Configurable schedule of statutory deadlines across GST, Income Tax, TDS, and Corporate filings.
 * Verified against official Indian government statutes (CBDT & CBIC).
 */

export type ComplianceCategory =
  | 'gst'
  | 'tds_payment'
  | 'tds_return'
  | 'advance_tax'
  | 'income_tax'
  | 'other';

export interface ComplianceDeadline {
  id: string;
  category: ComplianceCategory;
  categoryLabel: string;
  dueDate: string; // YYYY-MM-DD
  month: number; // 1-12
  year: number;
  title: string;
  formOrSection: string;
  applicableTaxpayers: string;
  description: string;
  penaltyOrConsequence?: string;
  isGovernmentExtended?: boolean;
  extensionNotice?: string;
}

export const COMPLIANCE_CATEGORIES: { id: ComplianceCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Deadlines' },
  { id: 'gst', label: 'GST Returns' },
  { id: 'tds_payment', label: 'TDS Payments' },
  { id: 'tds_return', label: 'TDS Returns' },
  { id: 'advance_tax', label: 'Advance Tax' },
  { id: 'income_tax', label: 'Income Tax (ITR)' },
  { id: 'other', label: 'Other Business Compliance' },
];

export const COMPLIANCE_DEADLINES: ComplianceDeadline[] = [
  // Monthly Recurring: TDS Payment (7th of every month)
  {
    id: 'tds-pay-apr',
    category: 'tds_payment',
    categoryLabel: 'TDS Payment',
    dueDate: '2025-05-07',
    month: 5,
    year: 2025,
    title: 'Deposit of TDS / TCS for April',
    formOrSection: 'Challan ITNS 281',
    applicableTaxpayers: 'All corporate and non-corporate deductors',
    description: 'Due date for depositing Tax Deducted / Collected at Source during the month of April.',
    penaltyOrConsequence: 'Interest @ 1.5% per month or part thereof for delay in deposit.'
  },
  {
    id: 'tds-pay-may',
    category: 'tds_payment',
    categoryLabel: 'TDS Payment',
    dueDate: '2025-06-07',
    month: 6,
    year: 2025,
    title: 'Deposit of TDS / TCS for May',
    formOrSection: 'Challan ITNS 281',
    applicableTaxpayers: 'All corporate and non-corporate deductors',
    description: 'Due date for depositing Tax Deducted / Collected at Source during the month of May.',
    penaltyOrConsequence: 'Interest @ 1.5% per month for late deposit.'
  },

  // GST Returns (GSTR-1 on 11th, GSTR-3B on 20th)
  {
    id: 'gst-gstr1-monthly',
    category: 'gst',
    categoryLabel: 'GST Returns',
    dueDate: '2025-05-11',
    month: 5,
    year: 2025,
    title: 'GSTR-1 Filing (Outward Supplies)',
    formOrSection: 'Form GSTR-1',
    applicableTaxpayers: 'Regular taxpayers with turnover > ₹5 Crores or non-QRMP monthly filers',
    description: 'Details of outward supplies of taxable goods and services for the preceding month.',
    penaltyOrConsequence: 'Late fee of ₹50/day (₹20/day for nil return) up to prescribed maximum.'
  },
  {
    id: 'gst-gstr3b-monthly',
    category: 'gst',
    categoryLabel: 'GST Returns',
    dueDate: '2025-05-20',
    month: 5,
    year: 2025,
    title: 'GSTR-3B Summary Return & Tax Payment',
    formOrSection: 'Form GSTR-3B',
    applicableTaxpayers: 'Regular monthly taxpayers',
    description: 'Monthly summary return of inward and outward supplies along with payment of net GST liability.',
    penaltyOrConsequence: 'Interest @ 18% p.a. on net tax paid in cash + late fees.'
  },
  {
    id: 'gst-cmp08-q1',
    category: 'gst',
    categoryLabel: 'GST Returns',
    dueDate: '2025-07-18',
    month: 7,
    year: 2025,
    title: 'CMP-08 Quarterly Statement for Composition Dealers',
    formOrSection: 'Form CMP-08',
    applicableTaxpayers: 'Composition taxpayers under Section 10',
    description: 'Quarterly payment statement and self-assessed tax for Quarter 1 (April to June).',
    penaltyOrConsequence: 'Interest and late fees applicable for delayed discharge of tax.'
  },
  {
    id: 'gst-gstr9-annual',
    category: 'gst',
    categoryLabel: 'GST Returns',
    dueDate: '2025-12-31',
    month: 12,
    year: 2025,
    title: 'GSTR-9 & GSTR-9C Annual Return',
    formOrSection: 'Form GSTR-9 / 9C',
    applicableTaxpayers: 'Regular taxpayers with aggregate annual turnover > ₹2 Crores',
    description: 'Comprehensive annual return consolidating all monthly/quarterly returns filed for the financial year.',
    penaltyOrConsequence: 'Late fee of ₹200 per day subject to 0.5% of turnover limit.'
  },

  // Advance Tax Instalments (15 June, 15 Sept, 15 Dec, 15 March)
  {
    id: 'adv-tax-q1',
    category: 'advance_tax',
    categoryLabel: 'Advance Tax',
    dueDate: '2025-06-15',
    month: 6,
    year: 2025,
    title: '1st Instalment of Advance Tax (15%)',
    formOrSection: 'Challan ITNS 280 (Code 100)',
    applicableTaxpayers: 'All taxpayers whose estimated net tax liability for FY exceeds ₹10,000',
    description: 'Payment of first instalment of 15% of estimated advance tax liability for FY 2025-26.',
    penaltyOrConsequence: 'Simple interest @ 1% per month u/s 234C on deferment of instalment.'
  },
  {
    id: 'adv-tax-q2',
    category: 'advance_tax',
    categoryLabel: 'Advance Tax',
    dueDate: '2025-09-15',
    month: 9,
    year: 2025,
    title: '2nd Instalment of Advance Tax (45% cumulative)',
    formOrSection: 'Challan ITNS 280 (Code 100)',
    applicableTaxpayers: 'All taxpayers whose estimated tax liability exceeds ₹10,000',
    description: 'Payment of second instalment bringing cumulative advance tax to at least 45% of total tax liability.',
    penaltyOrConsequence: 'Interest u/s 234C for shortfall.'
  },
  {
    id: 'adv-tax-q3',
    category: 'advance_tax',
    categoryLabel: 'Advance Tax',
    dueDate: '2025-12-15',
    month: 12,
    year: 2025,
    title: '3rd Instalment of Advance Tax (75% cumulative)',
    formOrSection: 'Challan ITNS 280 (Code 100)',
    applicableTaxpayers: 'All taxpayers with net tax liability > ₹10,000',
    description: 'Payment of third instalment bringing cumulative advance tax to at least 75% of total tax liability.',
    penaltyOrConsequence: 'Interest u/s 234C for shortfall.'
  },
  {
    id: 'adv-tax-q4',
    category: 'advance_tax',
    categoryLabel: 'Advance Tax',
    dueDate: '2026-03-15',
    month: 3,
    year: 2026,
    title: '4th & Final Instalment of Advance Tax (100%)',
    formOrSection: 'Challan ITNS 280 (Code 100)',
    applicableTaxpayers: 'All taxpayers including presumptive taxpayers u/s 44AD / 44ADA',
    description: 'Payment of 100% of advance tax liability. Presumptive taxpayers pay 100% in this single instalment.',
    penaltyOrConsequence: 'Interest u/s 234B (1% per month) if advance tax is below 90% of assessed tax.'
  },

  // TDS Quarterly Returns (Form 24Q, 26Q, 27Q)
  {
    id: 'tds-ret-q4',
    category: 'tds_return',
    categoryLabel: 'TDS Returns',
    dueDate: '2025-05-31',
    month: 5,
    year: 2025,
    title: 'Quarterly TDS Return for Q4 (Jan to Mar)',
    formOrSection: 'Form 24Q (Salary), 26Q (Non-salary), 27Q',
    applicableTaxpayers: 'All entities deducting TDS during January to March',
    description: 'Quarterly statement of TDS deduction and deposit details for Q4.',
    penaltyOrConsequence: 'Late fee of ₹200 per day under Section 234E until return is filed.'
  },
  {
    id: 'tds-ret-q1',
    category: 'tds_return',
    categoryLabel: 'TDS Returns',
    dueDate: '2025-07-31',
    month: 7,
    year: 2025,
    title: 'Quarterly TDS Return for Q1 (Apr to Jun)',
    formOrSection: 'Form 24Q / Form 26Q / Form 27Q',
    applicableTaxpayers: 'All entities deducting tax during Q1',
    description: 'Filing of TDS quarterly return for Quarter 1.',
    penaltyOrConsequence: 'Late fee of ₹200/day u/s 234E.'
  },
  {
    id: 'tds-ret-q2',
    category: 'tds_return',
    categoryLabel: 'TDS Returns',
    dueDate: '2025-10-31',
    month: 10,
    year: 2025,
    title: 'Quarterly TDS Return for Q2 (Jul to Sep)',
    formOrSection: 'Form 24Q / Form 26Q / Form 27Q',
    applicableTaxpayers: 'All deductors',
    description: 'Filing of TDS quarterly return for Quarter 2.',
    penaltyOrConsequence: 'Late fee of ₹200/day u/s 234E.'
  },
  {
    id: 'tds-ret-q3',
    category: 'tds_return',
    categoryLabel: 'TDS Returns',
    dueDate: '2026-01-31',
    month: 1,
    year: 2026,
    title: 'Quarterly TDS Return for Q3 (Oct to Dec)',
    formOrSection: 'Form 24Q / Form 26Q / Form 27Q',
    applicableTaxpayers: 'All deductors',
    description: 'Filing of TDS quarterly return for Quarter 3.',
    penaltyOrConsequence: 'Late fee of ₹200/day u/s 234E.'
  },

  // Income Tax Returns (ITR)
  {
    id: 'itr-non-audit',
    category: 'income_tax',
    categoryLabel: 'Income Tax (ITR)',
    dueDate: '2025-07-31',
    month: 7,
    year: 2025,
    title: 'ITR Filing for Non-Audit Individuals & Entities',
    formOrSection: 'ITR-1 (Sahaj), ITR-2, ITR-4 (Sugam)',
    applicableTaxpayers: 'Salaried individuals, HUFs, non-audit business & professionals',
    description: 'Due date for filing annual Income Tax Returns for taxpayers whose accounts are not required to be audited.',
    penaltyOrConsequence: 'Late filing fee u/s 234F up to ₹5,000 + interest u/s 234A on unpaid tax + loss of ability to carry forward certain losses.'
  },
  {
    id: 'tax-audit-report',
    category: 'income_tax',
    categoryLabel: 'Income Tax (ITR)',
    dueDate: '2025-09-30',
    month: 9,
    year: 2025,
    title: 'Tax Audit Report Submission',
    formOrSection: 'Form 3CA / 3CB & Form 3CD',
    applicableTaxpayers: 'Businesses and professionals liable to tax audit under Section 44AB',
    description: 'Filing of tax audit report by an accountant for eligible corporate and non-corporate entities.',
    penaltyOrConsequence: 'Penalty u/s 271B equal to 0.5% of turnover up to ₹1,50,000.'
  },
  {
    id: 'itr-audit-cases',
    category: 'income_tax',
    categoryLabel: 'Income Tax (ITR)',
    dueDate: '2025-10-31',
    month: 10,
    year: 2025,
    title: 'ITR Filing for Tax Audit Cases & Companies',
    formOrSection: 'ITR-3, ITR-5, ITR-6',
    applicableTaxpayers: 'Corporate entities, working partners of audited firms, and audited assessees',
    description: 'Due date for filing annual Income Tax Returns for taxpayers requiring statutory tax audit.',
    penaltyOrConsequence: 'Fee u/s 234F + interest u/s 234A.'
  },
  {
    id: 'itr-belated-revised',
    category: 'income_tax',
    categoryLabel: 'Income Tax (ITR)',
    dueDate: '2025-12-31',
    month: 12,
    year: 2025,
    title: 'Belated / Revised ITR Filing',
    formOrSection: 'Section 139(4) & 139(5)',
    applicableTaxpayers: 'All eligible taxpayers who missed original deadline or wish to correct omissions',
    description: 'Last date to file belated return or revise an earlier return for Assessment Year 2025-26.',
    penaltyOrConsequence: 'No return can be filed after this date except via updated return u/s 139(8A) with additional tax.'
  },

  // Other Business Compliance (MSME, DIN KYC, etc.)
  {
    id: 'dir-3-kyc',
    category: 'other',
    categoryLabel: 'Other Business Compliance',
    dueDate: '2025-09-30',
    month: 9,
    year: 2025,
    title: 'DIR-3 KYC Annual Verification for Directors',
    formOrSection: 'MCA DIR-3 KYC',
    applicableTaxpayers: 'Every individual holding a Director Identification Number (DIN)',
    description: 'Mandatory annual KYC filing to keep DIN active on MCA portal.',
    penaltyOrConsequence: 'DIN deactivation + ₹5,000 late fee for restoration.'
  },
  {
    id: 'msme-half-yearly-1',
    category: 'other',
    categoryLabel: 'Other Business Compliance',
    dueDate: '2025-10-31',
    month: 10,
    year: 2025,
    title: 'MSME-1 Return for Specified Companies (Apr–Sep)',
    formOrSection: 'Form MSME-1',
    applicableTaxpayers: 'Companies having outstanding payments to MSME suppliers > 45 days',
    description: 'Half-yearly return reporting delayed payments to micro and small enterprises.',
    penaltyOrConsequence: 'Penalties under Section 405 of the Companies Act.'
  }
];
