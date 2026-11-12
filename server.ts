import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Parse port and host from environment variables or command-line arguments (--port 3000 --host 0.0.0.0)
const portArgIndex = process.argv.indexOf('--port');
const portFromArg = portArgIndex !== -1 && process.argv[portArgIndex + 1] ? process.argv[portArgIndex + 1] : undefined;
const PORT = parseInt(process.env.PORT || portFromArg || '3000', 10);

const hostArgIndex = process.argv.indexOf('--host');
const hostFromArg = hostArgIndex !== -1 && process.argv[hostArgIndex + 1] ? process.argv[hostArgIndex + 1] : undefined;
const HOST = process.env.HOST || hostFromArg || '0.0.0.0';

app.use(express.json());

// Readiness and health check probe endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

const RECIPIENT_EMAILS = [
  'haryani.associates.in@gmail.com',
  'hasanharyani@gmail.com',
];

interface EnquiryRequestBody {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  serviceRequired?: string;
  message?: string;
  honeypot?: string;
}

// Check whether email delivery service is configured
function getEmailProviderConfig() {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return { provider: 'smtp', configured: true };
  }
  if (process.env.RESEND_API_KEY) {
    return { provider: 'resend', configured: true };
  }
  return { provider: 'none', configured: false };
}

// Reusable SMTP transporter creation with verified environment variable mappings
function createSmtpTransporter() {
  const portNum = parseInt(process.env.SMTP_PORT || '465', 10);
  const isSecure = process.env.SMTP_SECURE !== undefined
    ? process.env.SMTP_SECURE === 'true'
    : portNum === 465;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: portNum,
    secure: isSecure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

// GET /api/enquiry/status - check server-side configuration status and test SMTP connection safely
app.get('/api/enquiry/status', async (_req: Request, res: Response) => {
  const status = getEmailProviderConfig();

  let smtpVerificationResult: {
    tested: boolean;
    success: boolean;
    message: string;
  } | null = null;

  if (status.provider === 'smtp') {
    try {
      const transporter = createSmtpTransporter();
      await transporter.verify();
      smtpVerificationResult = {
        tested: true,
        success: true,
        message: 'SMTP handshake and credentials verified successfully with mail server.',
      };
    } catch (verifyErr: any) {
      smtpVerificationResult = {
        tested: true,
        success: false,
        message: `SMTP connection verification failed: ${verifyErr?.message || 'Handshake error'}`,
      };
    }
  }

  const portNum = parseInt(process.env.SMTP_PORT || '465', 10);
  const isSecure = process.env.SMTP_SECURE !== undefined
    ? process.env.SMTP_SECURE === 'true'
    : portNum === 465;

  res.json({
    status: 'ok',
    emailConfigured: status.configured,
    provider: status.provider,
    recipients: RECIPIENT_EMAILS,
    smtpConfigSummary: {
      SMTP_HOST: process.env.SMTP_HOST || (process.env.SMTP_USER ? 'smtp.gmail.com (default)' : '[NOT CONFIGURED]'),
      SMTP_PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : (process.env.SMTP_USER ? 465 : '[NOT CONFIGURED]'),
      SMTP_SECURE: process.env.SMTP_SECURE !== undefined ? (process.env.SMTP_SECURE === 'true') : (portNum === 465),
      SMTP_USER: process.env.SMTP_USER ? `[CONFIGURED: ${process.env.SMTP_USER}]` : '[NOT CONFIGURED]',
      SMTP_PASS: process.env.SMTP_PASS ? '[CONFIGURED - secret hidden]' : '[NOT CONFIGURED]',
      SMTP_FROM: process.env.SMTP_FROM || (process.env.SMTP_USER ? `"Haryani & Associates" <${process.env.SMTP_USER}>` : '[NOT CONFIGURED]'),
    },
    smtpConnectionTest: smtpVerificationResult || {
      tested: false,
      success: false,
      message: 'SMTP credentials (SMTP_USER and SMTP_PASS) are not set in environment variables. Connection test cannot be performed.',
    },
    actionRequired: status.configured
      ? null
      : 'To activate live email delivery, configure SMTP_USER, SMTP_PASS, and optionally SMTP_HOST, SMTP_PORT, SMTP_SECURE, and SMTP_FROM in the environment variables (or .env). Website visitors will continue to be provided pre-filled WhatsApp and direct mailto links so no enquiry is lost.',
  });
});

// POST /api/enquiry - server-side enquiry delivery
app.post('/api/enquiry', async (req: Request<{}, {}, EnquiryRequestBody>, res: Response): Promise<void> => {
  try {
    const { fullName, phoneNumber, email, serviceRequired, message, honeypot } = req.body;

    // 1. Anti-spam trap: silently discard bot submissions
    if (honeypot && honeypot.trim().length > 0) {
      res.status(200).json({
        success: true,
        message: 'Enquiry received successfully.',
      });
      return;
    }

    // 2. Server-side validation
    const trimmedName = (fullName || '').trim();
    const cleanPhone = (phoneNumber || '').replace(/[\s\-\+]/g, '');
    const trimmedEmail = (email || '').trim();
    const selectedService = (serviceRequired || '').trim();
    const trimmedMessage = (message || '').trim();

    if (!trimmedName || trimmedName.length < 2) {
      res.status(400).json({
        success: false,
        error: 'Validation failed: Full Name is required (minimum 2 characters).',
      });
      return;
    }

    if (!cleanPhone || !/^[0-9]{10,12}$/.test(cleanPhone)) {
      res.status(400).json({
        success: false,
        error: 'Validation failed: A valid 10-digit mobile number is required.',
      });
      return;
    }

    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      res.status(400).json({
        success: false,
        error: 'Validation failed: Invalid email address format.',
      });
      return;
    }

    if (!trimmedMessage || trimmedMessage.length < 10) {
      res.status(400).json({
        success: false,
        error: 'Validation failed: Please enter a message with at least 10 characters.',
      });
      return;
    }

    // 3. Prohibit sensitive documents / PAN / Aadhaar numbers in message text
    const aadhaarPattern = /\b\d{4}\s?\d{4}\s?\d{4}\b/;
    const panPattern = /\b[A-Z]{5}[0-9]{4}[A-Z]\b/i;
    if (aadhaarPattern.test(trimmedMessage) || panPattern.test(trimmedMessage)) {
      res.status(400).json({
        success: false,
        error:
          'Security Policy: For your privacy, please do not include PAN or Aadhaar card numbers in this public form. Please discuss these details directly during consultation.',
      });
      return;
    }

    const emailConfig = getEmailProviderConfig();

    // 4. Delivery via configured service
    if (!emailConfig.configured) {
      // Strictly follow instructions: Do not pretend email delivery is working if credentials are not configured!
      res.status(503).json({
        success: false,
        configured: false,
        error: 'Email delivery credentials not configured on server.',
        message:
          'The server email integration has not been configured with SMTP or Resend credentials in environment variables yet. Your enquiry could not be delivered via server-side email.',
        enquiry: {
          fullName: trimmedName,
          phoneNumber: cleanPhone,
          email: trimmedEmail || 'Not provided',
          serviceRequired: selectedService || 'General Accounting & Bookkeeping',
          message: trimmedMessage,
        },
      });
      return;
    }

    // Prepare email content
    const emailSubject = `[New Enquiry] ${selectedService || 'General'} - ${trimmedName}`;
    const plainTextBody = `
New Business Enquiry for Haryani & Associates:
----------------------------------------------
Full Name: ${trimmedName}
Phone Number: ${cleanPhone}
Email: ${trimmedEmail || 'Not provided'}
Service Required: ${selectedService || 'General Accounting & Bookkeeping'}
Submitted At: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST

Enquiry Message:
${trimmedMessage}
----------------------------------------------
Office Location: Mira Road, Maharashtra, India
`;

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
        <td style="padding: 8px 0;">${trimmedName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #142B46;">Phone Number:</td>
        <td style="padding: 8px 0;"><a href="tel:+91${cleanPhone}" style="color: #142B46; font-weight: bold;">+91 ${cleanPhone}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #142B46;">Email Address:</td>
        <td style="padding: 8px 0;">${trimmedEmail ? `<a href="mailto:${trimmedEmail}">${trimmedEmail}</a>` : 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #142B46;">Service Required:</td>
        <td style="padding: 8px 0; font-weight: bold; color: #142B46;">${selectedService || 'General Accounting & Bookkeeping'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #142B46;">Received At:</td>
        <td style="padding: 8px 0; font-size: 12px; color: #64748b;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td>
      </tr>
    </table>
    <div style="background-color: #f8fafc; border-left: 4px solid #D4B477; padding: 14px; margin-top: 10px; border-radius: 4px;">
      <strong style="color: #142B46; display: block; margin-bottom: 6px;">Client Message:</strong>
      <p style="margin: 0; white-space: pre-wrap; color: #1e293b;">${trimmedMessage}</p>
    </div>
  </div>
  <div style="background-color: #f1f5f9; padding: 12px 20px; font-size: 11px; color: #64748b; text-align: center;">
    Delivered directly from Haryani &amp; Associates Public Website (Mira Road, Maharashtra, India)
  </div>
</div>
`;

    if (emailConfig.provider === 'smtp') {
      const transporter = createSmtpTransporter();

      const fromAddress = process.env.SMTP_FROM || `"Haryani & Associates" <${process.env.SMTP_USER}>`;

      await transporter.sendMail({
        from: fromAddress,
        to: RECIPIENT_EMAILS.join(', '),
        replyTo: trimmedEmail || undefined,
        subject: emailSubject,
        text: plainTextBody,
        html: htmlBody,
      });

      res.status(200).json({
        success: true,
        configured: true,
        message: 'Your enquiry has been delivered successfully to Haryani & Associates.',
      });
      return;
    }

    if (emailConfig.provider === 'resend') {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'onboarding@resend.dev',
          to: RECIPIENT_EMAILS,
          reply_to: trimmedEmail || undefined,
          subject: emailSubject,
          text: plainTextBody,
          html: htmlBody,
        }),
      });

      if (!resendRes.ok) {
        const errorText = await resendRes.text();
        throw new Error(`Resend API Error: ${errorText}`);
      }

      res.status(200).json({
        success: true,
        configured: true,
        message: 'Your enquiry has been delivered successfully to Haryani & Associates.',
      });
      return;
    }
  } catch (err: any) {
    console.error('Enquiry delivery failure:', err);
    res.status(500).json({
      success: false,
      error: 'Delivery Error: Failed to transmit enquiry via email server.',
      message: err?.message || 'Internal transmission error. Please reach out via phone or WhatsApp.',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, HOST, () => {
    console.log(`Haryani & Associates server running on http://${HOST}:${PORT}`);
  });
}

process.on('uncaughtException', (err) => {
  console.error('Uncaught server exception:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled server rejection:', reason);
});

startServer();
