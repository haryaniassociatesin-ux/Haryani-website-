import React from 'react';
import { NavigationTarget } from '../components/Header';
import { BUSINESS_INFO } from '../data/contactInfo';
import {
  ShieldCheck,
  Target,
  Eye,
  CheckCircle2,
  Users,
  Compass,
  FileCheck,
  PhoneCall,
  MessageCircle
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: NavigationTarget) => void;
  onOpenEnquiry: (serviceName?: string) => void;
  onOpenWhatsAppModal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigate,
  onOpenEnquiry,
  onOpenWhatsAppModal,
}) => {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Page Header Banner */}
      <section className="bg-[#142B46] text-white py-16 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4B477] block mb-2">
              About Our Consultancy
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-white mb-4">
              Your Trusted Financial &amp; Taxation Partner
            </h1>
            <p className="text-base text-slate-300 leading-relaxed font-sans">
              Dedicated accounting, taxation, and statutory compliance assistance grounded in precision, transparency, and dependable client support.
            </p>
          </div>
        </div>
      </section>

      {/* Main Introduction and Business Background */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4B477]">
                Business Background
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#142B46]">
                Built on Integrity, Accuracy, and Client Commitment
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Haryani &amp; Associates is a professional accounting, taxation, and business compliance consultancy operating from Mira Road, Maharashtra, India. We work closely with individual tax assessees, retail merchants, wholesalers, manufacturers, and emerging service businesses.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Modern Indian financial regulations require diligent bookkeeping, prompt GST reconciliations, and strict adherence to tax withholding and filing schedules. Our practice was established to relieve entrepreneurs and professionals from the administrative strain of compliance, giving them structured, reliable books and peace of mind.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                We believe that every client deserves direct, respectful attention and clear, understandable advice without confusing jargon or unnecessary complexity.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-5 py-2.5 bg-[#142B46] hover:bg-[#0F2035] text-white text-xs font-semibold rounded-lg shadow-xs transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#D4B477]" />
                  <span>Contact Our Team</span>
                </button>
                <button
                  onClick={onOpenWhatsAppModal}
                  className="px-5 py-2.5 bg-[#D4B477]/20 hover:bg-[#D4B477]/30 text-[#142B46] text-xs font-semibold rounded-lg border border-[#D4B477]/50 transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                <img
                  src="/src/assets/images/about_consultancy_office_1794381907787.jpg"
                  alt="Haryani and Associates Consulting Facility"
                  className="w-full h-80 sm:h-96 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 bg-[#F5F6F8] border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <span>Consultancy Office Location:</span>
                  <span className="font-semibold text-[#142B46]">{BUSINESS_INFO.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-[#F5F6F8] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-[#142B46]/5 text-[#142B46] flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-[#D4B477]" />
              </div>
              <h3 className="text-xl font-bold font-serif text-[#142B46] mb-3">
                Our Mission
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To simplify the complexities of taxation and commercial accounting for Indian businesses and individuals by delivering dependable, accurate, and prompt professional services that foster financial order and sustainable business confidence.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-[#142B46]/5 text-[#142B46] flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-[#D4B477]" />
              </div>
              <h3 className="text-xl font-bold font-serif text-[#142B46] mb-3">
                Our Vision
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To be recognized across Maharashtra and beyond as a steadfast, trusted financial partner known for unyielding accuracy, practical problem solving, transparent client communication, and personalized professional integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4B477]">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#142B46] mt-2 mb-4">
              Our Professional Values
            </h2>
            <p className="text-sm text-slate-600">
              The ethical and operational commitments that shape every consultation, computation, and ledger entry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-[#F5F6F8]/60 hover:border-[#D4B477] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#142B46] text-[#D4B477] flex items-center justify-center mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold font-serif text-[#142B46] mb-2">
                Commitment to Accuracy
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We verify calculations thoroughly, cross-checking GST invoices, TDS withholdings, and ledger balances to maintain complete mathematical precision.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-[#F5F6F8]/60 hover:border-[#D4B477] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#142B46] text-[#D4B477] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold font-serif text-[#142B46] mb-2">
                Total Transparency
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                No hidden fees or obscure billing. We explain statutory requirements plainly so clients always know where their compliance status stands.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-[#F5F6F8]/60 hover:border-[#D4B477] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#142B46] text-[#D4B477] flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold font-serif text-[#142B46] mb-2">
                Confidentiality
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Client financial data, turnover figures, and business details are treated with the highest level of professional discretion and confidentiality.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-[#F5F6F8]/60 hover:border-[#D4B477] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#142B46] text-[#D4B477] flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold font-serif text-[#142B46] mb-2">
                Personalised Attention
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We take time to understand the unique characteristics of each business trade flow, adapting our service to your exact operational requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#142B46] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold font-serif mb-3 text-white">
            Ready to Streamline Your Accounts &amp; Taxes?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Get in touch with our office in Mira Road for reliable, structured, and personalized financial support.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 bg-[#D4B477] hover:bg-[#C4A05B] text-[#142B46] font-bold text-xs rounded-lg transition-all"
            >
              Contact Us Today
            </button>
            <button
              onClick={() => onOpenEnquiry()}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-lg border border-white/20 transition-all"
            >
              Submit an Enquiry
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
