import React, { useState, useRef, useEffect } from 'react';
import { BUSINESS_INFO } from '../data/contactInfo';
import { MessageCircle, X, ExternalLink, User } from 'lucide-react';

interface FloatingWhatsAppProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  isOpen,
  onToggle,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Choice Popover */}
      {isOpen && (
        <div
          ref={modalRef}
          className="mb-3 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 transition-all animate-in fade-in slide-in-from-bottom-2 text-slate-800"
          role="dialog"
          aria-labelledby="whatsapp-dialog-title"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 id="whatsapp-dialog-title" className="text-sm font-bold text-[#142B46]">
                  Connect on WhatsApp
                </h3>
                <p className="text-[11px] text-slate-500">Select which contact person to chat with:</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              aria-label="Close WhatsApp options"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 flex flex-col gap-2.5">
            {/* Contact Person 1 */}
            <a
              href={BUSINESS_INFO.contactPerson1.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="group p-3 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-emerald-100 flex items-center justify-center text-slate-600 group-hover:text-emerald-700 transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#142B46]">
                    {BUSINESS_INFO.contactPerson1.label}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {BUSINESS_INFO.contactPerson1.displayPhone}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
            </a>

            {/* Contact Person 2 */}
            <a
              href={BUSINESS_INFO.contactPerson2.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="group p-3 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-emerald-100 flex items-center justify-center text-slate-600 group-hover:text-emerald-700 transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#142B46]">
                    {BUSINESS_INFO.contactPerson2.label}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {BUSINESS_INFO.contactPerson2.displayPhone}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
            </a>
          </div>

          <p className="mt-3 text-[10px] text-slate-400 text-center">
            Replies typically within business hours (IST)
          </p>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={onToggle}
        className="group relative flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 focus:outline-hidden focus:ring-4 focus:ring-emerald-300"
        aria-label="WhatsApp quick contact selector"
        title="Chat on WhatsApp with Haryani & Associates"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="sr-only">Open WhatsApp chat options</span>
      </button>
    </div>
  );
};
