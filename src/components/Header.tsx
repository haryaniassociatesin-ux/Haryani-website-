import React, { useState } from 'react';
import { Logo } from './Logo';
import { BUSINESS_INFO } from '../data/contactInfo';
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  MessageCircle,
  Calculator,
  Calendar,
  FileText,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export type NavigationTarget =
  | 'home'
  | 'about'
  | 'services'
  | 'service-gst'
  | 'service-incometax'
  | 'service-accounting'
  | 'service-tds'
  | 'service-compliance'
  | 'gst-calculator'
  | 'tax-estimator'
  | 'calendar'
  | 'contact'
  | 'privacy';

interface HeaderProps {
  currentView: NavigationTarget;
  onNavigate: (view: NavigationTarget) => void;
  onOpenEnquiry: (serviceName?: string) => void;
  onOpenWhatsAppModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenEnquiry,
  onOpenWhatsAppModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const handleNavClick = (view: NavigationTarget) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setToolsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isServicesActive = [
    'services',
    'service-gst',
    'service-incometax',
    'service-accounting',
    'service-tds',
    'service-compliance',
  ].includes(currentView);

  const isToolsActive = ['gst-calculator', 'tax-estimator', 'calendar'].includes(currentView);

  return (
    <>
      {/* Top Banner with Quick Direct Contacts */}
      <div className="bg-[#0F2035] text-slate-300 text-xs py-2 px-3 sm:px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] sm:text-xs">
            <span className="text-[#D4B477] font-semibold tracking-wide">Office:</span>
            <span>{BUSINESS_INFO.location}</span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-400 hidden md:inline">{BUSINESS_INFO.tagline}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-medium">
            <a
              href={BUSINESS_INFO.contactPerson1.telLink}
              className="flex items-center gap-1 hover:text-[#D4B477] transition-colors"
              title="Call Contact Person 1"
            >
              <Phone className="w-3 h-3 text-[#D4B477]" />
              <span>Contact 1: {BUSINESS_INFO.contactPerson1.displayPhone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={BUSINESS_INFO.contactPerson2.telLink}
              className="flex items-center gap-1 hover:text-[#D4B477] transition-colors"
              title="Call Contact Person 2"
            >
              <Phone className="w-3 h-3 text-[#D4B477]" />
              <span>Contact 2: {BUSINESS_INFO.contactPerson2.displayPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Follows 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#D4B477] rounded-sm py-1 max-w-[240px] sm:max-w-none"
            aria-label="Haryani and Associates Home"
          >
            <Logo variant="dark" size="md" showTagline={true} />
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#384252]">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#142B46] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentView === 'home'
                  ? 'text-[#142B46] font-semibold border-[#D4B477]'
                  : 'border-transparent text-slate-700'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#142B46] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentView === 'about'
                  ? 'text-[#142B46] font-semibold border-[#D4B477]'
                  : 'border-transparent text-slate-700'
              }`}
            >
              About Us
            </button>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('services')}
                className={`flex items-center gap-1 hover:text-[#142B46] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  isServicesActive
                    ? 'text-[#142B46] font-semibold border-[#D4B477]'
                    : 'border-transparent text-slate-700'
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown className="w-4 h-4 opacity-70" />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-lg shadow-xl border border-slate-200 py-2 mt-1 z-50">
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-[#142B46] hover:bg-slate-50 border-b border-slate-100 flex items-center justify-between"
                  >
                    <span>All Services Overview</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4B477]" />
                  </button>
                  <button
                    onClick={() => handleNavClick('service-gst')}
                    className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#142B46] transition-colors"
                  >
                    GST Services &amp; Filing
                  </button>
                  <button
                    onClick={() => handleNavClick('service-incometax')}
                    className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#142B46] transition-colors"
                  >
                    Income Tax Return (ITR)
                  </button>
                  <button
                    onClick={() => handleNavClick('service-accounting')}
                    className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#142B46] transition-colors"
                  >
                    Accounting &amp; Bookkeeping
                  </button>
                  <button
                    onClick={() => handleNavClick('service-tds')}
                    className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#142B46] transition-colors"
                  >
                    TDS &amp; Payroll Compliance
                  </button>
                  <button
                    onClick={() => handleNavClick('service-compliance')}
                    className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#142B46] transition-colors"
                  >
                    Business Registration &amp; Compliance
                  </button>
                </div>
              )}
            </div>

            {/* Calculators & Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 hover:text-[#142B46] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  isToolsActive
                    ? 'text-[#142B46] font-semibold border-[#D4B477]'
                    : 'border-transparent text-slate-700'
                }`}
                aria-expanded={toolsDropdownOpen}
              >
                <span>Calculators &amp; Tools</span>
                <ChevronDown className="w-4 h-4 opacity-70" />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-2 mt-1 z-50">
                  <button
                    onClick={() => handleNavClick('gst-calculator')}
                    className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#142B46] transition-colors flex items-center gap-2"
                  >
                    <Calculator className="w-4 h-4 text-[#D4B477]" />
                    <span>Indian GST Calculator</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('tax-estimator')}
                    className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#142B46] transition-colors flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-[#D4B477]" />
                    <span>Income Tax Estimator</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('calendar')}
                    className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#142B46] transition-colors flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[#D4B477]" />
                    <span>Compliance Calendar</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('calendar')}
              className={`hover:text-[#142B46] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentView === 'calendar'
                  ? 'text-[#142B46] font-semibold border-[#D4B477]'
                  : 'border-transparent text-slate-700'
              }`}
            >
              Compliance Calendar
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`hover:text-[#142B46] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentView === 'contact'
                  ? 'text-[#142B46] font-semibold border-[#D4B477]'
                  : 'border-transparent text-slate-700'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Zone 3: Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenWhatsAppModal}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#142B46] bg-[#D4B477]/20 border border-[#D4B477]/50 rounded-md hover:bg-[#D4B477]/30 transition-colors whitespace-nowrap shrink-0"
              title="Connect via WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#142B46]" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={() => onOpenEnquiry()}
              className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-white bg-[#142B46] rounded-md hover:bg-[#0F2035] transition-colors shadow-xs whitespace-nowrap shrink-0 border border-[#142B46]"
            >
              Enquire Now
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-700 hover:text-[#142B46] hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-24 max-h-[85vh] overflow-y-auto shadow-xl">
            <div className="flex flex-col gap-1 text-sm">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full text-center py-2.5 px-4 mb-2 bg-[#142B46] text-white text-xs font-bold rounded-lg shadow-xs"
              >
                Enquire Now
              </button>
              <button
                onClick={() => handleNavClick('home')}
                className={`text-left px-3 py-2.5 rounded-md font-medium ${
                  currentView === 'home' ? 'bg-[#142B46] text-white' : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`text-left px-3 py-2.5 rounded-md font-medium ${
                  currentView === 'about' ? 'bg-[#142B46] text-white' : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                About Us
              </button>

              <button
                onClick={() => handleNavClick('services')}
                className={`text-left px-3 py-2.5 rounded-md font-medium ${
                  currentView === 'services' ? 'bg-[#142B46] text-white' : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                Services Overview
              </button>

              <div className="pl-4 py-1 flex flex-col gap-1 border-l-2 border-[#D4B477]/40 ml-2">
                <button
                  onClick={() => handleNavClick('service-gst')}
                  className="text-left px-3 py-2 text-xs text-slate-700 hover:text-[#142B46]"
                >
                  GST Services &amp; Filing
                </button>
                <button
                  onClick={() => handleNavClick('service-incometax')}
                  className="text-left px-3 py-2 text-xs text-slate-700 hover:text-[#142B46]"
                >
                  Income Tax Services (ITR)
                </button>
                <button
                  onClick={() => handleNavClick('service-accounting')}
                  className="text-left px-3 py-2 text-xs text-slate-700 hover:text-[#142B46]"
                >
                  Accounting &amp; Bookkeeping
                </button>
                <button
                  onClick={() => handleNavClick('service-tds')}
                  className="text-left px-3 py-2 text-xs text-slate-700 hover:text-[#142B46]"
                >
                  TDS &amp; Payroll Compliance
                </button>
                <button
                  onClick={() => handleNavClick('service-compliance')}
                  className="text-left px-3 py-2 text-xs text-slate-700 hover:text-[#142B46]"
                >
                  Business Registration &amp; Compliance
                </button>
              </div>

              <button
                onClick={() => handleNavClick('gst-calculator')}
                className={`text-left px-3 py-2.5 rounded-md font-medium flex items-center gap-2 ${
                  currentView === 'gst-calculator' ? 'bg-[#142B46] text-white' : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Calculator className="w-4 h-4 text-[#D4B477]" />
                <span>GST Calculator</span>
              </button>

              <button
                onClick={() => handleNavClick('tax-estimator')}
                className={`text-left px-3 py-2.5 rounded-md font-medium flex items-center gap-2 ${
                  currentView === 'tax-estimator' ? 'bg-[#142B46] text-white' : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-4 h-4 text-[#D4B477]" />
                <span>Income Tax Estimator</span>
              </button>

              <button
                onClick={() => handleNavClick('calendar')}
                className={`text-left px-3 py-2.5 rounded-md font-medium flex items-center gap-2 ${
                  currentView === 'calendar' ? 'bg-[#142B46] text-white' : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Calendar className="w-4 h-4 text-[#D4B477]" />
                <span>Compliance Calendar</span>
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`text-left px-3 py-2.5 rounded-md font-medium ${
                  currentView === 'contact' ? 'bg-[#142B46] text-white' : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                Contact Us
              </button>

              {/* Direct Quick Actions on Mobile */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenWhatsAppModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#D4B477]/20 text-[#142B46] font-semibold text-xs rounded-md border border-[#D4B477]/60"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Choose WhatsApp Contact</span>
                </button>

                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <a
                    href={BUSINESS_INFO.contactPerson1.telLink}
                    className="py-2 px-2 bg-slate-100 hover:bg-slate-200 text-[#142B46] rounded-md font-medium"
                  >
                    Call Contact 1
                  </a>
                  <a
                    href={BUSINESS_INFO.contactPerson2.telLink}
                    className="py-2 px-2 bg-slate-100 hover:bg-slate-200 text-[#142B46] rounded-md font-medium"
                  >
                    Call Contact 2
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
