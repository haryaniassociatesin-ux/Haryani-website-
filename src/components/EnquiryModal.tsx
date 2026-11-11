import React, { useEffect, useRef } from 'react';
import { EnquiryForm } from './EnquiryForm';
import { X } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div
        ref={modalRef}
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#142B46] text-white flex items-center justify-between border-b border-[#0F2035]">
          <div>
            <h2 id="enquiry-modal-title" className="text-base font-bold font-serif">
              Enquire with Haryani &amp; Associates
            </h2>
            <p className="text-xs text-[#D4B477]">
              Share your requirements and we will contact you directly.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white rounded-md hover:bg-white/10 transition-colors"
            aria-label="Close enquiry modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto">
          <EnquiryForm
            variant="modal"
            initialService={initialService}
            onSuccessClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};
