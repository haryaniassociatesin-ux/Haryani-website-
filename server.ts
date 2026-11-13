import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import {
  RECIPIENT_EMAILS,
  getSmtpSettings,
  processEnquirySubmission,
  isAllowedOrigin,
  buildCorsHeaders,
} from './netlify/functions/enquiry.ts';

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

app.use(express.json({ limit: '32kb' }));

// Readiness and health check probe endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

interface EnquiryRequestBody {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  serviceRequired?: string;
  message?: string;
  honeypot?: string;
  website_url?: string;
}

// Reusable SMTP transporter creation with verified environment variable mappings
function createSmtpTransporter() {
  const settings = getSmtpSettings(process.env);
  return nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    auth: {
      user: settings.user,
      pass: settings.pass,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

// GET /api/enquiry/status - check server-side configuration status and test SMTP connection safely
app.get('/api/enquiry/status', async (_req: Request, res: Response) => {
  const settings = getSmtpSettings(process.env);

  let smtpVerificationResult: {
    tested: boolean;
    success: boolean;
    message: string;
  } | null = null;

  if (settings.configured) {
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

  res.json({
    status: 'ok',
    emailConfigured: settings.configured,
    provider: settings.configured ? 'smtp' : 'none',
    recipients: RECIPIENT_EMAILS,
    smtpConfigSummary: {
      SMTP_HOST: process.env.SMTP_HOST || (settings.configured ? settings.host : '[NOT CONFIGURED]'),
      SMTP_PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : (settings.configured ? settings.port : '[NOT CONFIGURED]'),
      SMTP_SECURE: process.env.SMTP_SECURE !== undefined ? (process.env.SMTP_SECURE === 'true') : settings.secure,
      SMTP_USER: process.env.SMTP_USER ? `[CONFIGURED: ${process.env.SMTP_USER}]` : '[NOT CONFIGURED]',
      SMTP_PASS: process.env.SMTP_PASS ? '[CONFIGURED - secret hidden]' : '[NOT CONFIGURED]',
      SMTP_FROM: process.env.SMTP_FROM || (settings.configured ? settings.from : '[NOT CONFIGURED]'),
    },
    smtpConnectionTest: smtpVerificationResult || {
      tested: false,
      success: false,
      message: 'SMTP credentials (SMTP_USER and SMTP_PASS) are not set in environment variables. Connection test cannot be performed.',
    },
    actionRequired: settings.configured
      ? null
      : 'To activate live email delivery, configure SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, and SMTP_FROM in the environment variables.',
  });
});

async function handleExpressEnquiry(req: Request<{}, {}, EnquiryRequestBody>, res: Response): Promise<void> {
  const originHeader = req.get('origin') || null;
  const hostHeader = req.get('x-forwarded-host') || req.get('host') || null;
  const originAllowed = isAllowedOrigin(originHeader, hostHeader, process.env);
  const corsHeaders = buildCorsHeaders(originHeader, originAllowed);

  for (const [k, v] of Object.entries(corsHeaders)) {
    res.setHeader(k, v);
  }

  if (!originAllowed) {
    res.status(403).json({ success: false, error: 'Origin not allowed.' });
    return;
  }

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const clientIp =
    req.get('x-nf-client-connection-ip') ||
    (req.get('x-forwarded-for') || '').split(',')[0].trim() ||
    req.ip ||
    'unknown';

  const result = await processEnquirySubmission(req.body || {}, clientIp);
  res.status(result.status).json(result.body);
}

app.options('/.netlify/functions/enquiry', handleExpressEnquiry);
app.post('/.netlify/functions/enquiry', handleExpressEnquiry);
app.options('/api/enquiry', handleExpressEnquiry);
app.post('/api/enquiry', handleExpressEnquiry);

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
