import React from 'react';
import { NavigationTarget } from '../components/Header';
import { HOMEPAGE_SERVICES } from '../data/servicesData';
import { BUSINESS_INFO } from '../data/contactInfo';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Clock,
  UserCheck,
  FileSpreadsheet,
  Building2,
  Receipt,
  FileText,
  Percent,
  BookOpen,
  PieChart,
  Users,
  TrendingUp,
  MessageCircle,
  PhoneCall,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: NavigationTarget) => void;
  onOpenEnquiry: (serviceName?: string) => void;
  onOpenWhatsAppModal: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-6 h-6 text-[#D4B477]" />,
  Receipt: <Receipt className="w-6 h-6 text-[#D4B477]" />,
  FileText: <FileText className="w-6 h-6 text-[#D4B477]" />,
  Percent: <Percent className="w-6 h-6 text-[#D4B477]" />,
  BookOpen: <BookOpen className="w-6 h-6 text-[#D4B477]" />,
  PieChart: <PieChart className="w-6 h-6 text-[#D4B477]" />,
  Users: <Users className="w-6 h-6 text-[#D4B477]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#D4B477]" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-[#D4B477]" />,
};

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenEnquiry,
  onOpenWhatsAppModal,
}) => {
  return (
    <div className="flex flex-col w-full">
      {/* A. Hero Section */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center bg-[#142B46] text-white overflow-hidden">
        {/* Background image with high quality photo & deep navy scrim overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_financial_advisory_1794381909039.jpg"
            alt="Haryani and Associates Modern Financial Office"
            className="w-full h-full object-cover object-center opacity-25"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F2035] via-[#142B46]/90 to-[#142B46]/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl">
            {/* Unboxed editorial badge */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D4B477] mb-4">
              <span>Mira Road, Maharashtra</span>
              <span aria-hidden="true">·</span>
              <span>Your Trusted Financial Partner</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight leading-tight mb-6 text-white text-balance">
              Simplifying Accounting, Taxation &amp; Business Compliance.
            </h1>

            <p className="text-base sm:text-lg text-slate-200 font-sans leading-relaxed mb-8 max-w-2xl">
              Reliable financial solutions and personalised support for individuals and businesses.
            </p>

            {/* 3 Requested Hero Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => onNavigate('services')}
                className="px-6 py-3.5 bg-[#D4B477] hover:bg-[#C4A05B] text-[#142B46] text-sm font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg border border-white/25 backdrop-blur-xs transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#D4B477]" />
                <span>Contact Us</span>
              </button>

              <button
                onClick={onOpenWhatsAppModal}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </button>
            </div>

            {/* Key Service Highlights Strip */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300">
              <div>
                <div className="font-bold text-white text-sm">GST Registration</div>
                <div className="text-slate-400">Monthly Returns &amp; ITC</div>
              </div>
              <div>
                <div className="font-bold text-white text-sm">Income Tax Returns</div>
                <div className="text-slate-400">Salaried &amp; Business ITR</div>
              </div>
              <div>
                <div className="font-bold text-white text-sm">TDS &amp; Payroll</div>
                <div className="text-slate-400">Quarterly Form 24Q/26Q</div>
              </div>
              <div>
                <div className="font-bold text-white text-sm">Bookkeeping</div>
                <div className="text-slate-400">Ledgers &amp; Balance Sheets</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. Introduction Section */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4B477]">
              Welcome to Haryani &amp; Associates
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#142B46] mt-2 mb-6">
              Dedicated Financial Care for Your Growing Business
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Haryani &amp; Associates is an accounting, taxation and business compliance consultancy based in Mira Road, Maharashtra, serving individual professionals, traders, and growing enterprises across India. We believe in providing structured financial assistance that allows business owners to focus on core operations with total peace of mind.
            </p>
          </div>

          {/* Core Pillars: Professional support, Accuracy, Transparency, Timely assistance, Personalised financial services */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="p-5 rounded-xl bg-[#F5F6F8] border border-slate-200/80 hover:border-[#D4B477]/60 transition-all flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#142B46] mb-3 shadow-xs">
                <ShieldCheck className="w-6 h-6 text-[#D4B477]" />
              </div>
              <h3 className="text-sm font-bold text-[#142B46] mb-1.5 font-serif">
                Professional Support
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Diligent, courteous, and knowledgeable assistance tailored to your business profile.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F5F6F8] border border-slate-200/80 hover:border-[#D4B477]/60 transition-all flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#142B46] mb-3 shadow-xs">
                <CheckCircle className="w-6 h-6 text-[#D4B477]" />
              </div>
              <h3 className="text-sm font-bold text-[#142B46] mb-1.5 font-serif">
                Accuracy
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Meticulous transaction reconciliation and computation aligning with statutory rules.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F5F6F8] border border-slate-200/80 hover:border-[#D4B477]/60 transition-all flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#142B46] mb-3 shadow-xs">
                <FileSpreadsheet className="w-6 h-6 text-[#D4B477]" />
              </div>
              <h3 className="text-sm font-bold text-[#142B46] mb-1.5 font-serif">
                Transparency
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear fee structures, straightforward explanations, and zero hidden surprises.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F5F6F8] border border-slate-200/80 hover:border-[#D4B477]/60 transition-all flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#142B46] mb-3 shadow-xs">
                <Clock className="w-6 h-6 text-[#D4B477]" />
              </div>
              <h3 className="text-sm font-bold text-[#142B46] mb-1.5 font-serif">
                Timely Assistance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Proactive scheduling to ensure statutory return deadlines are never missed.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F5F6F8] border border-slate-200/80 hover:border-[#D4B477]/60 transition-all flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#142B46] mb-3 shadow-xs">
                <UserCheck className="w-6 h-6 text-[#D4B477]" />
              </div>
              <h3 className="text-sm font-bold text-[#142B46] mb-1.5 font-serif">
                Personalised Care
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                One-on-one attention with direct contact channels for fast answers to your queries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* C. Our Services Section */}
      <section className="py-20 bg-[#F5F6F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4B477]">
                Areas of Expertise
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#142B46] mt-2">
                Our Professional Services
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-xl">
                Comprehensive accounting, taxation, and statutory compliance assistance crafted for individuals, proprietorships, and growing commercial ventures.
              </p>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-[#142B46] hover:text-[#D4B477] transition-colors"
            >
              <span>View All Detailed Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 9 Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOMEPAGE_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#D4B477] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#142B46]/5 group-hover:bg-[#142B46] flex items-center justify-center transition-colors mb-4">
                    {ICON_MAP[srv.icon] || <FileText className="w-6 h-6 text-[#D4B477]" />}
                  </div>
                  <h3 className="text-base font-bold font-serif text-[#142B46] mb-2 group-hover:text-[#142B46]">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                  <button
                    onClick={() => {
                      if (srv.servicePageId === 'gst') onNavigate('service-gst');
                      else if (srv.servicePageId === 'incometax') onNavigate('service-incometax');
                      else if (srv.servicePageId === 'accounting') onNavigate('service-accounting');
                      else if (srv.servicePageId === 'tds') onNavigate('service-tds');
                      else if (srv.servicePageId === 'compliance') onNavigate('service-compliance');
                      else onNavigate('services');
                    }}
                    className="text-[#142B46] hover:text-[#D4B477] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenEnquiry(srv.title)}
                    className="text-xs text-slate-500 hover:text-[#142B46] font-medium"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tools Teaser Banner */}
      <section className="py-12 bg-[#142B46] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1">
              <span className="text-xs font-bold text-[#D4B477] uppercase tracking-wider">
                Self-Service Financial Utilities
              </span>
              <h3 className="text-xl font-bold font-serif mt-1 mb-2 text-white">
                Interactive Calculators &amp; Schedule
              </h3>
              <p className="text-xs text-slate-300">
                Explore our free online tools for immediate GST computations and income tax regime comparisons.
              </p>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => onNavigate('gst-calculator')}
                className="bg-white/10 hover:bg-white/20 border border-white/20 p-4 rounded-xl text-left transition-all group"
              >
                <div className="text-[#D4B477] font-serif font-bold text-sm mb-1 group-hover:text-white transition-colors">
                  GST Calculator &rarr;
                </div>
                <div className="text-[11px] text-slate-300">
                  Exclusive vs Inclusive &amp; CGST/SGST/IGST breakdown.
                </div>
              </button>

              <button
                onClick={() => onNavigate('tax-estimator')}
                className="bg-white/10 hover:bg-white/20 border border-white/20 p-4 rounded-xl text-left transition-all group"
              >
                <div className="text-[#D4B477] font-serif font-bold text-sm mb-1 group-hover:text-white transition-colors">
                  Income Tax Estimator &rarr;
                </div>
                <div className="text-[11px] text-slate-300">
                  Side-by-side Old vs New Tax Regime computation.
                </div>
              </button>

              <button
                onClick={() => onNavigate('calendar')}
                className="bg-white/10 hover:bg-white/20 border border-white/20 p-4 rounded-xl text-left transition-all group"
              >
                <div className="text-[#D4B477] font-serif font-bold text-sm mb-1 group-hover:text-white transition-colors">
                  Compliance Calendar &rarr;
                </div>
                <div className="text-[11px] text-slate-300">
                  Upcoming statutory deadlines for GST, TDS &amp; ITR.
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* D. Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4B477]">
                The Haryani &amp; Associates Difference
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#142B46] mt-2 mb-6">
                Why Clients Count on Our Guidance
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Managing taxes and statutory compliance should not pull your focus away from serving your customers and growing your business. Here is why clients choose us as their ongoing financial advisory partner:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D4B477]/20 text-[#142B46] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#142B46]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#142B46]">Reliable Professional Assistance</h4>
                    <p className="text-xs text-slate-500">Structured attention to detail backed by practical Indian taxation knowledge.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D4B477]/20 text-[#142B46] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#142B46]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#142B46]">Personalised Support</h4>
                    <p className="text-xs text-slate-500">Direct contact with designated consultants rather than an impersonal ticketing queue.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D4B477]/20 text-[#142B46] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#142B46]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#142B46]">Accurate Accounting</h4>
                    <p className="text-xs text-slate-500">Strict adherence to standard bookkeeping conventions and itemized GST classifications.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D4B477]/20 text-[#142B46] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#142B46]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#142B46]">Transparent Communication</h4>
                    <p className="text-xs text-slate-500">Every tax computation and return breakdown is explained clearly without confusing jargon.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D4B477]/20 text-[#142B46] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#142B46]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#142B46]">Timely Compliance Support</h4>
                    <p className="text-xs text-slate-500">Early tracking of due dates prevents costly penalties and statutory notices.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-[#142B46]">
                <img
                  src="/src/assets/images/about_consultancy_office_1794381907787.jpg"
                  alt="Haryani and Associates Consulting Room"
                  className="w-full h-80 sm:h-96 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-6 bg-gradient-to-t from-[#0F2035] via-[#142B46]/95 to-transparent text-white">
                  <h3 className="font-serif text-lg font-bold text-white mb-2">
                    Serving Mira Road &amp; Clients Nationwide
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Whether you are an individual requiring annual ITR guidance or a commercial establishment seeking full-fledged monthly bookkeeping and GST reconciliation, we tailor our involvement to your operational pace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E. Our Process (4 Simple Steps) */}
      <section className="py-20 bg-[#F5F6F8] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4B477]">
              How We Work
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#142B46] mt-2 mb-4">
              Our Straightforward Four-Step Process
            </h2>
            <p className="text-sm text-slate-600">
              Engaging with Haryani &amp; Associates is seamless, transparent, and structured around your convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 relative shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#142B46] text-[#D4B477] font-serif font-bold text-base flex items-center justify-center mb-4">
                01
              </div>
              <h3 className="text-sm font-bold font-serif text-[#142B46] mb-2">
                1. Initial Enquiry
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reach out to either of our designated contact persons via phone call, WhatsApp, or our public enquiry form.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 relative shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#142B46] text-[#D4B477] font-serif font-bold text-base flex items-center justify-center mb-4">
                02
              </div>
              <h3 className="text-sm font-bold font-serif text-[#142B46] mb-2">
                2. Understanding Requirements
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We review your business nature, transaction volumes, and compliance obligations to propose a tailored plan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 relative shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#142B46] text-[#D4B477] font-serif font-bold text-base flex items-center justify-center mb-4">
                03
              </div>
              <h3 className="text-sm font-bold font-serif text-[#142B46] mb-2">
                3. Professional Assistance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our team carries out accurate bookkeeping, tax computations, and return preparation with rigorous validation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 relative shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#142B46] text-[#D4B477] font-serif font-bold text-base flex items-center justify-center mb-4">
                04
              </div>
              <h3 className="text-sm font-bold font-serif text-[#142B46] mb-2">
                4. Ongoing Support
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Continuous compliance reminders, regular financial reviews, and year-round consultation as your business expands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* F. Call to Action Section */}
      <section className="py-20 bg-[#142B46] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4B477] block mb-2">
            Take The Next Step
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-4 text-white">
            Looking for Reliable Accounting and Taxation Support?
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto mb-8">
            Connect with Haryani &amp; Associates today for personalised guidance on GST, Income Tax, TDS, or business compliance in Mira Road and across India.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 bg-[#D4B477] hover:bg-[#C4A05B] text-[#142B46] font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Us</span>
            </button>

            <button
              onClick={onOpenWhatsAppModal}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
