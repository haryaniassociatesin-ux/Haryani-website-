import React from 'react';
import { ALL_SERVICES, ServiceDetail } from '../data/servicesData';
import { NavigationTarget } from '../components/Header';
import { BUSINESS_INFO } from '../data/contactInfo';
import {
  CheckCircle2,
  Receipt,
  FileSpreadsheet,
  BookOpenCheck,
  Calculator,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  PhoneCall,
  MessageCircle,
  HelpCircle,
  Building,
  UserCheck
} from 'lucide-react';

interface ServiceDetailViewProps {
  serviceId: string;
  onNavigate: (view: NavigationTarget) => void;
  onOpenEnquiry: (serviceName?: string) => void;
  onOpenWhatsAppModal: () => void;
}

const SERVICE_ICON_MAP: Record<string, React.ReactNode> = {
  Receipt: <Receipt className="w-8 h-8 text-[#D4B477]" />,
  FileSpreadsheet: <FileSpreadsheet className="w-8 h-8 text-[#D4B477]" />,
  BookOpenCheck: <BookOpenCheck className="w-8 h-8 text-[#D4B477]" />,
  Calculator: <Calculator className="w-8 h-8 text-[#D4B477]" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8 text-[#D4B477]" />,
  TrendingUp: <TrendingUp className="w-8 h-8 text-[#D4B477]" />,
};

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
  serviceId,
  onNavigate,
  onOpenEnquiry,
  onOpenWhatsAppModal,
}) => {
  const service = ALL_SERVICES.find((s) => s.id === serviceId) || ALL_SERVICES[0];

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Header Banner */}
      <section className="bg-[#142B46] text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4B477] mb-2">
              <button
                onClick={() => onNavigate('services')}
                className="hover:underline text-slate-300"
              >
                Services
              </button>
              <span aria-hidden="true">/</span>
              <span>{service.title}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white mb-3">
              {service.title}
            </h1>
            <p className="text-base text-slate-200 font-sans leading-relaxed">
              {service.tagline}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenEnquiry(service.title)}
                className="px-5 py-2.5 bg-[#D4B477] hover:bg-[#C4A05B] text-[#142B46] font-bold text-xs rounded-lg transition-all shadow-xs flex items-center gap-2"
              >
                <span>Enquire About {service.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenWhatsAppModal}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Detailed Service Explanation */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4B477] block mb-1">
                  Scope of Services
                </span>
                <h2 className="text-2xl font-bold font-serif text-[#142B46] mb-4">
                  What We Offer Under {service.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {service.shortDescription}
                </p>

                <div className="space-y-3.5">
                  {service.offerings.map((offering, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg bg-[#F5F6F8] border border-slate-200/80 flex items-start gap-3 hover:border-slate-300 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#142B46] text-[#D4B477] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                        {offering}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4B477] block mb-1">
                  Value Proposition
                </span>
                <h2 className="text-2xl font-bold font-serif text-[#142B46] mb-4">
                  Key Benefits for Your Practice &amp; Business
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applicable Taxpayers / Client Profiles */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4B477] block mb-1">
                  Applicability
                </span>
                <h2 className="text-xl font-bold font-serif text-[#142B46] mb-4">
                  Ideal For
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {service.applicableFor.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-md bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* FAQs if present */}
              {service.faqs && service.faqs.length > 0 && (
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="text-lg font-bold font-serif text-[#142B46] mb-4 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#D4B477]" />
                    <span>Frequently Asked Questions</span>
                  </h3>
                  <div className="space-y-4">
                    {service.faqs.map((faq, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                        <h4 className="text-xs font-bold text-[#142B46] mb-1.5">{faq.q}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Consultation Request Box */}
              <div className="bg-[#142B46] text-white p-6 rounded-2xl shadow-lg border border-[#0F2035]">
                <h3 className="text-base font-bold font-serif mb-2 text-white">
                  Need Help With {service.title}?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Speak directly with our team in Mira Road to discuss your specific requirements.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => onOpenEnquiry(service.title)}
                    className="w-full py-2.5 px-4 bg-[#D4B477] hover:bg-[#C4A05B] text-[#142B46] font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Request Service Consultation</span>
                  </button>

                  <button
                    onClick={onOpenWhatsAppModal}
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Contact Options</span>
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-xs text-slate-300">
                  <div className="font-semibold text-white">Direct Phone Lines:</div>
                  <a
                    href={BUSINESS_INFO.contactPerson1.telLink}
                    className="flex items-center gap-2 hover:text-[#D4B477]"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#D4B477]" />
                    <span>Contact 1: {BUSINESS_INFO.contactPerson1.displayPhone}</span>
                  </a>
                  <a
                    href={BUSINESS_INFO.contactPerson2.telLink}
                    className="flex items-center gap-2 hover:text-[#D4B477]"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#D4B477]" />
                    <span>Contact 2: {BUSINESS_INFO.contactPerson2.displayPhone}</span>
                  </a>
                </div>
              </div>

              {/* All Services Navigation Card */}
              <div className="bg-[#F5F6F8] p-5 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  All Practice Areas
                </h4>
                <div className="flex flex-col gap-1.5 text-xs font-medium">
                  {ALL_SERVICES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        if (s.id === 'gst') onNavigate('service-gst');
                        else if (s.id === 'incometax') onNavigate('service-incometax');
                        else if (s.id === 'accounting') onNavigate('service-accounting');
                        else if (s.id === 'tds') onNavigate('service-tds');
                        else if (s.id === 'compliance') onNavigate('service-compliance');
                        else onNavigate('services');
                      }}
                      className={`text-left p-2 rounded-md transition-colors flex items-center justify-between ${
                        s.id === service.id
                          ? 'bg-[#142B46] text-white font-bold'
                          : 'text-slate-700 hover:bg-white hover:text-[#142B46]'
                      }`}
                    >
                      <span>{s.title}</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
