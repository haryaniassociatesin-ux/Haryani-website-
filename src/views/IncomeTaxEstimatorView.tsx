import React, { useState } from 'react';
import {
  estimateIncomeTax,
  TaxComparisonResult,
  TaxInput
} from '../utils/taxEstimator';
import {
  TAX_CONFIG_BY_FY,
  DEFAULT_FY,
  TAX_DISCLAIMER,
  AgeCategory
} from '../data/taxRules';
import {
  FileSpreadsheet,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  ShieldAlert
} from 'lucide-react';
import { NavigationTarget } from '../components/Header';

interface IncomeTaxEstimatorViewProps {
  onNavigate: (view: NavigationTarget) => void;
  onOpenEnquiry: (serviceName?: string) => void;
}

export const IncomeTaxEstimatorView: React.FC<IncomeTaxEstimatorViewProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  const [selectedFY, setSelectedFY] = useState<string>(DEFAULT_FY);
  const [ageCategory, setAgeCategory] = useState<AgeCategory>('normal');
  const [salaryInput, setSalaryInput] = useState<string>('950000');
  const [otherIncomeInput, setOtherIncomeInput] = useState<string>('50000');
  const [deduction80CInput, setDeduction80CInput] = useState<string>('150000');
  const [deduction80DInput, setDeduction80DInput] = useState<string>('25000');
  const [deductionNpsInput, setDeductionNpsInput] = useState<string>('50000');
  const [otherDeductionsInput, setOtherDeductionsInput] = useState<string>('0');

  const salary = Math.max(0, parseFloat(salaryInput) || 0);
  const otherIncome = Math.max(0, parseFloat(otherIncomeInput) || 0);
  const deduction80C = Math.max(0, parseFloat(deduction80CInput) || 0);
  const deduction80D = Math.max(0, parseFloat(deduction80DInput) || 0);
  const deductionNps = Math.max(0, parseFloat(deductionNpsInput) || 0);
  const otherDeductions = Math.max(0, parseFloat(otherDeductionsInput) || 0);

  const comparison: TaxComparisonResult = estimateIncomeTax({
    financialYear: selectedFY,
    ageCategory,
    salaryIncome: salary,
    otherIncome,
    deduction80C,
    deduction80D,
    deductionNps,
    otherDeductions,
  });

  const handleReset = () => {
    setSelectedFY(DEFAULT_FY);
    setAgeCategory('normal');
    setSalaryInput('950000');
    setOtherIncomeInput('50000');
    setDeduction80CInput('150000');
    setDeduction80DInput('25000');
    setDeductionNpsInput('50000');
    setOtherDeductionsInput('0');
  };

  return (
    <div className="flex flex-col w-full bg-[#F5F6F8]">
      {/* Banner */}
      <section className="bg-[#142B46] text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4B477] block mb-2">
              Indian Taxation Estimator
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white mb-2">
              Income Tax Estimator &amp; Regime Comparison
            </h1>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              Compare Old vs New Tax Regime side-by-side with updated Finance Act provisions, standard deductions, and Section 87A rebates.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Statutory Verification Badge & Selection bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#142B46]/5 text-[#142B46] flex items-center justify-center font-bold text-xs">
                AY
              </div>
              <div>
                <div className="text-xs font-bold text-[#142B46]">
                  Applicable: {comparison.financialYear} ({comparison.assessmentYear})
                </div>
                <div className="text-[11px] text-slate-500">
                  Verified against official Indian Finance Act provisions (Standard deduction: ₹75,000 for New Regime)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <label htmlFor="fySelector" className="text-xs text-slate-600 font-semibold whitespace-nowrap">
                Select Year:
              </label>
              <select
                id="fySelector"
                value={selectedFY}
                onChange={(e) => setSelectedFY(e.target.value)}
                className="px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#D4B477]"
              >
                {Object.keys(TAX_CONFIG_BY_FY).map((fy) => (
                  <option key={fy} value={fy}>
                    {TAX_CONFIG_BY_FY[fy].financialYear} ({TAX_CONFIG_BY_FY[fy].assessmentYear})
                  </option>
                ))}
              </select>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 px-2.5 py-1.5 border border-slate-200 rounded-md"
                title="Reset values to defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Form Column (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-base font-bold font-serif text-[#142B46]">
                  Income &amp; Deduction Inputs
                </h2>
                <span className="text-[11px] text-[#D4B477] font-medium">Step 1 of 2</span>
              </div>

              {/* Age Category Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Age Category (Taxpayer Status)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAgeCategory('normal')}
                    className={`py-2 px-2 text-xs font-medium rounded-md border text-center transition-all ${
                      ageCategory === 'normal'
                        ? 'bg-[#142B46] text-white border-[#142B46]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Below 60 yrs
                  </button>
                  <button
                    type="button"
                    onClick={() => setAgeCategory('senior')}
                    className={`py-2 px-2 text-xs font-medium rounded-md border text-center transition-all ${
                      ageCategory === 'senior'
                        ? 'bg-[#142B46] text-white border-[#142B46]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    60 to 79 yrs
                  </button>
                  <button
                    type="button"
                    onClick={() => setAgeCategory('super_senior')}
                    className={`py-2 px-2 text-xs font-medium rounded-md border text-center transition-all ${
                      ageCategory === 'super_senior'
                        ? 'bg-[#142B46] text-white border-[#142B46]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    80+ yrs
                  </button>
                </div>
              </div>

              {/* Salary Income */}
              <div>
                <label htmlFor="salaryIncome" className="block text-xs font-semibold text-slate-700 mb-1">
                  Annual Salary Income (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-mono text-sm">₹</span>
                  <input
                    id="salaryIncome"
                    type="number"
                    min="0"
                    step="1000"
                    value={salaryInput}
                    onChange={(e) => setSalaryInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm font-mono bg-white border border-slate-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#D4B477]"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Standard deduction of ₹75,000 (New Regime) or ₹50,000 (Old Regime) automatically applies.
                </p>
              </div>

              {/* Other Income */}
              <div>
                <label htmlFor="otherIncome" className="block text-xs font-semibold text-slate-700 mb-1">
                  Income from Other Sources (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-mono text-sm">₹</span>
                  <input
                    id="otherIncome"
                    type="number"
                    min="0"
                    step="1000"
                    value={otherIncomeInput}
                    onChange={(e) => setOtherIncomeInput(e.target.value)}
                    placeholder="Bank interest, rental income, etc."
                    className="w-full pl-8 pr-3 py-2 text-sm font-mono bg-white border border-slate-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#D4B477]"
                  />
                </div>
              </div>

              {/* Old Regime Deductions Section */}
              <div className="pt-3 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Eligible Chapter VI-A Deductions
                  </span>
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium">
                    Allowed in Old Regime
                  </span>
                </div>

                {/* Section 80C */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="deduction80C" className="text-xs text-slate-600 font-medium">
                      Section 80C (PPF, EPF, ELSS, Life Ins.)
                    </label>
                    <span className="text-[10px] text-slate-400">Max ₹1,50,000</span>
                  </div>
                  <input
                    id="deduction80C"
                    type="number"
                    min="0"
                    max="150000"
                    value={deduction80CInput}
                    onChange={(e) => setDeduction80CInput(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm font-mono bg-white border border-slate-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#D4B477]"
                  />
                </div>

                {/* Section 80D */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="deduction80D" className="text-xs text-slate-600 font-medium">
                      Section 80D (Health Insurance Premium)
                    </label>
                    <span className="text-[10px] text-slate-400">Self &amp; Parents</span>
                  </div>
                  <input
                    id="deduction80D"
                    type="number"
                    min="0"
                    value={deduction80DInput}
                    onChange={(e) => setDeduction80DInput(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm font-mono bg-white border border-slate-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#D4B477]"
                  />
                </div>

                {/* Section 80CCD(1B) NPS */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="deductionNps" className="text-xs text-slate-600 font-medium">
                      Section 80CCD(1B) (National Pension Scheme)
                    </label>
                    <span className="text-[10px] text-slate-400">Max ₹50,000</span>
                  </div>
                  <input
                    id="deductionNps"
                    type="number"
                    min="0"
                    max="50000"
                    value={deductionNpsInput}
                    onChange={(e) => setDeductionNpsInput(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm font-mono bg-white border border-slate-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#D4B477]"
                  />
                </div>

                {/* Other Deductions (HRA, Home Loan Interest) */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="otherDeductions" className="text-xs text-slate-600 font-medium">
                      Other Exemptions / Deductions (HRA, Home Loan Int.)
                    </label>
                  </div>
                  <input
                    id="otherDeductions"
                    type="number"
                    min="0"
                    value={otherDeductionsInput}
                    onChange={(e) => setOtherDeductionsInput(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm font-mono bg-white border border-slate-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#D4B477]"
                  />
                </div>
              </div>
            </div>

            {/* Results & Side-by-Side Comparison (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Regime Recommendation Highlight Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-bold text-[#D4B477] uppercase tracking-wider block">
                      Recommendation
                    </span>
                    <h3 className="text-xl font-bold font-serif text-[#142B46] mt-0.5">
                      {comparison.recommendedRegime === 'new'
                        ? 'New Tax Regime is More Beneficial'
                        : comparison.recommendedRegime === 'old'
                        ? 'Old Tax Regime is More Beneficial'
                        : 'Both Regimes Result in the Same Tax'}
                    </h3>
                  </div>

                  {comparison.taxSavings > 0 && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-right shrink-0">
                      <div className="text-[11px] font-semibold text-emerald-800">
                        Estimated Tax Savings
                      </div>
                      <div className="text-lg font-bold font-mono text-emerald-700">
                        ₹{comparison.taxSavings.toLocaleString('en-IN')}
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {comparison.recommendedRegime === 'new'
                    ? `Under the New Tax Regime, you save ₹${comparison.taxSavings.toLocaleString('en-IN')} due to concessional slab rates and the ₹75,000 standard deduction.`
                    : comparison.recommendedRegime === 'old'
                    ? `Under the Old Tax Regime, you save ₹${comparison.taxSavings.toLocaleString('en-IN')} because your declared Chapter VI-A deductions outweigh the lower slab rates of the new regime.`
                    : 'Your tax liability is identical under both regimes for the entered figures.'}
                </p>
              </div>

              {/* Side-by-Side Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* New Tax Regime Card */}
                <div
                  className={`rounded-xl border p-5 transition-all ${
                    comparison.recommendedRegime === 'new'
                      ? 'bg-white border-[#142B46] ring-2 ring-[#D4B477]/50 shadow-sm'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <h4 className="text-sm font-bold font-serif text-[#142B46]">
                      New Tax Regime
                    </h4>
                    {comparison.recommendedRegime === 'new' && (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        Recommended
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span className="font-sans">Gross Income:</span>
                      <span>₹{comparison.newRegime.grossIncome.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-sans">Standard Deduction:</span>
                      <span className="text-emerald-700">
                        -₹{comparison.newRegime.standardDeduction.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span className="font-sans">Chapter VI-A (80C/80D):</span>
                      <span>₹0 (Not Allowed)</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-100">
                      <span className="font-sans">Taxable Income:</span>
                      <span>₹{comparison.newRegime.taxableIncome.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 pt-1">
                      <span className="font-sans">Basic Slab Tax:</span>
                      <span>₹{comparison.newRegime.basicTax.toLocaleString('en-IN')}</span>
                    </div>
                    {comparison.newRegime.rebate87A > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span className="font-sans">Rebate u/s 87A:</span>
                        <span>-₹{comparison.newRegime.rebate87A.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {comparison.newRegime.marginalRelief > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span className="font-sans">Marginal Relief:</span>
                        <span>-₹{comparison.newRegime.marginalRelief.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600">
                      <span className="font-sans">Health &amp; Edu. Cess (4%):</span>
                      <span>₹{comparison.newRegime.cess.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-sm font-bold text-[#142B46] bg-slate-50 p-2 rounded">
                      <span className="font-sans">Total Estimated Tax:</span>
                      <span className="text-[#142B46]">
                        ₹{comparison.newRegime.totalTax.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Old Tax Regime Card */}
                <div
                  className={`rounded-xl border p-5 transition-all ${
                    comparison.recommendedRegime === 'old'
                      ? 'bg-white border-[#142B46] ring-2 ring-[#D4B477]/50 shadow-sm'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <h4 className="text-sm font-bold font-serif text-[#142B46]">
                      Old Tax Regime
                    </h4>
                    {comparison.recommendedRegime === 'old' && (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        Recommended
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span className="font-sans">Gross Income:</span>
                      <span>₹{comparison.oldRegime.grossIncome.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-sans">Standard Deduction:</span>
                      <span className="text-emerald-700">
                        -₹{comparison.oldRegime.standardDeduction.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span className="font-sans">Deductions (80C, 80D, etc.):</span>
                      <span>-₹{comparison.oldRegime.chapterVIADeductions.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-100">
                      <span className="font-sans">Taxable Income:</span>
                      <span>₹{comparison.oldRegime.taxableIncome.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 pt-1">
                      <span className="font-sans">Basic Slab Tax:</span>
                      <span>₹{comparison.oldRegime.basicTax.toLocaleString('en-IN')}</span>
                    </div>
                    {comparison.oldRegime.rebate87A > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span className="font-sans">Rebate u/s 87A:</span>
                        <span>-₹{comparison.oldRegime.rebate87A.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600">
                      <span className="font-sans">Health &amp; Edu. Cess (4%):</span>
                      <span>₹{comparison.oldRegime.cess.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-sm font-bold text-[#142B46] bg-slate-50 p-2 rounded">
                      <span className="font-sans">Total Estimated Tax:</span>
                      <span className="text-[#142B46]">
                        ₹{comparison.oldRegime.totalTax.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statutory Disclaimer - Exact text required by prompt */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Statutory Note &amp; Disclaimer:</strong>{' '}
                  {TAX_DISCLAIMER}
                </div>
              </div>

              {/* ITR Return Filing Consultation Trigger */}
              <div className="p-5 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold font-serif text-[#142B46]">
                    Need Personalized ITR Computation &amp; Filing?
                  </h4>
                  <p className="text-xs text-slate-500">
                    Our team in Mira Road verifies capital gains, AIS/TIS data, and ensures compliant filing.
                  </p>
                </div>
                <button
                  onClick={() => onOpenEnquiry('Income Tax Return Preparation & Filing')}
                  className="px-4 py-2 bg-[#142B46] hover:bg-[#0F2035] text-white text-xs font-semibold rounded-lg shrink-0"
                >
                  Enquire for ITR Filing
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
