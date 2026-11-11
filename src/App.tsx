import React, { useState, useEffect } from 'react';
import { Header, NavigationTarget } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { EnquiryModal } from './components/EnquiryModal';

// Views
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ServicesOverviewView } from './views/ServicesOverviewView';
import { ServiceDetailView } from './views/ServiceDetailView';
import { GstCalculatorView } from './views/GstCalculatorView';
import { IncomeTaxEstimatorView } from './views/IncomeTaxEstimatorView';
import { ComplianceCalendarView } from './views/ComplianceCalendarView';
import { ContactView } from './views/ContactView';
import { PrivacyPolicyView } from './views/PrivacyPolicyView';

export default function App() {
  const [currentView, setCurrentView] = useState<NavigationTarget>('home');
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [enquiryModalService, setEnquiryModalService] = useState<string | null>(null);

  // Sync hash routing so URLs are bookmarkable and direct links work
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as NavigationTarget;
      const validTargets: NavigationTarget[] = [
        'home',
        'about',
        'services',
        'service-gst',
        'service-incometax',
        'service-accounting',
        'service-tds',
        'service-compliance',
        'gst-calculator',
        'tax-estimator',
        'calendar',
        'contact',
        'privacy',
      ];
      if (validTargets.includes(hash)) {
        setCurrentView(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: NavigationTarget) => {
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnquiry = (serviceName?: string) => {
    setEnquiryModalService(serviceName || 'General Accounting & Bookkeeping');
  };

  const handleCloseEnquiry = () => {
    setEnquiryModalService(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6F8] text-[#384252]">
      {/* Header with Top Bar Contract & Mobile Drawer */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenEnquiry={handleOpenEnquiry}
        onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {currentView === 'home' && (
          <HomeView
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
            onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
            onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
          />
        )}

        {currentView === 'services' && (
          <ServicesOverviewView
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
            onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
          />
        )}

        {currentView === 'service-gst' && (
          <ServiceDetailView
            serviceId="gst"
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
            onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
          />
        )}

        {currentView === 'service-incometax' && (
          <ServiceDetailView
            serviceId="incometax"
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
            onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
          />
        )}

        {currentView === 'service-accounting' && (
          <ServiceDetailView
            serviceId="accounting"
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
            onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
          />
        )}

        {currentView === 'service-tds' && (
          <ServiceDetailView
            serviceId="tds"
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
            onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
          />
        )}

        {currentView === 'service-compliance' && (
          <ServiceDetailView
            serviceId="compliance"
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
            onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
          />
        )}

        {currentView === 'gst-calculator' && (
          <GstCalculatorView
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentView === 'tax-estimator' && (
          <IncomeTaxEstimatorView
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentView === 'calendar' && (
          <ComplianceCalendarView
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentView === 'contact' && <ContactView />}

        {currentView === 'privacy' && (
          <PrivacyPolicyView onNavigate={navigateTo} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
      />

      {/* Floating WhatsApp Quick Action */}
      <FloatingWhatsApp
        isOpen={isWhatsAppOpen}
        onToggle={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
        onClose={() => setIsWhatsAppOpen(false)}
      />

      {/* Global Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalService !== null}
        onClose={handleCloseEnquiry}
        initialService={enquiryModalService || undefined}
      />
    </div>
  );
}
