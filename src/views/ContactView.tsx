import React from 'react';
import { BUSINESS_INFO } from '../data/contactInfo';
import { EnquiryForm } from '../components/EnquiryForm';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  User,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export const ContactView: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-[#F5F6F8]">
      {/* Header Banner */}
      <section className="bg-[#142B46] text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4B477] block mb-2">
              Direct Contact Information
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white mb-2">
              Get in Touch with Haryani &amp; Associates
            </h1>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              We provide dedicated, direct communication for all accounting, taxation, and business compliance enquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Two Distinct Contact Cards + Office Details + Enquiry Form */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section: Two Contact Cards */}
          <div className="mb-12">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4B477] block">
                Designated Points of Contact
              </span>
              <h2 className="text-2xl font-bold font-serif text-[#142B46] mt-1">
                Reach Out Directly to Our Team
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Connect directly with either contact person via phone call, WhatsApp, or email.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Card 1 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:border-[#D4B477] transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#142B46] text-[#D4B477] flex items-center justify-center font-serif font-bold text-lg shadow-xs">
                        1
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-serif text-[#142B46]">
                          {BUSINESS_INFO.contactPerson1.label}
                        </h3>
                        <p className="text-xs text-[#D4B477] font-semibold">
                          Accounting &amp; Taxation Consultant
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div>
                      <span className="text-xs text-slate-500 block mb-0.5 font-medium">
                        Mobile Telephone:
                      </span>
                      <a
                        href={BUSINESS_INFO.contactPerson1.telLink}
                        className="text-base font-bold font-mono text-[#142B46] hover:text-[#D4B477] flex items-center gap-2 transition-colors"
                      >
                        <Phone className="w-4 h-4 text-[#D4B477]" />
                        <span>{BUSINESS_INFO.contactPerson1.displayPhone}</span>
                      </a>
                    </div>

                    <div>
                      <span className="text-xs text-slate-500 block mb-0.5 font-medium">
                        Email Address:
                      </span>
                      <a
                        href={BUSINESS_INFO.contactPerson1.mailtoLink}
                        className="text-sm font-medium text-slate-700 hover:text-[#142B46] flex items-center gap-2 transition-colors break-all"
                      >
                        <Mail className="w-4 h-4 text-[#D4B477] shrink-0" />
                        <span>{BUSINESS_INFO.contactPerson1.email}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 3 Explicit Action Buttons for Contact Person 1 */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-semibold">
                  <a
                    href={BUSINESS_INFO.contactPerson1.telLink}
                    className="py-2.5 px-3 bg-[#142B46] hover:bg-[#0F2035] text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    title="Call Contact Person 1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </a>

                  <a
                    href={BUSINESS_INFO.contactPerson1.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    title="WhatsApp Contact Person 1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={BUSINESS_INFO.contactPerson1.mailtoLink}
                    className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-[#142B46] rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
                    title="Email Contact Person 1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Us</span>
                  </a>
                </div>
              </div>

              {/* Contact Card 2 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:border-[#D4B477] transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#142B46] text-[#D4B477] flex items-center justify-center font-serif font-bold text-lg shadow-xs">
                        2
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-serif text-[#142B46]">
                          {BUSINESS_INFO.contactPerson2.label}
                        </h3>
                        <p className="text-xs text-[#D4B477] font-semibold">
                          Taxation &amp; Compliance Consultant
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div>
                      <span className="text-xs text-slate-500 block mb-0.5 font-medium">
                        Mobile Telephone:
                      </span>
                      <a
                        href={BUSINESS_INFO.contactPerson2.telLink}
                        className="text-base font-bold font-mono text-[#142B46] hover:text-[#D4B477] flex items-center gap-2 transition-colors"
                      >
                        <Phone className="w-4 h-4 text-[#D4B477]" />
                        <span>{BUSINESS_INFO.contactPerson2.displayPhone}</span>
                      </a>
                    </div>

                    <div>
                      <span className="text-xs text-slate-500 block mb-0.5 font-medium">
                        Email Address:
                      </span>
                      <a
                        href={BUSINESS_INFO.contactPerson2.mailtoLink}
                        className="text-sm font-medium text-slate-700 hover:text-[#142B46] flex items-center gap-2 transition-colors break-all"
                      >
                        <Mail className="w-4 h-4 text-[#D4B477] shrink-0" />
                        <span>{BUSINESS_INFO.contactPerson2.email}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 3 Explicit Action Buttons for Contact Person 2 */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-semibold">
                  <a
                    href={BUSINESS_INFO.contactPerson2.telLink}
                    className="py-2.5 px-3 bg-[#142B46] hover:bg-[#0F2035] text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    title="Call Contact Person 2"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </a>

                  <a
                    href={BUSINESS_INFO.contactPerson2.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    title="WhatsApp Contact Person 2"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={BUSINESS_INFO.contactPerson2.mailtoLink}
                    className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-[#142B46] rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
                    title="Email Contact Person 2"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Us</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Grid: Office Details & Public Enquiry Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Office Location & Business Information (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4B477] block mb-1">
                  Office Location
                </span>
                <h3 className="text-xl font-bold font-serif text-[#142B46] mb-3">
                  Mira Road Office
                </h3>
                <div className="flex items-start gap-3 text-sm text-slate-700">
                  <MapPin className="w-5 h-5 text-[#D4B477] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900">{BUSINESS_INFO.location}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      Exact address and conference meeting appointments arranged upon preliminary consultation.
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Operating Hours
                </span>
                <div className="flex items-start gap-3 text-xs text-slate-600">
                  <Clock className="w-4 h-4 text-[#D4B477] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-800">{BUSINESS_INFO.workingHours}</div>
                    <div className="text-slate-500 mt-0.5">
                      Sunday: Closed (Available for emergency return filing deadlines)
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#142B46] font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#D4B477]" />
                  <span>Public Business Website Notice</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Haryani &amp; Associates does not maintain private client portals or online document repositories on this website. All consultations and document handovers occur securely through established communication channels.
                </p>
              </div>
            </div>

            {/* Right: Public Enquiry Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="pb-4 border-b border-slate-100 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4B477] block">
                  Quick Consultation Form
                </span>
                <h3 className="text-xl font-bold font-serif text-[#142B46] mt-0.5">
                  Send a Business Enquiry
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Fill out your requirements below and our team will get in touch promptly.
                </p>
              </div>

              <EnquiryForm variant="inline" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
