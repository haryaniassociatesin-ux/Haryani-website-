import React from 'react';
import { BUSINESS_INFO } from '../data/contactInfo';
import { Shield, Lock, FileText, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { NavigationTarget } from '../components/Header';

interface PrivacyPolicyViewProps {
  onNavigate: (view: NavigationTarget) => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full bg-[#F5F6F8]">
      {/* Header Banner */}
      <section className="bg-[#142B46] text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4B477] block mb-2">
              Legal &amp; Transparency
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              Our commitment to safeguarding your enquiry information and respecting your privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Main Policy Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-8 text-sm text-slate-700 leading-relaxed">
            {/* Introduction */}
            <div>
              <h2 className="text-xl font-bold font-serif text-[#142B46] mb-3">
                1. Overview
              </h2>
              <p>
                Haryani &amp; Associates (&quot;we&quot;, &quot;our&quot;, or &quot;the firm&quot;) values your trust and is committed to protecting your personal information. This Privacy Policy outlines our practices regarding information submitted through our public website.
              </p>
            </div>

            {/* Crucial Notice: No Client Portal or Document Upload */}
            <div className="p-5 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-950 font-serif text-base">
                <Lock className="w-5 h-5 text-amber-700" />
                <span>Notice on Website Scope &amp; Client Data</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                <strong>This website is exclusively a public business website.</strong> The website does not provide client registration, client login, a private client dashboard, online document uploading, or online document storage. We strictly do not request or store sensitive financial instruments, bank credentials, PAN cards, or Aadhaar cards on this website.
              </p>
            </div>

            {/* Information Collected */}
            <div>
              <h2 className="text-xl font-bold font-serif text-[#142B46] mb-3">
                2. Information Collected Through the Enquiry Form
              </h2>
              <p className="mb-3">
                When you choose to contact us using our online enquiry form, we collect only the minimum necessary information:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                <li><strong>Full Name:</strong> To address you properly in communications.</li>
                <li><strong>Phone Number:</strong> To contact you regarding your requested services.</li>
                <li><strong>Email Address (Optional):</strong> To send written quotes or responses.</li>
                <li><strong>Service Required:</strong> To route your enquiry to the appropriate consultation topic.</li>
                <li><strong>General Enquiry Message:</strong> High-level notes detailing your query.</li>
              </ul>
            </div>

            {/* Purpose */}
            <div>
              <h2 className="text-xl font-bold font-serif text-[#142B46] mb-3">
                3. Purpose of Collection
              </h2>
              <p>
                Information collected is used solely to evaluate your service requirements, schedule an initial consultation, respond to your specific questions, and provide transparent estimates for our professional accounting and taxation services.
              </p>
            </div>

            {/* Data Handling & Security */}
            <div>
              <h2 className="text-xl font-bold font-serif text-[#142B46] mb-3">
                4. Data Handling &amp; Confidentiality
              </h2>
              <p>
                We do not sell, rent, lease, or distribute your contact details to third-party marketing companies. All enquiries submitted through our website or direct communication channels are treated with strict professional confidentiality.
              </p>
            </div>

            {/* Rights to Correction & Deletion */}
            <div>
              <h2 className="text-xl font-bold font-serif text-[#142B46] mb-3">
                5. Correction and Deletion of Enquiry Data
              </h2>
              <p className="mb-3">
                If you have submitted an enquiry and wish to correct the details or request deletion of your contact records, you may notify us at any time by contacting our designated consultants:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="font-sans font-bold text-slate-900 mb-1">
                    {BUSINESS_INFO.contactPerson1.label}
                  </div>
                  <div>Email: {BUSINESS_INFO.contactPerson1.email}</div>
                  <div>Phone: {BUSINESS_INFO.contactPerson1.displayPhone}</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="font-sans font-bold text-slate-900 mb-1">
                    {BUSINESS_INFO.contactPerson2.label}
                  </div>
                  <div>Email: {BUSINESS_INFO.contactPerson2.email}</div>
                  <div>Phone: {BUSINESS_INFO.contactPerson2.displayPhone}</div>
                </div>
              </div>
            </div>

            {/* Office Contact for Privacy Concerns */}
            <div className="pt-6 border-t border-slate-200">
              <h2 className="text-base font-bold font-serif text-[#142B46] mb-2">
                6. Office Address for Correspondence
              </h2>
              <p className="text-xs text-slate-600">
                Haryani &amp; Associates<br />
                {BUSINESS_INFO.location}<br />
                Office consultations scheduled by prior appointment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
