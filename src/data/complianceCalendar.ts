/**
 * Public Indian Tax Compliance Calendar
 * Configurable schedule of statutory deadlines across GST, Income Tax, TDS, and Corporate filings.
 * Verified against official Indian government statutes (CBDT, CBIC & MCA).
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
  officialSource?: string;
}

export const CALENDAR_VERIFICATION_DATE = 'November 2026';
export const CALENDAR_RELEVANT_PERIOD = 'FY 2026-27 & FY 2027-28 (AY 2027-28)';

export const COMPLIANCE_CATEGORIES: { id: ComplianceCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Deadlines' },
  { id: 'gst', label: 'GST Returns' },
  { id: 'tds_payment', label: 'TDS Payments' },
  { id: 'tds_return', label: 'TDS Returns' },
  { id: 'advance_tax', label: 'Advance Tax' },
  { id: 'income_tax', label: 'Income Tax (ITR)' },
  { id: 'other', label: 'Corporate & Other' },
];

export const COMPLIANCE_DEADLINES: ComplianceDeadline[] = [
  // --- November & December 2026 ---
  {
    id: 'gst-gstr3b-nov26',
    category: 'gst',
    categoryLabel: 'GST Returns',
    dueDate: '2026-11-20',
    month: 11,
    year: 2026,
    title: 'GSTR-3B Monthly Return for October',
    formOrSection: 'Form GSTR-3B',
    applicableTaxpayers: 'Regular monthly filers',
    description: 'Monthly summary return of inward and outward supplies along with payment of net GST liability for October.',
    penaltyOrConsequence: 'Interest @ 18% p.a. on net cash tax liability plus late fees.',
    officialSource: 'CBIC / GST Portal'
  },
  {
    id: 'tds-pay-dec26',
    category: 'tds_payment',
    categoryLabel: 'TDS Payment',
    dueDate: '2026-12-07',
    month: 12,
    year: 2026,
    title: 'TDS / TCS Deposit for November',
    formOrSection: 'Challan ITNS 281',
    applicableTaxpayers: 'All corporate and non-corporate deductors',
    description: 'Due date for depositing Tax Deducted / Collected at Source during the month of November.',
    penaltyOrConsequence: 'Interest @ 1.5% per month or part thereof for delay in deposit.',
    officialSource: 'Income Tax Department (CBDT)'
  },
  {
    id: 'gst-gstr1-dec26',
    category: 'gst',
    categoryLabel: 'GST Returns',
    dueDate: '2026-12-11',
    month: 12,
    year: 2026,
    title: 'GSTR-1 Outward Supplies for November',
    formOrSection: 'Form GSTR-1',
    applicableTaxpayers: 'Regular monthly filers',
    description: 'Furnishing of outward supplies details of taxable goods and services for November.',
    penaltyOrConsequence: 'Late fee of ₹50/day (₹20/day for nil return) up to prescribed statutory limit.',
    officialSource: 'GST Portal'
  },
  {
    id: 'adv-tax-q3-2026',
    category: 'advance_tax',
    categoryLabel: 'Advance Tax',
    dueDate: '2026-12-15',
    month: 12,
    year: 2026,
    title: '3rd Instalment of Advance Tax (75% cumulative)',
    formOrSection: 'Challan ITNS 280 (Code 100)',
    applicableTaxpayers: 'All taxpayers whose estimated net tax liability for FY 2026-27 exceeds ₹10,000',
    description: 'Payment of third instalment bringing cumulative advance tax payment to at least 75% of total tax liability.',
    penaltyOrConsequence: 'Simple interest @ 1% per month u/s 234C on deferment of instalment.',
    officialSource: 'CBDT Section 211'
  },
  {
    id: 'gst-gstr3b-dec26',
    category: 'gst',
    categoryLabel: 'GST Returns',
    dueDate: '2026-12-20',
    month: 12,
    year: 2026,
    title: 'GSTR-3B Monthly Return for November',
    formOrSection: 'Form GSTR-3B',
    applicableTaxpayers: 'Regular monthly taxpayers',
    description: 'Monthly summary return of inward/outward supplies along with payment of net GST liability for November.',
    penaltyOrConsequence: 'Interest @ 18% p.a. on net cash tax plus statutory late fees.',
    officialSource: 'CBIC / GST Portal'
  },
  {
    id: 'itr-belated-2026',
    category: 'income_tax',
    categoryLabel: 'Income Tax (ITR)',
    dueDate: '2026-12-31',
    month: 12,
    year: 2026,
    title: 'Belated / Revised ITR for AY 2026-27',
    formOrSection: 'Section 139(4) & 139(5)',
    applicableTaxpayers: 'Taxpayers who missed the original due date or wish to rectify errors/omissions',
    description: 'Final statutory date to file belated return or revise an earlier return for Assessment Year 2026-27.',
    penaltyOrConsequence: 'Late fee u/s 234F up to ₹5,000. No return can be filed after this date except via updated return u/s 139(8A) with additional tax.',
    officialSource: 'CBDT Section 139'
  },
  {
    id: 'gst-gstr9-annual-2026',
    category: 'gst',
    categoryLabel: 'GST Returns',
    dueDate: '2026-12-31',
    month: 12,
    year: 2026,
    title: 'GSTR-9 & GSTR-9C Annual Return for FY 2025-26',
    formOrSection: 'Form GSTR-9 / GSTR-9C',
    applicableTaxpayers: 'Regular taxpayers with aggregate turnover exceeding prescribed thresholds',
    description: 'Consolidated annual return and self-certified reconciliation statement for the preceding financial year.',
    penaltyOrConsequence: 'Late fee of ₹200/day subject to statutory maximum of 0.5% of turnover in state.',
    officialSource: 'CBIC Rule 80'
  },

  // --- Q4 (Jan to March 2027) ---
  {
    id: 'tds-pay-jan27',
    category: 'tds_payment',
    categoryLabel: 'TDS Payment',
    dueDate: '2027-01-07',
    month: 1,
    year: 2027,
    title: 'TDS / TCS Deposit for December',
    formOrSection: 'Challan ITNS 281',
    applicableTaxpayers: 'All corporate and non-corporate deductors',
    description: 'Monthly deposit of tax deducted at source for December.',
    penaltyOrConsequence: 'Interest @ 1.5% per month for delayed deposit.',
    officialSource: 'CBDT'
  },
  {
    id: 'gst-gstr1-jan27',
    category: 'gst',
    categoryLabel: 'GST Returns',
    dueDate: '2027-01-11',
    month: 1,
    year: 2027,
    title: 'GSTR-1 Outward Supplies for December',
    formOrSection: 'Form GSTR-1',
    applicableTaxpayers: 'Regular monthly filers',
    description: 'Monthly statement of outward supplies for December.',
    penaltyOrConsequence: 'Late fee applies per day of delay.',
    officialSource: 'GST Portal'
  },
  {
    id: 'gst-cmp08-q3',
    category: 'gst',
    categoryLabel: 'GST Returns',
    dueDate: '2027-01-18',
    month: 1,
    year: 2027,
    title: 'CMP-08 Statement for Composition Dealers (Q3)',
    formOrSection: 'Form CMP-08',
    applicableTaxpayers: 'Composition taxpayers under Section 10',
    description: 'Quarterly payment statement and tax discharge for Quarter 3 (October to December).',
    penaltyOrConsequence: 'Interest @ 18% p.a. on delayed tax deposit.',
    officialSource: 'CBIC'
  },
  {
    id: 'gst-gstr3b-jan27',
    category: 'gst',
    categoryLabel: 'GST Returns',
    dueDate: '2027-01-20',
    month: 1,
    year: 2027,
    title: 'GSTR-3B Monthly Return for December',
    formOrSection: 'Form GSTR-3B',
    applicableTaxpayers: 'Regular monthly filers',
    description: 'Summary return and tax settlement for December.',
    penaltyOrConsequence: 'Interest and late fees applicable.',
    officialSource: 'CBIC'
  },
  {
    id: 'tds-ret-q3-2027',
    category: 'tds_return',
    categoryLabel: 'TDS Returns',
    dueDate: '2027-01-31',
    month: 1,
    year: 2027,
    title: 'Quarterly TDS Return for Q3 (Oct–Dec)',
    formOrSection: 'Form 24Q (Salary), 26Q (Non-salary)',
    applicableTaxpayers: 'All entities deducting tax during Quarter 3',
    description: 'Quarterly statement of tax deducted and deposited details for Q3.',
    penaltyOrConsequence: 'Mandatory fee of ₹200 per day under Section 234E until filed.',
    officialSource: 'Income Tax Department (CBDT)'
  },
  {
    id: 'tds-pay-feb27',
    category: 'tds_payment',
    categoryLabel: 'TDS Payment',
    dueDate: '2027-02-07',
    month: 2,
    year: 2027,
    title: 'TDS / TCS Deposit for January',
    formOrSection: 'Challan ITNS 281',
    applicableTaxpayers: 'All deductors',
    description: 'Monthly deposit of tax deducted at source during January.',
    penaltyOrConsequence: 'Interest @ 1.5% per month on late deposit.',
    officialSource: 'CBDT'
  },
  {
    id: 'gst-gstr1-feb27',
    category: 'gst',
    categoryLabel: 'GST Returns',
    dueDate: '2027-02-11',
    month: 2,
    year: 2027,
    title: 'GSTR-1 Outward Supplies for January',
    formOrSection: 'Form GSTR-1',
    applicableTaxpayers: 'Regular monthly filers',
    description: 'Monthly statement of outward supplies for January.',
    penaltyOrConsequence: 'Statutory late fees.',
    officialSource: 'GST Portal'
  },
  {
    id: 'gst-gstr3b-feb27',
    category: 'gst',
    categoryLabel: 'GST Returns',
    dueDate: '2027-02-20',
    month: 2,
    year: 2027,
    title: 'GSTR-3B Monthly Return for January',
    formOrSection: 'Form GSTR-3B',
    applicableTaxpayers: 'Regular monthly filers',
    description: 'Summary return and tax settlement for January.',
    penaltyOrConsequence: 'Interest @ 18% p.a. + late fees.',
    officialSource: 'CBIC'
  },
  {
    id: 'tds-pay-mar27',
    category: 'tds_payment',
    categoryLabel: 'TDS Payment',
    dueDate: '2027-03-07',
    month: 3,
    year: 2027,
    title: 'TDS / TCS Deposit for February',
    formOrSection: 'Challan ITNS 281',
    applicableTaxpayers: 'All deductors',
    description: 'Monthly deposit of tax deducted at source during February.',
    penaltyOrConsequence: 'Interest @ 1.5% per month on late deposit.',
    officialSource: 'CBDT'
  },
  {
    id: 'gst-gstr1-mar27',
    category: 'gst',
    categoryLabel: 'GST Returns',
    dueDate: '2027-03-11',
    month: 3,
    year: 2027,
    title: 'GSTR-1 Outward Supplies for February',
    formOrSection: 'Form GSTR-1',
    applicableTaxpayers: 'Regular monthly filers',
    description: 'Monthly statement of outward supplies for February.',
    penaltyOrConsequence: 'Statutory late fees.',
    officialSource: 'GST Portal'
  },
  {
    id: 'adv-tax-q4-2027',
    category: 'advance_tax',
    categoryLabel: 'Advance Tax',
    dueDate: '2027-03-15',
    month: 3,
    year: 2027,
    title: '4th & Final Advance Tax Instalment (100%)',
    formOrSection: 'Challan ITNS 280 (Code 100)',
    applicableTaxpayers: 'All taxpayers including presumptive taxpayers u/s 44AD / 44ADA',
    description: 'Payment of 100% of estimated advance tax liability for FY 2026-27. Presumptive taxpayers pay whole advance tax in this single instalment.',
    penaltyOrConsequence: 'Interest u/s 234B (1% per month) if advance tax is below 90% of assessed tax, and interest u/s 234C for instalment shortfalls.',
    officialSource: 'CBDT Section 211'
  },
  {
    id: 'gst-gstr3b-mar27',
    category: 'gst',
    categoryLabel: 'GST Returns',
    dueDate: '2027-03-20',
    month: 3,
    year: 2027,
    title: 'GSTR-3B Monthly Return for February',
    formOrSection: 'Form GSTR-3B',
    applicableTaxpayers: 'Regular monthly filers',
    description: 'Summary return and tax settlement for February.',
    penaltyOrConsequence: 'Interest and late fees.',
    officialSource: 'CBIC'
  },

  // --- FY 2027-28 Upcoming Deadlines ---
  {
    id: 'tds-pay-mar-extended',
    category: 'tds_payment',
    categoryLabel: 'TDS Payment',
    dueDate: '2027-04-30',
    month: 4,
    year: 2027,
    title: 'TDS / TCS Deposit for March (Statutory Extension)',
    formOrSection: 'Challan ITNS 281',
    applicableTaxpayers: 'All deductors',
    description: 'Special statutory extended due date for depositing tax deducted at source during March (ordinarily due by 7th, extended to 30th April for March month).',
    penaltyOrConsequence: 'Interest @ 1.5% per month if deposited after 30 April.',
    officialSource: 'Rule 30 of Income Tax Rules'
  },
  {
    id: 'tds-ret-q4-2027',
    category: 'tds_return',
    categoryLabel: 'TDS Returns',
    dueDate: '2027-05-31',
    month: 5,
    year: 2027,
    title: 'Quarterly TDS Return for Q4 (Jan–Mar)',
    formOrSection: 'Form 24Q (Salary), 26Q (Non-salary), 27Q',
    applicableTaxpayers: 'All deductors deducting tax during January to March',
    description: 'Quarterly statement of TDS deduction and deposit details for Q4.',
    penaltyOrConsequence: 'Late fee of ₹200 per day under Section 234E until return is filed.',
    officialSource: 'CBDT'
  },
  {
    id: 'adv-tax-q1-2027',
    category: 'advance_tax',
    categoryLabel: 'Advance Tax',
    dueDate: '2027-06-15',
    month: 6,
    year: 2027,
    title: '1st Instalment of Advance Tax for FY 2027-28 (15%)',
    formOrSection: 'Challan ITNS 280 (Code 100)',
    applicableTaxpayers: 'All taxpayers with net tax liability > ₹10,000 for FY 2027-28',
    description: 'Payment of first instalment of 15% of estimated advance tax liability.',
    penaltyOrConsequence: 'Interest u/s 234C for shortfall.',
    officialSource: 'CBDT Section 211'
  },
  {
    id: 'itr-non-audit-2027',
    category: 'income_tax',
    categoryLabel: 'Income Tax (ITR)',
    dueDate: '2027-07-31',
    month: 7,
    year: 2027,
    title: 'ITR Filing for Non-Audit Individuals (AY 2027-28)',
    formOrSection: 'ITR-1 (Sahaj), ITR-2, ITR-4 (Sugam)',
    applicableTaxpayers: 'Salaried employees, HUFs, non-audit proprietorships & professionals',
    description: 'Statutory due date for filing annual Income Tax Returns for taxpayers whose accounts are not subject to tax audit.',
    penaltyOrConsequence: 'Late filing fee u/s 234F up to ₹5,000 + interest u/s 234A on unpaid tax + forfeiture of carry forward of business/capital losses.',
    officialSource: 'Income Tax Act Section 139(1)'
  },
  {
    id: 'tax-audit-report-2027',
    category: 'income_tax',
    categoryLabel: 'Income Tax (ITR)',
    dueDate: '2027-09-30',
    month: 9,
    year: 2027,
    title: 'Tax Audit Report Submission u/s 44AB',
    formOrSection: 'Form 3CA / 3CB & Form 3CD',
    applicableTaxpayers: 'Businesses and professionals liable to statutory tax audit',
    description: 'Filing of tax audit report by an accountant for eligible entities.',
    penaltyOrConsequence: 'Penalty u/s 271B equal to 0.5% of total sales/turnover up to ₹1,50,000.',
    officialSource: 'Section 44AB & 271B'
  },
  {
    id: 'dir-3-kyc-2027',
    category: 'other',
    categoryLabel: 'Corporate & Other',
    dueDate: '2027-09-30',
    month: 9,
    year: 2027,
    title: 'DIR-3 KYC Annual Verification for Directors',
    formOrSection: 'MCA DIR-3 KYC',
    applicableTaxpayers: 'Every individual holding a Director Identification Number (DIN)',
    description: 'Mandatory annual KYC filing to maintain active DIN status on the Ministry of Corporate Affairs portal.',
    penaltyOrConsequence: 'DIN deactivation on MCA portal + ₹5,000 late fee for reactivation.',
    officialSource: 'Ministry of Corporate Affairs (MCA)'
  },
  {
    id: 'itr-audit-cases-2027',
    category: 'income_tax',
    categoryLabel: 'Income Tax (ITR)',
    dueDate: '2027-10-31',
    month: 10,
    year: 2027,
    title: 'ITR Filing for Tax Audit Cases & Companies',
    formOrSection: 'ITR-3, ITR-5, ITR-6',
    applicableTaxpayers: 'Corporate entities, working partners of audited firms, and audited assessees',
    description: 'Statutory due date for filing annual Income Tax Returns for taxpayers requiring statutory tax audit.',
    penaltyOrConsequence: 'Late fee u/s 234F + interest u/s 234A.',
    officialSource: 'Income Tax Act Section 139(1)'
  }
];
