import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/contactInfo';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Mail,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface EnquiryFormProps {
  initialService?: string;
  onSuccessClose?: () => void;
  variant?: 'inline' | 'modal';
}

const SERVICE_OPTIONS = [
  'General Accounting & Bookkeeping',
  'GST Registration & Compliance',
  'GST Return Filing (GSTR-1 / 3B / 9)',
  'Income Tax Return (ITR) Preparation & Filing',
  'TDS Calculation & Quarterly Returns',
  'Payroll Processing & Pay Slips',
  'Business Registration Assistance (Proprietorship / Partnership / MSME)',
  'Financial Statements & Balance Sheet Preparation',
  'Business & Financial Consultancy',
  'Other Business Compliance Enquiry'
];

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialService = 'General Accounting & Bookkeeping',
  onSuccessClose,
  variant = 'inline',
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState(initialService);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam trap

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) {
      errs.fullName = 'Please enter your full name';
    } else if (fullName.trim().length < 2) {
      errs.fullName = 'Name should be at least 2 characters';
    }

    const cleanPhone = phoneNumber.replace(/[\s\-\+]/g, '');
    if (!phoneNumber.trim()) {
      errs.phoneNumber = 'Please enter your phone number';
    } else if (!/^[0-9]{10,12}$/.test(cleanPhone)) {
      errs.phoneNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!message.trim()) {
      errs.message = 'Please provide a brief description of your enquiry';
    } else if (message.trim().length < 10) {
      errs.message = 'Please enter at least 10 characters so we can understand your requirements';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Spam honeypot triggered by bots
    if (honeypot) {
      setIsSubmitting(false);
      setSubmitted(true);
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    const cleanPhone = phoneNumber.replace(/[\s\-\+]/g, '');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phoneNumber: cleanPhone,
          email: email.trim() || undefined,
          serviceRequired: selectedService,
          message: message.trim(),
          honeypot: honeypot.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
      } else if (!data.configured) {
        // Server credentials unconfigured
        setSubmitError(
          data.message ||
            'Notice: Server email service credentials (SMTP/Resend) are not configured in .env yet. Please use the direct WhatsApp or Email buttons below to contact us immediately.'
        );
      } else {
        setSubmitError(data.error || data.message || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err: any) {
      setSubmitError(
        'Network error: Could not reach the enquiry server. Please contact our consultants directly via phone or WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setPhoneNumber('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
    setSubmitError(null);
    setErrors({});
  };

  // WhatsApp quick transmission links
  const formattedEnquiryText = encodeURIComponent(
    `Hello Haryani & Associates,\n\nI would like to enquire about: *${selectedService}*.\n\n*Name:* ${fullName || '[Name]'}\n*Phone:* ${phoneNumber || '[Phone]'}${email ? `\n*Email:* ${email}` : ''}\n\n*Details:* ${message || 'Please contact me regarding your services.'}`
  );

  const whatsappLink1 = `${BUSINESS_INFO.contactPerson1.whatsappLink}?text=${formattedEnquiryText}`;
  const whatsappLink2 = `${BUSINESS_INFO.contactPerson2.whatsappLink}?text=${formattedEnquiryText}`;

  // Email mailto fallback
  const mailtoBody = encodeURIComponent(
    `Name: ${fullName}\nPhone: ${phoneNumber}\nEmail: ${email}\nService: ${selectedService}\n\nMessage:\n${message}`
  );
  const dualMailtoLink = `mailto:${BUSINESS_INFO.contactPerson1.email}?cc=${BUSINESS_INFO.contactPerson2.email}&subject=${encodeURIComponent(`Enquiry: ${selectedService} - ${fullName}`)}&body=${mailtoBody}`;

  if (submitted) {
    return (
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-6 text-center animate-in fade-in">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-[#142B46] mb-2 font-serif">
          Enquiry Received Successfully!
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto mb-4">
          Thank you, <strong className="text-slate-800">{fullName}</strong>. Your enquiry regarding{' '}
          <span className="text-[#142B46] font-medium">{selectedService}</span> has been recorded.
          Our team will review your requirements and reach out to you at{' '}
          <strong className="text-slate-800">{phoneNumber}</strong> shortly.
        </p>

        {/* Immediate Direct Options */}
        <div className="p-4 bg-white rounded-lg border border-emerald-100 max-w-md mx-auto mb-6 text-left">
          <p className="text-xs font-semibold text-slate-700 mb-2">
            Need an urgent response? Send this enquiry directly via WhatsApp:
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href={whatsappLink1}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200/80 rounded-md transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Contact Person 1</span>
            </a>
            <a
              href={whatsappLink2}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200/80 rounded-md transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Contact Person 2</span>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#142B46] font-medium py-1.5 px-3 border border-slate-300 rounded-md"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Submit Another Enquiry</span>
          </button>
          {onSuccessClose && (
            <button
              onClick={onSuccessClose}
              className="text-xs font-medium bg-[#142B46] text-white py-1.5 px-4 rounded-md hover:bg-[#0F2035]"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Honeypot anti-spam trap (invisible to real users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_url">Do not fill this</label>
        <input
          id="website_url"
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {submitError && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 space-y-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed font-medium">{submitError}</div>
          </div>
          <div className="pt-2 border-t border-amber-200/80">
            <span className="font-semibold block text-[11px] mb-2 text-slate-800">
              Immediate Direct Transmission (No message lost):
            </span>
            <div className="flex flex-wrap gap-2">
              <a
                href={whatsappLink1}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[11px] font-semibold"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp Contact 1</span>
              </a>
              <a
                href={whatsappLink2}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[11px] font-semibold"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp Contact 2</span>
              </a>
              <a
                href={dualMailtoLink}
                className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-md text-[11px] font-semibold"
              >
                <Mail className="w-3 h-3 text-slate-500" />
                <span>Open in Email App</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            if (errors.fullName) setErrors({ ...errors, fullName: '' });
          }}
          placeholder="e.g. Ramesh Sharma"
          className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#D4B477] focus:border-[#D4B477] transition-all ${
            errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
          }`}
        />
        {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
      </div>

      {/* Grid: Phone & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phoneNumber" className="block text-xs font-semibold text-slate-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: '' });
            }}
            placeholder="e.g. 9820012345"
            className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#D4B477] focus:border-[#D4B477] transition-all ${
              errors.phoneNumber ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
            }`}
          />
          {errors.phoneNumber && (
            <p className="text-xs text-red-600 mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            placeholder="e.g. ramesh@example.com"
            className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#D4B477] focus:border-[#D4B477] transition-all ${
              errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
            }`}
          />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Service Required */}
      <div>
        <label htmlFor="serviceRequired" className="block text-xs font-semibold text-slate-700 mb-1">
          Service Required <span className="text-red-500">*</span>
        </label>
        <select
          id="serviceRequired"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#D4B477] focus:border-[#D4B477] transition-all"
        >
          {SERVICE_OPTIONS.map((srv) => (
            <option key={srv} value={srv}>
              {srv}
            </option>
          ))}
        </select>
      </div>

      {/* General Enquiry Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1">
          General Enquiry Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={variant === 'modal' ? 3 : 4}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors({ ...errors, message: '' });
          }}
          placeholder="Briefly describe your requirements (e.g., GST registration for a new retail shop, or pending ITR filing)..."
          className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#D4B477] focus:border-[#D4B477] transition-all ${
            errors.message ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
          }`}
        />
        {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
      </div>

      {/* Compliance Notice: Strictly no sensitive info */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-[11px] text-slate-500 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-[#D4B477] shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-700">Privacy Notice:</strong> Please do not submit PAN, Aadhaar, bank details, or confidential account passwords in this public enquiry form. We only collect basic contact info to schedule your initial consultation.
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#142B46] hover:bg-[#0F2035] rounded-lg shadow-xs hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-[#142B46]"
        >
          {isSubmitting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Transmitting Enquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-[#D4B477]" />
              <span>Submit Business Enquiry</span>
            </>
          )}
        </button>

        {/* Direct Email fallback */}
        <a
          href={dualMailtoLink}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
          title="Open in your default email application"
        >
          <Mail className="w-3.5 h-3.5 text-slate-500" />
          <span>Open in Email</span>
        </a>
      </div>
    </form>
  );
};
