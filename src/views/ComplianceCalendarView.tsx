import React, { useState, useMemo } from 'react';
import {
  COMPLIANCE_DEADLINES,
  COMPLIANCE_CATEGORIES,
  ComplianceCategory,
  ComplianceDeadline
} from '../data/complianceCalendar';
import { NavigationTarget } from '../components/Header';
import {
  Calendar,
  Search,
  Filter,
  Clock,
  AlertCircle,
  FileText,
  Building,
  CheckCircle,
  ArrowRight,
  Info
} from 'lucide-react';

interface ComplianceCalendarViewProps {
  onNavigate: (view: NavigationTarget) => void;
  onOpenEnquiry: (serviceName?: string) => void;
}

export const ComplianceCalendarView: React.FC<ComplianceCalendarViewProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ComplianceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'all' | 'monthly'>('all');
  const [selectedMonth, setSelectedMonth] = useState<number>(5); // Default to May or current

  // Filter deadlines
  const filteredDeadlines = useMemo(() => {
    return COMPLIANCE_DEADLINES.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Month filter in monthly mode
      if (viewMode === 'monthly' && item.month !== selectedMonth) {
        return false;
      }
      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesForm = item.formOrSection.toLowerCase().includes(q);
        const matchesTaxpayers = item.applicableTaxpayers.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        return matchesTitle || matchesForm || matchesTaxpayers || matchesDesc;
      }
      return true;
    }).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [selectedCategory, viewMode, selectedMonth, searchQuery]);

  // Format date helper
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const MONTHS = [
    { num: 1, name: 'January' },
    { num: 2, name: 'February' },
    { num: 3, name: 'March' },
    { num: 4, name: 'April' },
    { num: 5, name: 'May' },
    { num: 6, name: 'June' },
    { num: 7, name: 'July' },
    { num: 8, name: 'August' },
    { num: 9, name: 'September' },
    { num: 10, name: 'October' },
    { num: 11, name: 'November' },
    { num: 12, name: 'December' },
  ];

  return (
    <div className="flex flex-col w-full bg-[#F5F6F8]">
      {/* Header Banner */}
      <section className="bg-[#142B46] text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4B477] block mb-2">
              Statutory Deadlines Guide
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white mb-2">
              Public Indian Tax Compliance Calendar
            </h1>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              Verified statutory due dates for GST Returns, TDS Deductions, Advance Tax, and Annual Income Tax Returns across FY 2024-25 and FY 2025-26.
            </p>
          </div>
        </div>
      </section>

      {/* Main Calendar Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Statutory Notice Banner */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-8 flex items-start gap-3">
            <Info className="w-5 h-5 text-[#D4B477] shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800">Public Regulatory Notice:</strong> Compliance deadlines depend on your taxpayer category (e.g. Regular vs QRMP in GST, or Corporate vs Non-Audit Individual in Income Tax). Due dates are subject to official CBDT / CBIC extensions. Consult our team for specific applicability to your business.
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs mb-8 space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by form (e.g. GSTR-3B, Form 26Q, ITR-1) or description..."
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#D4B477]"
                />
              </div>

              {/* View Switcher: All vs Monthly */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
                <button
                  onClick={() => setViewMode('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    viewMode === 'all'
                      ? 'bg-[#142B46] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Deadlines View
                </button>
                <button
                  onClick={() => setViewMode('monthly')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    viewMode === 'monthly'
                      ? 'bg-[#142B46] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Monthly Filter
                </button>
              </div>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                Category:
              </span>
              {COMPLIANCE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#142B46] text-[#D4B477] font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Monthly Selector Tabs (visible when Monthly mode is active) */}
            {viewMode === 'monthly' && (
              <div className="flex items-center gap-1 overflow-x-auto pt-2 border-t border-slate-100 pb-1">
                {MONTHS.map((m) => (
                  <button
                    key={m.num}
                    onClick={() => setSelectedMonth(m.num)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
                      selectedMonth === m.num
                        ? 'bg-[#D4B477] text-[#142B46] font-bold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Deadlines List */}
          {filteredDeadlines.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-700 mb-1">
                No Compliance Deadlines Found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                No statutory deadlines matched your current filters or search query.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setViewMode('all');
                }}
                className="text-xs font-bold text-[#142B46] underline"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>Showing {filteredDeadlines.length} scheduled statutory deadlines</span>
                <span>Financial Year 2024-25 &amp; 2025-26</span>
              </div>

              {filteredDeadlines.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-[#D4B477] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left: Date Badge & Details */}
                  <div className="flex items-start gap-4">
                    {/* Date Block */}
                    <div className="w-20 bg-[#142B46] text-white rounded-lg p-2.5 text-center shrink-0">
                      <div className="text-[10px] uppercase font-bold text-[#D4B477]">
                        {new Date(item.dueDate).toLocaleString('en-IN', { month: 'short' })}
                      </div>
                      <div className="text-xl font-bold font-mono">
                        {new Date(item.dueDate).getDate()}
                      </div>
                      <div className="text-[10px] text-slate-300 font-mono">
                        {new Date(item.dueDate).getFullYear()}
                      </div>
                    </div>

                    {/* Deadline Metadata */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-[#142B46] font-serif text-base">
                          {item.title}
                        </span>
                        <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {item.formOrSection}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                          {item.categoryLabel}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1">
                        <div>
                          <strong className="text-slate-700">Applicable To:</strong>{' '}
                          {item.applicableTaxpayers}
                        </div>
                        {item.penaltyOrConsequence && (
                          <div className="text-amber-800">
                            <strong>Note:</strong> {item.penaltyOrConsequence}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Assistance CTA */}
                  <div className="shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <button
                      onClick={() => onOpenEnquiry(item.title)}
                      className="w-full md:w-auto px-4 py-2 bg-slate-100 hover:bg-[#142B46] text-slate-700 hover:text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Need Filing Help?</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
