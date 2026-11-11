export interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  shortDescription: string;
  iconName: string;
  offerings: string[];
  benefits: string[];
  applicableFor: string[];
  faqs?: { q: string; a: string }[];
}

export const ALL_SERVICES: ServiceDetail[] = [
  {
    id: 'gst',
    title: 'GST Services',
    tagline: 'Comprehensive Goods & Services Tax Registration and Filing Support',
    shortDescription: 'End-to-end GST registration assistance, monthly return filing support, credit reconciliation, and advisory.',
    iconName: 'Receipt',
    offerings: [
      'GST registration assistance for new entities, proprietorships, and partnerships',
      'GST return preparation and filing support (GSTR-1, GSTR-3B, GSTR-9 annual return)',
      'GST input tax credit (ITC) reconciliation with GSTR-2B',
      'GST compliance assistance and notice reply drafting support',
      'GST-related consultancy on applicable tax rates, invoicing, and e-way bills'
    ],
    benefits: [
      'Avoid late fees and interest through disciplined filing schedules',
      'Maximized eligible Input Tax Credit claims with monthly 2B reconciliation',
      'Seamless transition between regular and composition schemes where appropriate',
      'Transparent advisory tailored to your business trade flows'
    ],
    applicableFor: [
      'Traders, Wholesalers & Retailers',
      'Manufacturers and Industrial suppliers',
      'Service providers, IT professionals & Freelancers',
      'E-commerce sellers & logistics operators'
    ],
    faqs: [
      {
        q: 'When is GST registration mandatory in India?',
        a: 'GST registration is generally mandatory if aggregate turnover exceeds ₹40 Lakhs for goods suppliers (₹20 Lakhs in special states) or ₹20 Lakhs for service providers (₹10 Lakhs in special states), as well as for inter-state suppliers and e-commerce operators.'
      },
      {
        q: 'What is the due date for monthly GSTR-3B?',
        a: 'For monthly filers with turnover exceeding ₹5 Crores (or opting for monthly filing), GSTR-3B is due on the 20th of the following month.'
      }
    ]
  },
  {
    id: 'incometax',
    title: 'Income Tax Services',
    tagline: 'Accurate Individual & Corporate Tax Return Filing and Advisory',
    shortDescription: 'Individual & business ITR preparation, tax computation, planning, and Old vs New regime optimization.',
    iconName: 'FileSpreadsheet',
    offerings: [
      'Individual income tax return preparation (ITR-1 Sahaj, ITR-2 for capital gains & multiple properties)',
      'Business & profession income tax return preparation (ITR-3, ITR-4 Sugam presumptive taxation)',
      'Corporate and partnership firm tax computation assistance',
      'Tax computation assistance, advance tax forecasting, and self-assessment calculation',
      'Tax planning support aligned with the latest Finance Act provisions',
      'Comparative evaluation between the Old and New Tax Regimes to maximize savings'
    ],
    benefits: [
      'Objective calculation showing exact tax payable under both tax regimes',
      'Accurate reporting of salary, bank interest, capital gains, and freelance income',
      'Timely return filing to prevent penalties u/s 234F and interest u/s 234A/B/C',
      'Safe and verified filing using official tax portal standards'
    ],
    applicableFor: [
      'Salaried employees and high-net-worth individuals',
      'Proprietors, consultants, and professionals (Doctors, Lawyers, IT specialists)',
      'Partnership firms and Limited Liability Partnerships (LLPs)',
      'Senior citizens with pension and interest income'
    ],
    faqs: [
      {
        q: 'Which regime is better: Old or New?',
        a: 'The New Tax Regime provides lower tax slab rates and an increased standard deduction (₹75,000 for salaried) with zero tax up to ₹7,00,000 taxable income u/s 87A. The Old Regime is beneficial if you claim substantial deductions under 80C, 80D, home loan interest, and HRA. We compute both to find your optimum choice.'
      }
    ]
  },
  {
    id: 'accounting',
    title: 'Accounting & Bookkeeping',
    tagline: 'Reliable Ledger Maintenance and Financial Statement Preparation',
    shortDescription: 'Systematic day-to-day accounting, sales/purchase entries, bank reconciliation, and monthly financial reports.',
    iconName: 'BookOpenCheck',
    offerings: [
      'Day-to-day business accounting and transaction voucher entry',
      'Purchase and sales ledger recording with itemized GST details',
      'Monthly bank reconciliation and payment clearing verification',
      'Debtor and creditor ledger maintenance with age-wise tracking',
      'Preparation of balance sheets, profit & loss accounts, and trial balances',
      'Monthly and quarterly accounting review and managerial reports'
    ],
    benefits: [
      'Clear visibility of business cash flow, profits, and pending receivables',
      'Zero year-end scramble: continuous books ensure smooth audits and filings',
      'Accurate documentation ready for bank loans, vendor credit, and compliance reviews',
      'Systematic recording complying with recognized accounting principles'
    ],
    applicableFor: [
      'Small and Medium Enterprises (SMEs)',
      'Retail shops and local merchants',
      'Professional service firms & agencies',
      'Startups and emerging ventures'
    ]
  },
  {
    id: 'tds',
    title: 'TDS & Payroll Compliance',
    tagline: 'Structured Tax Deducted at Source & Employee Payroll Processing',
    shortDescription: 'TDS calculation, challan payments, quarterly TDS returns (24Q, 26Q), and salary computation.',
    iconName: 'Calculator',
    offerings: [
      'TDS calculation and deduction compliance under sections 194C, 194J, 194I, 194H, etc.',
      'Monthly TDS challan preparation and payment guidance (due 7th of every month)',
      'Quarterly TDS return preparation and e-filing support (Form 24Q for salary, Form 26Q for non-salary)',
      'End-to-end employee payroll processing and monthly salary sheet calculations',
      'Issuance assistance for Form 16 (salary) and Form 16A (non-salary)',
      'Statutory payroll compliance assistance for employee deductions'
    ],
    benefits: [
      'Avoid high interest (1% to 1.5% per month) on delayed deduction or deposit',
      'Prevent steep late filing fees of ₹200/day under section 234E',
      'Accurate salary structures that optimize employee take-home pay legally',
      'Seamless quarterly statement generation without reconciliation mismatches'
    ],
    applicableFor: [
      'Employers with salaried workforce',
      'Businesses engaging contractors, freelancers, and technical professionals',
      'Property tenants paying commercial rent requiring TDS u/s 194I',
      'Commercial entities paying professional and director fees'
    ]
  },
  {
    id: 'compliance',
    title: 'Business Compliance',
    tagline: 'Statutory Formalities and Business Registration Assistance',
    shortDescription: 'Entity registration support, statutory compliance guidance, and periodic business filings.',
    iconName: 'ShieldCheck',
    offerings: [
      'Business registration assistance for Proprietorships, Partnerships, and MSME/Udyam',
      'Shops and Establishments (Gumasta) registration guidance',
      'GST and statutory state registration assistance',
      'Ongoing regulatory filings and annual business compliance reviews',
      'Compliance calendar monitoring to ensure no government due dates are missed',
      'Assistance with statutory record upkeep and official communications'
    ],
    benefits: [
      'Stress-free legal standing for uninterrupted commercial operations',
      'Access to MSME government benefits, tender eligibility, and priority credit',
      'Organized documentation preventing sudden regulatory penalties or notices',
      'Proactive reminders for upcoming state and central compliance milestones'
    ],
    applicableFor: [
      'Entrepreneurs starting new ventures in Maharashtra and across India',
      'Existing businesses seeking comprehensive compliance overhaul',
      'Family-run commercial establishments and trade agencies'
    ]
  },
  {
    id: 'consultancy',
    title: 'Financial & Business Consultancy',
    tagline: 'Data-Driven Insights for Strategic Business Decision-Making',
    shortDescription: 'Financial reporting, cost analysis, margin tracking, and financial decision-making assistance.',
    iconName: 'TrendingUp',
    offerings: [
      'Financial reporting and managerial performance analysis',
      'Cash flow forecasting and operational working capital planning',
      'Profitability breakdown by business line, product, or customer segment',
      'Comprehensive accounting support for internal audits and bank reviews',
      'Objective financial decision-making assistance for expansion and investment'
    ],
    benefits: [
      'Clear, honest perspective on financial health without jargon',
      'Identification of leakages, dormant overheads, and margin drains',
      'Preparedness for institutional credit and working capital limits',
      'Personalised consultations focused on sustainable long-term business health'
    ],
    applicableFor: [
      'Business founders and partners reviewing expansion plans',
      'Trading firms looking to optimize inventory and supplier terms',
      'Service firms wanting structured overhead and fee calculations'
    ]
  }
];

// 9 Homepage Featured Service Cards
export const HOMEPAGE_SERVICES = [
  {
    id: 'gst-reg',
    title: 'GST Registration & Compliance',
    description: 'Seamless registration support for new and existing commercial entities with documentation guidance.',
    icon: 'Building2',
    servicePageId: 'gst'
  },
  {
    id: 'gst-returns',
    title: 'GST Return Preparation & Filing',
    description: 'Timely filing assistance for GSTR-1, GSTR-3B and annual GSTR-9 with rigorous 2B reconciliation.',
    icon: 'Receipt',
    servicePageId: 'gst'
  },
  {
    id: 'itr-filing',
    title: 'Income Tax Return Preparation & Filing',
    description: 'Accurate tax return preparation for salaried individuals, professionals, and business owners.',
    icon: 'FileText',
    servicePageId: 'incometax'
  },
  {
    id: 'tds-compliance',
    title: 'TDS Compliance & Returns',
    description: 'Precise monthly deduction calculation, challan payment guidance, and quarterly return filings.',
    icon: 'Percent',
    servicePageId: 'tds'
  },
  {
    id: 'bookkeeping',
    title: 'Accounting & Bookkeeping',
    description: 'Systematic daily transaction recording, ledger upkeep, and timely bank reconciliations.',
    icon: 'BookOpen',
    servicePageId: 'accounting'
  },
  {
    id: 'financial-statements',
    title: 'Financial Statement Preparation',
    description: 'Clear, structured balance sheets, profit & loss accounts, and trial balances for your business.',
    icon: 'PieChart',
    servicePageId: 'accounting'
  },
  {
    id: 'payroll-services',
    title: 'Payroll Services',
    description: 'Complete employee payroll calculation, monthly pay slips, and statutory deduction processing.',
    icon: 'Users',
    servicePageId: 'tds'
  },
  {
    id: 'business-reg',
    title: 'Business Registration & Compliance',
    description: 'Guidance with MSME/Udyam, Gumasta, partnership formalities, and mandatory statutory registrations.',
    icon: 'ShieldCheck',
    servicePageId: 'compliance'
  },
  {
    id: 'financial-consultancy',
    title: 'Business & Financial Consultancy',
    description: 'Actionable financial reporting and strategic guidance to support sustainable business decisions.',
    icon: 'TrendingUp',
    servicePageId: 'consultancy'
  }
];
