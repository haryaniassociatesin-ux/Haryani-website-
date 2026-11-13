import nodemailer from 'nodemailer';

function buildRecipientAddress(localParts: string[], domainParts: string[]): string {
  const atSign = String.fromCharCode(64);
  return [localParts.join('.'), domainParts.join('.')].join(atSign);
}

export const RECIPIENT_EMAILS = [
  buildRecipientAddress(['haryani', 'associates', 'in'], ['gmail', 'com']),
  buildRecipientAddress(['hasanharyani'], ['gmail', 'com']),
] as const;

export interface EnquiryPayload {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  serviceRequired?: string;
  message?: string;
  honeypot?: string;
  website_url?: string;
}

export interface SmtpSettings {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  configured: boolean;
}

export interface MailSendResult {
  accepted?: Array<string | { address?: string }>;
  rejected?: Array<string | { address?: string }>;
  messageId?: string;
}

export interface MailTransportLike {
  sendMail(mailOptions: {
    from: string;
    to: string;
    replyTo?: string;
    subject: string;
    text: string;
    html: string;
  }): Promise<MailSendResult>;
}

export interface EnquiryProcessResult {
  status: number;
  body: {
    success: boolean;
    configured?: boolean;
    deliveredToBoth?: boolean;
    recipientsCount?: number;
    error?: string;
    message?: string;
  };
}

export interface EnquiryHandlerDeps {
  env?: Record<string, string | undefined>;
  createTransporter?: (settings: SmtpSettings) => MailTransportLike;
  rateLimiter?: Map<string, number[]>;
  now?: () => number;
}

const MAX_BODY_BYTES = 16 * 1024; // 16 KB
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5;
const defaultRateLimiter = new Map<string, number[]>();

export function getSmtpSettings(
  env: Record<string, string | undefined> = process.env
): SmtpSettings {
  const host = (env.SMTP_HOST || '').trim() || 'smtp.gmail.com';
  const parsedPort = Number.parseInt((env.SMTP_PORT || '').trim(), 10);
  const port = Number.isFinite(parsedPort) && parsedPort > 0 ? parsedPort : 465;

  const secureRaw = (env.SMTP_SECURE || '').trim().toLowerCase();
  const secure =
    secureRaw === 'true' ? true : secureRaw === 'false' ? false : port === 465;

  const user = (env.SMTP_USER || '').trim();
  const pass = (env.SMTP_PASS || '').trim();
  const from =
    (env.SMTP_FROM || '').trim() ||
    (user ? `"Haryani & Associates" <${user}>` : '');

  return {
    host,
    port,
    secure,
    user,
    pass,
    from,
    configured: Boolean(host && port && user && pass && from),
  };
}

export function createSmtpTransporter(settings: SmtpSettings): MailTransportLike {
  return nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    auth: {
      user: settings.user,
      pass: settings.pass,
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 9000,
  });
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripHeaderInjection(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function normalizeRecipientAddress(entry: string | { address?: string }): string {
  if (typeof entry === 'string') {
    const match = entry.match(/<([^>]+)>/);
    return (match ? match[1] : entry).trim().toLowerCase();
  }
  return (entry?.address || '').trim().toLowerCase();
}

export function isAllowedOrigin(
  originHeader: string | null,
  hostHeader: string | null,
  env: Record<string, string | undefined> = process.env
): boolean {
  if (!originHeader) {
    return true;
  }

  let parsedOrigin: URL;
  try {
    parsedOrigin = new URL(originHeader);
  } catch {
    return false;
  }

  if (parsedOrigin.protocol !== 'https:' && parsedOrigin.protocol !== 'http:') {
    return false;
  }

  const originHost = parsedOrigin.host.toLowerCase();
  const originHostname = parsedOrigin.hostname.toLowerCase();

  if (originHostname === 'localhost' || originHostname === '127.0.0.1') {
    return true;
  }

  if (hostHeader && originHost === hostHeader.toLowerCase()) {
    return true;
  }

  const configuredUrls = [
    env.URL,
    env.DEPLOY_PRIME_URL,
    env.DEPLOY_URL,
    env.SITE_URL,
    env.APP_URL,
    ...(env.ALLOWED_ORIGINS ? env.ALLOWED_ORIGINS.split(',') : []),
  ]
    .map((v) => (v || '').trim())
    .filter(Boolean);

  for (const allowed of configuredUrls) {
    try {
      const allowedUrl = allowed.startsWith('http')
        ? new URL(allowed)
        : new URL(`https://${allowed}`);
      if (allowedUrl.host.toLowerCase() === originHost) {
        return true;
      }
    } catch {
      // Ignore malformed env origin strings
    }
  }

  if (
    originHostname.endsWith('.netlify.app') ||
    originHostname.endsWith('.run.app')
  ) {
    return true;
  }

  return false;
}

export function buildCorsHeaders(
  originHeader: string | null,
  allowed: boolean
): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };

  if (originHeader && allowed) {
    headers['Access-Control-Allow-Origin'] = originHeader;
  }

  return headers;
}

function checkRateLimit(
  clientIp: string,
  rateLimiter: Map<string, number[]>,
  nowMs: number
): boolean {
  const key = clientIp || 'unknown';
  const timestamps = rateLimiter.get(key) || [];
  const recent = timestamps.filter((ts) => nowMs - ts < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimiter.set(key, recent);
    return false;
  }

  recent.push(nowMs);
  rateLimiter.set(key, recent);
  return true;
}

export async function processEnquirySubmission(
  payload: EnquiryPayload,
  clientIp: string,
  deps: EnquiryHandlerDeps = {}
): Promise<EnquiryProcessResult> {
  const env = deps.env ?? process.env;
  const rateLimiter = deps.rateLimiter ?? defaultRateLimiter;
  const nowFn = deps.now ?? Date.now;
  const transportFactory = deps.createTransporter ?? createSmtpTransporter;

  // 1. Anti-spam honeypot check (must run before rate limiting or SMTP)
  const trapValue = (payload.honeypot || payload.website_url || '').trim();
  if (trapValue.length > 0) {
    return {
      status: 200,
      body: {
        success: true,
        deliveredToBoth: true,
        message: 'Enquiry received.',
      },
    };
  }

  // 2. Rate limiting per IP
  if (!checkRateLimit(clientIp, rateLimiter, nowFn())) {
    return {
      status: 429,
      body: {
        success: false,
        error:
          'Too many enquiry attempts. Please wait a minute before trying again, or reach out via WhatsApp/Phone.',
      },
    };
  }

  // 3. Input validation & sanitization
  const rawName = typeof payload.fullName === 'string' ? payload.fullName : '';
  const rawPhone =
    typeof payload.phoneNumber === 'string' ? payload.phoneNumber : '';
  const rawEmail = typeof payload.email === 'string' ? payload.email : '';
  const rawService =
    typeof payload.serviceRequired === 'string' ? payload.serviceRequired : '';
  const rawMessage = typeof payload.message === 'string' ? payload.message : '';

  if (/[\r\n]/.test(rawName) || /[\r\n]/.test(rawEmail) || /[\r\n]/.test(rawService)) {
    return {
      status: 400,
      body: {
        success: false,
        error: 'Validation failed: Invalid characters in input fields.',
      },
    };
  }

  const trimmedName = stripHeaderInjection(rawName);
  const cleanPhone = rawPhone.replace(/[\s\-+]/g, '');
  const trimmedEmail = stripHeaderInjection(rawEmail);
  const selectedService =
    stripHeaderInjection(rawService) || 'General Accounting & Bookkeeping';
  const trimmedMessage = rawMessage.trim();

  if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
    return {
      status: 400,
      body: {
        success: false,
        error:
          'Validation failed: Full Name is required (between 2 and 100 characters).',
      },
    };
  }

  if (!cleanPhone || !/^[0-9]{10,12}$/.test(cleanPhone)) {
    return {
      status: 400,
      body: {
        success: false,
        error: 'Validation failed: A valid 10-digit mobile number is required.',
      },
    };
  }

  if (
    trimmedEmail &&
    (trimmedEmail.length > 150 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail))
  ) {
    return {
      status: 400,
      body: {
        success: false,
        error: 'Validation failed: Invalid email address format.',
      },
    };
  }

  if (!trimmedMessage || trimmedMessage.length < 10 || trimmedMessage.length > 3000) {
    return {
      status: 400,
      body: {
        success: false,
        error:
          'Validation failed: Please enter a message between 10 and 3,000 characters.',
      },
    };
  }

  // Spam link filter (block obvious link-stuffing spam)
  const urlMatches = trimmedMessage.match(/https?:\/\/|www\./gi);
  if (urlMatches && urlMatches.length > 2) {
    return {
      status: 400,
      body: {
        success: false,
        error:
          'Validation failed: Please avoid including multiple external links in your enquiry message.',
      },
    };
  }

  // Prohibit sensitive tax/identity numbers in public enquiry body
  const aadhaarPattern = /\b\d{4}\s?\d{4}\s?\d{4}\b/;
  const panPattern = /\b[A-Z]{5}[0-9]{4}[A-Z]\b/i;
  if (aadhaarPattern.test(trimmedMessage) || panPattern.test(trimmedMessage)) {
    return {
      status: 400,
      body: {
        success: false,
        error:
          'Security Policy: For your privacy, please do not include PAN or Aadhaar numbers in this public form. You may share those directly during consultation.',
      },
    };
  }

  // 4. Verify server-side SMTP configuration
  const smtpSettings = getSmtpSettings(env);
  if (!smtpSettings.configured) {
    return {
      status: 503,
      body: {
        success: false,
        configured: false,
        deliveredToBoth: false,
        error: 'Email delivery service is not configured on the server.',
        message:
          'Unable to send enquiry via email right now. Please contact us directly using WhatsApp or the Email options below.',
      },
    };
  }

  // 5. Build plain-text and sanitized HTML email payload
  const submittedAtIst = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
  });
  const emailSubject = `[New Enquiry] ${selectedService} - ${trimmedName}`;

  const plainTextBody = `
New Business Enquiry for Haryani & Associates:
----------------------------------------------
Full Name: ${trimmedName}
Phone Number: ${cleanPhone}
Email: ${trimmedEmail || 'Not provided'}
Service Required: ${selectedService}
Submitted At: ${submittedAtIst} IST

Enquiry Message:
${trimmedMessage}
----------------------------------------------
Office Location: Mira Road, Maharashtra, India
`.trim();

  const safeName = escapeHtml(trimmedName);
  const safePhone = escapeHtml(cleanPhone);
  const safeEmail = trimmedEmail ? escapeHtml(trimmedEmail) : '';
  const safeService = escapeHtml(selectedService);
  const safeMessage = escapeHtml(trimmedMessage);
  const safeTimestamp = escapeHtml(submittedAtIst);

  const htmlBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
  <div style="background-color: #142B46; padding: 20px; color: #ffffff;">
    <h2 style="margin: 0; font-size: 20px; color: #D4B477;">Haryani &amp; Associates</h2>
    <p style="margin: 5px 0 0; font-size: 13px; color: #e2e8f0;">New Client Consultation Enquiry</p>
  </div>
  <div style="padding: 24px; background-color: #ffffff; color: #334155; font-size: 14px; line-height: 1.6;">
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr>
        <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #142B46;">Full Name:</td>
        <td style="padding: 8px 0;">${safeName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #142B46;">Phone Number:</td>
        <td style="padding: 8px 0;"><a href="tel:+91${safePhone}" style="color: #142B46; font-weight: bold;">+91 ${safePhone}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #142B46;">Email Address:</td>
        <td style="padding: 8px 0;">${safeEmail ? `<a href="mailto:${safeEmail}">${safeEmail}</a>` : 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #142B46;">Service Required:</td>
        <td style="padding: 8px 0; font-weight: bold; color: #142B46;">${safeService}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #142B46;">Received At:</td>
        <td style="padding: 8px 0; font-size: 12px; color: #64748b;">${safeTimestamp} IST</td>
      </tr>
    </table>
    <div style="background-color: #f8fafc; border-left: 4px solid #D4B477; padding: 14px; margin-top: 10px; border-radius: 4px;">
      <strong style="color: #142B46; display: block; margin-bottom: 6px;">Client Message:</strong>
      <p style="margin: 0; white-space: pre-wrap; color: #1e293b;">${safeMessage}</p>
    </div>
  </div>
  <div style="background-color: #f1f5f9; padding: 12px 20px; font-size: 11px; color: #64748b; text-align: center;">
    Delivered directly from Haryani &amp; Associates Public Website (Mira Road, Maharashtra, India)
  </div>
</div>
`.trim();

  // 6. Send via Nodemailer SMTP and confirm BOTH recipients accepted
  try {
    const transporter = transportFactory(smtpSettings);
    const info = await transporter.sendMail({
      from: smtpSettings.from,
      to: RECIPIENT_EMAILS.join(', '),
      replyTo: trimmedEmail || undefined,
      subject: emailSubject,
      text: plainTextBody,
      html: htmlBody,
    });

    const acceptedSet = new Set(
      (info?.accepted || []).map(normalizeRecipientAddress).filter(Boolean)
    );
    const rejectedList = (info?.rejected || [])
      .map(normalizeRecipientAddress)
      .filter(Boolean);

    const allDelivered =
      rejectedList.length === 0 &&
      RECIPIENT_EMAILS.every((recipient) =>
        acceptedSet.has(recipient.toLowerCase())
      );

    if (!allDelivered) {
      console.error('Incomplete recipient confirmation from SMTP server:', {
        acceptedCount: acceptedSet.size,
        rejectedCount: rejectedList.length,
      });
      return {
        status: 502,
        body: {
          success: false,
          configured: true,
          deliveredToBoth: false,
          error:
            'Email delivery could not be confirmed for all firm recipients. Please try again or contact us via WhatsApp.',
        },
      };
    }

    return {
      status: 200,
      body: {
        success: true,
        configured: true,
        deliveredToBoth: true,
        recipientsCount: RECIPIENT_EMAILS.length,
        message:
          'Your enquiry has been delivered successfully to Haryani & Associates.',
      },
    };
  } catch (err: any) {
    console.error('Enquiry SMTP delivery error:', err?.message || 'Unknown error');
    return {
      status: 502,
      body: {
        success: false,
        configured: true,
        deliveredToBoth: false,
        error:
          'Failed to send enquiry email via the mail server. Please try again or reach out via WhatsApp or Phone.',
      },
    };
  }
}

export async function handleNetlifyEnquiryRequest(
  req: Request,
  deps: EnquiryHandlerDeps = {}
): Promise<Response> {
  const env = deps.env ?? process.env;
  const originHeader = req.headers.get('origin');
  const hostHeader =
    req.headers.get('x-forwarded-host') || req.headers.get('host');
  const originAllowed = isAllowedOrigin(originHeader, hostHeader, env);
  const headers = buildCorsHeaders(originHeader, originAllowed);

  if (!originAllowed) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Origin not allowed.',
      }),
      { status: 403, headers }
    );
  }

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Method not allowed. Use POST.',
      }),
      {
        status: 405,
        headers: {
          ...headers,
          Allow: 'POST, OPTIONS',
        },
      }
    );
  }

  const contentType = (req.headers.get('content-type') || '').toLowerCase();
  if (contentType && !contentType.includes('application/json')) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Unsupported Media Type. Expected application/json.',
      }),
      { status: 415, headers }
    );
  }

  let rawText = '';
  try {
    rawText = await req.text();
  } catch {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to read request body.',
      }),
      { status: 400, headers }
    );
  }

  if (Buffer.byteLength(rawText, 'utf8') > MAX_BODY_BYTES) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Request payload too large.',
      }),
      { status: 413, headers }
    );
  }

  let payload: EnquiryPayload;
  try {
    const parsed = JSON.parse(rawText);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('Invalid JSON object');
    }
    payload = parsed as EnquiryPayload;
  } catch {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Invalid JSON request payload.',
      }),
      { status: 400, headers }
    );
  }

  const clientIp =
    req.headers.get('x-nf-client-connection-ip') ||
    (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
    'unknown';

  const result = await processEnquirySubmission(payload, clientIp, deps);

  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers,
  });
}

export default async function handler(req: Request): Promise<Response> {
  return handleNetlifyEnquiryRequest(req);
}
