import React from 'react';
import { ALL_SERVICES } from '../data/servicesData';
import { NavigationTarget } from '../components/Header';
import {
  Receipt,
  FileSpreadsheet,
  BookOpenCheck,
  Calculator,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

interface ServicesOverviewViewProps {
  onNavigate: (view: NavigationTarget) => void;
  onOpenEnquiry: (serviceName?: string) => void;
  onOpenWhatsAppModal: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Receipt: <Receipt className="w-8 h-8 text-[#D4B477]" />,
  FileSpreadsheet: <FileSpreadsheet className="w-8 h-8 text-[#D4B477]" />,
  BookOpenCheck: <BookOpenCheck className="w-8 h-8 text-[#D4B477]" />,
  Calculator: <Calculator className="w-8 h-8 text-[#D4B477]" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8 text-[#D4B477]" />,
  TrendingUp: <TrendingUp className="w-8 h-8 text-[#D4B477]" />,
};

export const ServicesOverviewView: React.FC<ServicesOverviewViewProps> = ({
  onNavigate,
  onOpenEnquiry,
  onOpenWhatsAppModal,
}) => {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Banner */}
      <section className="bg-[#142B46] text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4B477] block mb-2">
              Our Capabilities
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white mb-3">
              Professional Financial &amp; Compliance Services
            </h1>
            <p className="text-base text-slate-300 font-sans leading-relaxed">
              Tailored accounting, taxation, GST, TDS, and statutory registration support for individuals, sole proprietors, partnerships, and growing corporate entities.
            </p>
          </div>
        </div>
      </section>

      {/* Services List Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-[#F5F6F8]/60 rounded-2xl border border-slate-200 p-7 flex flex-col justify-between hover:border-[#D4B477] hover:shadow-md transition-all group"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-5 shadow-xs group-hover:bg-[#142B46] transition-colors">
                    {ICON_MAP[service.iconName] || <Receipt className="w-8 h-8 text-[#D4B477]" />}
                  </div>

                  <h3 className="text-xl font-bold font-serif text-[#142B46] mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#D4B477] mb-3">
                    {service.tagline}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Key Deliverables:
                    </div>
                    {service.offerings.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (service.id === 'gst') onNavigate('service-gst');
                      else if (service.id === 'incometax') onNavigate('service-incometax');
                      else if (service.id === 'accounting') onNavigate('service-accounting');
                      else if (service.id === 'tds') onNavigate('service-tds');
                      else if (service.id === 'compliance') onNavigate('service-compliance');
                      else onNavigate('services');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#142B46] hover:text-[#D4B477] transition-colors"
                  >
                    <span>View Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenEnquiry(service.title)}
                    className="text-xs font-semibold text-slate-500 hover:text-[#142B46]"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="py-16 bg-[#F5F6F8] border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold font-serif text-[#142B46] mb-3">
            Not Sure Which Services Match Your Turnover or Entity Type?
          </h2>
          <p className="text-sm text-slate-600 mb-6 max-w-xl mx-auto">
            Contact us for a brief diagnostic conversation. We evaluate your business volume and recommend only the specific compliances required by law.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 bg-[#142B46] hover:bg-[#0F2035] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#D4B477]" />
              <span>Contact Us</span>
            </button>
            <button
              onClick={onOpenWhatsAppModal}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              WhatsApp Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
