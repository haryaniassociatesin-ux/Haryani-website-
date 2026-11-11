import React from 'react';
import { Logo } from './Logo';
import { BUSINESS_INFO } from '../data/contactInfo';
import { NavigationTarget } from './Header';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Shield,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: NavigationTarget) => void;
  onOpenWhatsAppModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenWhatsAppModal }) => {
  const currentYear = new Date().getFullYear();

  const handleLink = (view: NavigationTarget) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F2035] text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Logo variant="light" size="lg" showTagline={true} />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mt-2">
              Haryani &amp; Associates provides dedicated accounting, taxation, GST, and business compliance support for individuals, traders, and businesses in Mira Road, Maharashtra, and across India.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D4B477] mt-1">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{BUSINESS_INFO.location}</span>
            </div>
            <div className="text-xs text-slate-400">
              <span>{BUSINESS_INFO.workingHours}</span>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleLink('home')}
                  className="hover:text-[#D4B477] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('about')}
                  className="hover:text-[#D4B477] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('gst-calculator')}
                  className="hover:text-[#D4B477] transition-colors"
                >
                  GST Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('tax-estimator')}
                  className="hover:text-[#D4B477] transition-colors"
                >
                  Income Tax Estimator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('calendar')}
                  className="hover:text-[#D4B477] transition-colors"
                >
                  Compliance Calendar
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('contact')}
                  className="hover:text-[#D4B477] transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('privacy')}
                  className="hover:text-[#D4B477] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleLink('service-gst')}
                  className="hover:text-[#D4B477] transition-colors text-left"
                >
                  GST Services &amp; Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('service-incometax')}
                  className="hover:text-[#D4B477] transition-colors text-left"
                >
                  Income Tax (ITR) Filing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('service-accounting')}
                  className="hover:text-[#D4B477] transition-colors text-left"
                >
                  Accounting &amp; Bookkeeping
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('service-tds')}
                  className="hover:text-[#D4B477] transition-colors text-left"
                >
                  TDS &amp; Payroll Compliance
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('service-compliance')}
                  className="hover:text-[#D4B477] transition-colors text-left"
                >
                  Business Registration
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Persons (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Direct Contact Details
            </h4>

            {/* Contact Person 1 Card */}
            <div className="bg-[#142B46]/70 border border-slate-700/80 rounded-lg p-3.5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#D4B477]">
                  {BUSINESS_INFO.contactPerson1.label}
                </span>
                <a
                  href={BUSINESS_INFO.contactPerson1.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
              <div className="flex flex-col gap-1 text-xs">
                <a
                  href={BUSINESS_INFO.contactPerson1.telLink}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4B477]" />
                  <span>{BUSINESS_INFO.contactPerson1.displayPhone}</span>
                </a>
                <a
                  href={BUSINESS_INFO.contactPerson1.mailtoLink}
                  className="flex items-center gap-2 hover:text-white transition-colors truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#D4B477] shrink-0" />
                  <span className="truncate">{BUSINESS_INFO.contactPerson1.email}</span>
                </a>
              </div>
            </div>

            {/* Contact Person 2 Card */}
            <div className="bg-[#142B46]/70 border border-slate-700/80 rounded-lg p-3.5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#D4B477]">
                  {BUSINESS_INFO.contactPerson2.label}
                </span>
                <a
                  href={BUSINESS_INFO.contactPerson2.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
              <div className="flex flex-col gap-1 text-xs">
                <a
                  href={BUSINESS_INFO.contactPerson2.telLink}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4B477]" />
                  <span>{BUSINESS_INFO.contactPerson2.displayPhone}</span>
                </a>
                <a
                  href={BUSINESS_INFO.contactPerson2.mailtoLink}
                  className="flex items-center gap-2 hover:text-white transition-colors truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#D4B477] shrink-0" />
                  <span className="truncate">{BUSINESS_INFO.contactPerson2.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} {BUSINESS_INFO.name}. All rights reserved. Office based in {BUSINESS_INFO.location}.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => handleLink('privacy')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">·</span>
            <span>Public Business Website</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
