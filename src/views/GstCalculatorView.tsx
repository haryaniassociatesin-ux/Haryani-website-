import React, { useState } from 'react';
import {
  calculateGST,
  GstCalculationType,
  GstTransactionType,
  GstResult
} from '../utils/gstCalculator';
import {
  Calculator,
  RotateCcw,
  Check,
  Copy,
  Receipt,
  HelpCircle,
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
import { NavigationTarget } from '../components/Header';

interface GstCalculatorViewProps {
  onNavigate: (view: NavigationTarget) => void;
  onOpenEnquiry: (serviceName?: string) => void;
}

const PRESET_RATES = [0, 5, 12, 18, 28];

export const GstCalculatorView: React.FC<GstCalculatorViewProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  const [amountInput, setAmountInput] = useState<string>('10000');
  const [selectedRate, setSelectedRate] = useState<number>(18);
  const [isCustomRate, setIsCustomRate] = useState<boolean>(false);
  const [customRateInput, setCustomRateInput] = useState<string>('18');
  const [calcType, setCalcType] = useState<GstCalculationType>('exclusive');
  const [transType, setTransType] = useState<GstTransactionType>('intra_state');

  const [copied, setCopied] = useState(false);

  const activeRate = isCustomRate ? parseFloat(customRateInput) || 0 : selectedRate;
  const numericAmount = parseFloat(amountInput) || 0;

  const result: GstResult = calculateGST({
    amount: numericAmount,
    rate: activeRate,
    calculationType: calcType,
    transactionType: transType,
  });

  const handleClear = () => {
    setAmountInput('');
    setSelectedRate(18);
    setIsCustomRate(false);
    setCustomRateInput('18');
    setCalcType('exclusive');
    setTransType('intra_state');
  };

  const handleCopySummary = () => {
    const text = `Indian GST Calculation Summary (Haryani & Associates):
Amount Entered: ₹${result.originalAmount.toLocaleString('en-IN')}
Calculation Mode: ${result.calculationType === 'exclusive' ? 'GST Exclusive' : 'GST Inclusive'}
Transaction Type: ${result.isIntraState ? 'Intra-State (CGST + SGST)' : 'Inter-State (IGST)'}
Taxable Base: ₹${result.taxableAmount.toLocaleString('en-IN')}
GST Rate: ${result.gstRate}%
${
  result.isIntraState
    ? `CGST (${result.gstRate / 2}%): ₹${result.cgst.toLocaleString('en-IN')}\nSGST (${result.gstRate / 2}%): ₹${result.sgst.toLocaleString('en-IN')}`
    : `IGST (${result.gstRate}%): ₹${result.igst.toLocaleString('en-IN')}`
}
Total GST: ₹${result.totalGst.toLocaleString('en-IN')}
Final Invoice Total: ₹${result.finalInvoiceAmount.toLocaleString('en-IN')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full bg-[#F5F6F8]">
      {/* Banner */}
      <section className="bg-[#142B46] text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4B477] block mb-2">
              Free Financial Utility
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white mb-2">
              Indian GST Calculator
            </h1>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              Instantly compute GST Exclusive or Inclusive amounts, with automatic CGST, SGST, and IGST breakdowns strictly following statutory tax rules.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Body */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls Card (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#D4B477]" />
                  <h2 className="text-lg font-bold font-serif text-[#142B46]">
                    Calculation Parameters
                  </h2>
                </div>
                <button
                  onClick={handleClear}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-600 transition-colors px-2.5 py-1 rounded-md border border-slate-200 hover:border-red-200"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>

              <div className="space-y-6">
                {/* 1. Amount Input */}
                <div>
                  <label htmlFor="gstAmount" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Amount (in Indian Rupees ₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-500 font-bold text-sm">
                      ₹
                    </span>
                    <input
                      id="gstAmount"
                      type="number"
                      min="0"
                      step="any"
                      value={amountInput}
                      onChange={(e) => setAmountInput(e.target.value)}
                      placeholder="Enter invoice or taxable amount"
                      className="w-full pl-8 pr-4 py-2.5 text-base font-mono bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#D4B477] focus:border-[#D4B477] transition-all"
                    />
                  </div>
                </div>

                {/* 2. Calculation Type: Exclusive vs Inclusive */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Calculation Type
                  </label>
                  <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setCalcType('exclusive')}
                      className={`py-2 px-3 text-xs font-semibold rounded-md transition-all ${
                        calcType === 'exclusive'
                          ? 'bg-[#142B46] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      GST Exclusive (Add Tax)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcType('inclusive')}
                      className={`py-2 px-3 text-xs font-semibold rounded-md transition-all ${
                        calcType === 'inclusive'
                          ? 'bg-[#142B46] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      GST Inclusive (Extract Tax)
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    {calcType === 'exclusive'
                      ? 'Base amount does not include GST. GST will be added on top.'
                      : 'Amount already includes GST. Calculator separates taxable base from tax.'}
                  </p>
                </div>

                {/* 3. Transaction Type: Intra-state vs Inter-state */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Transaction Geography
                  </label>
                  <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setTransType('intra_state')}
                      className={`py-2 px-3 text-xs font-semibold rounded-md transition-all ${
                        transType === 'intra_state'
                          ? 'bg-[#142B46] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Intra-State (Within Maharashtra)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTransType('inter_state')}
                      className={`py-2 px-3 text-xs font-semibold rounded-md transition-all ${
                        transType === 'inter_state'
                          ? 'bg-[#142B46] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Inter-State (Outside State)
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    {transType === 'intra_state'
                      ? 'Applies CGST (Central Tax 50%) + SGST (State Tax 50%). IGST is zero.'
                      : 'Applies IGST (Integrated GST 100%). CGST and SGST are zero.'}
                  </p>
                </div>

                {/* 4. GST Rate Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Select GST Rate (%)
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {PRESET_RATES.map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => {
                          setSelectedRate(rate);
                          setIsCustomRate(false);
                        }}
                        className={`py-2.5 px-3 text-xs font-bold rounded-lg border transition-all ${
                          !isCustomRate && selectedRate === rate
                            ? 'bg-[#142B46] text-[#D4B477] border-[#142B46] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {rate}%
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setIsCustomRate(true)}
                      className={`py-2.5 px-3 text-xs font-bold rounded-lg border transition-all ${
                        isCustomRate
                          ? 'bg-[#142B46] text-[#D4B477] border-[#142B46] shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      Custom
                    </button>
                  </div>

                  {isCustomRate && (
                    <div className="mt-3 flex items-center gap-2">
                      <label htmlFor="customGstRate" className="text-xs text-slate-600 font-medium">
                        Custom Rate (%):
                      </label>
                      <input
                        id="customGstRate"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={customRateInput}
                        onChange={(e) => setCustomRateInput(e.target.value)}
                        className="w-28 px-3 py-1.5 text-xs font-mono bg-white border border-slate-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#D4B477]"
                        placeholder="e.g. 18"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Results Display Card (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-[#D4B477]" />
                    <h3 className="text-base font-bold font-serif text-[#142B46]">
                      GST Calculation Breakdown
                    </h3>
                  </div>
                  <button
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-[#142B46] py-1 px-2 rounded-md hover:bg-slate-100 transition-colors"
                    title="Copy calculation summary"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-5 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="font-sans text-slate-600">Original Amount:</span>
                    <span className="font-bold text-slate-800">
                      ₹{result.originalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-100 bg-[#F5F6F8]/60 px-2 rounded-md">
                    <span className="font-sans font-medium text-[#142B46]">Taxable Base Amount:</span>
                    <span className="font-bold text-[#142B46]">
                      ₹{result.taxableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="font-sans text-slate-600">Applicable GST Rate:</span>
                    <span className="font-bold text-slate-800">{result.gstRate}%</span>
                  </div>

                  {/* Intra-State Breakdown: CGST and SGST */}
                  {result.isIntraState ? (
                    <>
                      <div className="flex items-center justify-between py-2 border-b border-slate-100 pl-2">
                        <span className="font-sans text-slate-600">
                          Central GST (CGST @ {result.gstRate / 2}%):
                        </span>
                        <span className="text-slate-800">
                          ₹{result.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-slate-100 pl-2">
                        <span className="font-sans text-slate-600">
                          State GST (SGST @ {result.gstRate / 2}%):
                        </span>
                        <span className="text-slate-800">
                          ₹{result.sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 text-[11px] text-slate-400 pl-2">
                        <span className="font-sans">Integrated GST (IGST):</span>
                        <span>₹0.00 (Intra-state)</span>
                      </div>
                    </>
                  ) : (
                    /* Inter-State Breakdown: IGST */
                    <>
                      <div className="flex items-center justify-between py-2 border-b border-slate-100 pl-2">
                        <span className="font-sans text-slate-600">
                          Integrated GST (IGST @ {result.gstRate}%):
                        </span>
                        <span className="text-slate-800">
                          ₹{result.igst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 text-[11px] text-slate-400 pl-2">
                        <span className="font-sans">CGST &amp; SGST:</span>
                        <span>₹0.00 (Inter-state)</span>
                      </div>
                    </>
                  )}

                  <div className="flex items-center justify-between py-2.5 border-b border-slate-200 bg-amber-50/50 px-2 rounded-md">
                    <span className="font-sans font-bold text-slate-800">Total GST Amount:</span>
                    <span className="font-bold text-amber-900 text-sm">
                      ₹{result.totalGst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  {/* Final Total Amount */}
                  <div className="flex items-center justify-between py-3.5 px-3 bg-[#142B46] text-white rounded-xl shadow-xs mt-4">
                    <div>
                      <div className="font-sans text-xs text-[#D4B477] font-semibold">
                        Final Invoice Total
                      </div>
                      <div className="text-[10px] text-slate-300 font-sans">
                        Taxable Base + GST
                      </div>
                    </div>
                    <div className="text-lg font-bold text-white">
                      ₹{result.finalInvoiceAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Need help filing GST?</span>
                  <button
                    onClick={() => onOpenEnquiry('GST Return Preparation & Filing')}
                    className="font-bold text-[#142B46] hover:text-[#D4B477] inline-flex items-center gap-1"
                  >
                    <span>Consult Our Team</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Reference Slab Information Box */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 text-xs">
                <h4 className="font-serif font-bold text-[#142B46] mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#D4B477]" />
                  <span>Standard Indian GST Slab Rates</span>
                </h4>
                <ul className="space-y-1.5 text-slate-600">
                  <li><strong>0%:</strong> Essential food items, fresh produce, unbranded grains.</li>
                  <li><strong>5%:</strong> Household necessities, economy rail, packaged basic foods.</li>
                  <li><strong>12%:</strong> Processed foods, business class air tickets, apparel &gt; ₹1000.</li>
                  <li><strong>18%:</strong> Most commercial services, IT, financial consultancy, electronics.</li>
                  <li><strong>28%:</strong> Luxury vehicles, consumer durables, tobacco, aerated drinks.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
