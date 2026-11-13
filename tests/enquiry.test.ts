import test from 'node:test';
import assert from 'node:assert/strict';
import {
  handleNetlifyEnquiryRequest,
  processEnquirySubmission,
  RECIPIENT_EMAILS,
  getSmtpSettings,
  type SmtpSettings,
  type MailTransportLike,
} from '../netlify/functions/enquiry.ts';
import { BUSINESS_INFO } from '../src/data/contactInfo.ts';

const VALID_ENV: Record<string, string> = {
  SMTP_HOST: 'smtp.gmail.com',
  SMTP_PORT: '465',
  SMTP_SECURE: 'true',
  SMTP_USER: 'sender@gmail.com',
  SMTP_PASS: 'app-password-secret-value',
  SMTP_FROM: '"Haryani & Associates" <sender@gmail.com>',
};

function makeRequest(
  body: unknown,
  options: {
    method?: string;
    origin?: string;
    host?: string;
    contentType?: string;
    ip?: string;
  } = {}
): Request {
  const headers = new Headers();
  if (options.contentType !== undefined) {
    if (options.contentType) {
      headers.set('content-type', options.contentType);
    }
  } else {
    headers.set('content-type', 'application/json');
  }
  if (options.origin) {
    headers.set('origin', options.origin);
  }
  if (options.host) {
    headers.set('host', options.host);
  }
  if (options.ip) {
    headers.set('x-nf-client-connection-ip', options.ip);
  }

  const method = options.method || 'POST';
  return new Request('https://haryani-associates.netlify.app/.netlify/functions/enquiry', {
    method,
    headers,
    body:
      method === 'GET' || method === 'OPTIONS'
        ? undefined
        : typeof body === 'string'
        ? body
        : JSON.stringify(body),
  });
}

test('getSmtpSettings reads all six required SMTP environment variables cleanly', () => {
  const settings = getSmtpSettings({
    SMTP_HOST: 'smtp.gmail.com',
    SMTP_PORT: '587',
    SMTP_SECURE: 'false',
    SMTP_USER: 'firm@gmail.com',
    SMTP_PASS: 'secret1234',
    SMTP_FROM: '"Haryani & Associates" <firm@gmail.com>',
  });

  assert.equal(settings.host, 'smtp.gmail.com');
  assert.equal(settings.port, 587);
  assert.equal(settings.secure, false);
  assert.equal(settings.user, 'firm@gmail.com');
  assert.equal(settings.pass, 'secret1234');
  assert.equal(settings.from, '"Haryani & Associates" <firm@gmail.com>');
  assert.equal(settings.configured, true);
});

test('Public contact emails and Netlify recipient emails resolve identically to both firm addresses', () => {
  const expected1 = ['haryani.associates.in', 'gmail.com'].join(String.fromCharCode(64));
  const expected2 = ['hasanharyani', 'gmail.com'].join(String.fromCharCode(64));

  assert.equal(BUSINESS_INFO.contactPerson1.email, expected1);
  assert.equal(BUSINESS_INFO.contactPerson1.mailtoLink, `mailto:${expected1}`);
  assert.equal(BUSINESS_INFO.contactPerson2.email, expected2);
  assert.equal(BUSINESS_INFO.contactPerson2.mailtoLink, `mailto:${expected2}`);
  assert.deepEqual([...RECIPIENT_EMAILS], [expected1, expected2]);
});

test('Successful enquiry delivery sends to both firm email addresses with sanitized HTML and confirms deliveredToBoth', async () => {
  const captured: {
    settings: SmtpSettings | null;
    mail: Parameters<MailTransportLike['sendMail']>[0] | null;
  } = {
    settings: null,
    mail: null,
  };

  const req = makeRequest(
    {
      fullName: 'Ramesh <script>alert(1)</script> Sharma',
      phoneNumber: '+91 98200 12345',
      email: 'ramesh@example.com',
      serviceRequired: 'GST Registration & Compliance',
      message: 'Need assistance with monthly GST filings & <b>audit</b> review.',
    },
    {
      origin: 'https://haryani-associates.netlify.app',
      host: 'haryani-associates.netlify.app',
      ip: '203.0.113.10',
    }
  );

  const res = await handleNetlifyEnquiryRequest(req, {
    env: VALID_ENV,
    rateLimiter: new Map(),
    createTransporter: (settings) => {
      captured.settings = settings;
      return {
        async sendMail(mailOptions) {
          captured.mail = mailOptions;
          return {
            accepted: [...RECIPIENT_EMAILS],
            rejected: [],
            messageId: '<msg-123@gmail.com>',
          };
        },
      };
    },
  });

  assert.equal(res.status, 200);
  const data = (await res.json()) as Record<string, unknown>;
  assert.equal(data.success, true);
  assert.equal(data.configured, true);
  assert.equal(data.deliveredToBoth, true);
  assert.equal(data.recipientsCount, 2);

  // Verify security and CORS headers
  assert.equal(
    res.headers.get('access-control-allow-origin'),
    'https://haryani-associates.netlify.app'
  );
  assert.equal(res.headers.get('cache-control'), 'no-store');
  assert.equal(res.headers.get('x-content-type-options'), 'nosniff');

  // Verify SMTP transporter received configured env values
  assert.ok(captured.settings);
  assert.equal(captured.settings.host, 'smtp.gmail.com');
  assert.equal(captured.settings.port, 465);
  assert.equal(captured.settings.secure, true);
  assert.equal(captured.settings.user, 'sender@gmail.com');

  // Verify email sent to both recipients and HTML escaped
  assert.ok(captured.mail);
  assert.ok(captured.mail.to.includes(RECIPIENT_EMAILS[0]));
  assert.ok(captured.mail.to.includes(RECIPIENT_EMAILS[1]));
  assert.equal(captured.mail.replyTo, 'ramesh@example.com');
  assert.ok(captured.mail.html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
  assert.ok(!captured.mail.html.includes('<script>'));

  // Ensure no SMTP secrets appear in JSON response
  const rawResponse = JSON.stringify(data);
  assert.ok(!rawResponse.includes(VALID_ENV.SMTP_PASS));
});

test('Validation errors reject invalid inputs with 400 and never invoke SMTP', async () => {
  let sendCalled = false;
  const deps = {
    env: VALID_ENV,
    rateLimiter: new Map(),
    createTransporter: () => ({
      async sendMail() {
        sendCalled = true;
        return { accepted: [...RECIPIENT_EMAILS], rejected: [] };
      },
    }),
  };

  // Missing / short name
  const badName = await processEnquirySubmission(
    {
      fullName: 'A',
      phoneNumber: '9820012345',
      message: 'Valid enquiry message length here.',
    },
    '10.0.0.1',
    deps
  );
  assert.equal(badName.status, 400);
  assert.equal(badName.body.success, false);

  // Invalid phone
  const badPhone = await processEnquirySubmission(
    {
      fullName: 'Ramesh Sharma',
      phoneNumber: '12345',
      message: 'Valid enquiry message length here.',
    },
    '10.0.0.2',
    deps
  );
  assert.equal(badPhone.status, 400);

  // Invalid email
  const badEmail = await processEnquirySubmission(
    {
      fullName: 'Ramesh Sharma',
      phoneNumber: '9820012345',
      email: 'not-an-email',
      message: 'Valid enquiry message length here.',
    },
    '10.0.0.3',
    deps
  );
  assert.equal(badEmail.status, 400);

  // Short message
  const badMessage = await processEnquirySubmission(
    {
      fullName: 'Ramesh Sharma',
      phoneNumber: '9820012345',
      message: 'Short',
    },
    '10.0.0.4',
    deps
  );
  assert.equal(badMessage.status, 400);

  // Sensitive PAN/Aadhaar blocked
  const sensitivePan = await processEnquirySubmission(
    {
      fullName: 'Ramesh Sharma',
      phoneNumber: '9820012345',
      message: 'My PAN number is ABCDE1234F please check.',
    },
    '10.0.0.5',
    deps
  );
  assert.equal(sensitivePan.status, 400);

  // Header injection attempt blocked
  const crlfInjection = await processEnquirySubmission(
    {
      fullName: 'Ramesh\r\nBcc: attacker@evil.com',
      phoneNumber: '9820012345',
      message: 'Valid enquiry message length here.',
    },
    '10.0.0.6',
    deps
  );
  assert.equal(crlfInjection.status, 400);

  assert.equal(sendCalled, false);
});

test('Spam protection: honeypot discards bots silently, excess URLs blocked, and rate limit enforces 429', async () => {
  let sendCount = 0;
  const rateLimiter = new Map<string, number[]>();

  const deps = {
    env: VALID_ENV,
    rateLimiter,
    now: () => 1_700_000_000_000,
    createTransporter: () => ({
      async sendMail() {
        sendCount += 1;
        return { accepted: [...RECIPIENT_EMAILS], rejected: [] };
      },
    }),
  };

  // Honeypot triggered -> 200 without invoking SMTP
  const botRes = await processEnquirySubmission(
    {
      fullName: 'Bot User',
      phoneNumber: '9820012345',
      message: 'Bot message that should not send email.',
      honeypot: 'http://spam.example.com',
    },
    '198.51.100.5',
    deps
  );
  assert.equal(botRes.status, 200);
  assert.equal(sendCount, 0);

  // Excessive URLs spam check -> 400
  const linkSpamRes = await processEnquirySubmission(
    {
      fullName: 'Spammer',
      phoneNumber: '9820012345',
      message: 'Visit https://a.com https://b.com https://c.com right now!',
    },
    '198.51.100.6',
    deps
  );
  assert.equal(linkSpamRes.status, 400);
  assert.equal(sendCount, 0);

  // Rate limit: 5 requests allowed, 6th returns 429
  for (let i = 0; i < 5; i += 1) {
    const okRes = await processEnquirySubmission(
      {
        fullName: 'Genuine Client',
        phoneNumber: '9820012345',
        message: 'Genuine GST filing query number ' + i,
      },
      '198.51.100.99',
      deps
    );
    assert.equal(okRes.status, 200);
  }
  const blockedRes = await processEnquirySubmission(
    {
      fullName: 'Genuine Client',
      phoneNumber: '9820012345',
      message: 'Sixth enquiry within the same minute.',
    },
    '198.51.100.99',
    deps
  );
  assert.equal(blockedRes.status, 429);
  assert.equal(sendCount, 5);
});

test('CORS, HTTP method, Content-Type, and payload size controls work accurately', async () => {
  // OPTIONS preflight from allowed origin
  const preflightRes = await handleNetlifyEnquiryRequest(
    makeRequest(undefined, {
      method: 'OPTIONS',
      origin: 'https://haryani-associates.netlify.app',
      host: 'haryani-associates.netlify.app',
    }),
    { env: VALID_ENV }
  );
  assert.equal(preflightRes.status, 204);

  // Untrusted cross-origin rejected with 403
  const forbiddenOrigin = await handleNetlifyEnquiryRequest(
    makeRequest(
      {
        fullName: 'Test User',
        phoneNumber: '9820012345',
        message: 'Cross origin test message here.',
      },
      {
        origin: 'https://malicious-third-party.example',
        host: 'haryani-associates.netlify.app',
      }
    ),
    { env: VALID_ENV }
  );
  assert.equal(forbiddenOrigin.status, 403);

  // GET method rejected with 405
  const methodNotAllowed = await handleNetlifyEnquiryRequest(
    makeRequest(undefined, { method: 'GET' }),
    { env: VALID_ENV }
  );
  assert.equal(methodNotAllowed.status, 405);

  // Malformed JSON rejected with 400
  const invalidJson = await handleNetlifyEnquiryRequest(
    makeRequest('{invalid json'),
    { env: VALID_ENV }
  );
  assert.equal(invalidJson.status, 400);

  // Oversized body rejected with 413
  const oversized = await handleNetlifyEnquiryRequest(
    makeRequest({
      fullName: 'Test User',
      phoneNumber: '9820012345',
      message: 'x'.repeat(20000),
    }),
    { env: VALID_ENV }
  );
  assert.equal(oversized.status, 413);
});

test('Email failure scenarios never report success and handle unconfigured SMTP, transport errors, and partial delivery', async () => {
  // 1. Missing SMTP credentials -> 503 configured: false
  const unconfigured = await processEnquirySubmission(
    {
      fullName: 'Ramesh Sharma',
      phoneNumber: '9820012345',
      message: 'Enquiry about annual ITR filing services.',
    },
    '203.0.113.20',
    {
      env: {},
      rateLimiter: new Map(),
    }
  );
  assert.equal(unconfigured.status, 503);
  assert.equal(unconfigured.body.success, false);
  assert.equal(unconfigured.body.configured, false);
  assert.equal(unconfigured.body.deliveredToBoth, false);

  // 2. SMTP transport rejects / throws error -> 502 deliveredToBoth: false
  const smtpError = await processEnquirySubmission(
    {
      fullName: 'Ramesh Sharma',
      phoneNumber: '9820012345',
      message: 'Enquiry about annual ITR filing services.',
    },
    '203.0.113.21',
    {
      env: VALID_ENV,
      rateLimiter: new Map(),
      createTransporter: () => ({
        async sendMail() {
          throw new Error('535-5.7.8 Username and Password not accepted');
        },
      }),
    }
  );
  assert.equal(smtpError.status, 502);
  assert.equal(smtpError.body.success, false);
  assert.equal(smtpError.body.deliveredToBoth, false);
  // Ensure raw credential details are not leaked to client
  assert.ok(!JSON.stringify(smtpError.body).includes(VALID_ENV.SMTP_PASS));

  // 3. Partial recipient delivery (one recipient rejected) -> 502 deliveredToBoth: false
  const partialFailure = await processEnquirySubmission(
    {
      fullName: 'Ramesh Sharma',
      phoneNumber: '9820012345',
      message: 'Enquiry about annual ITR filing services.',
    },
    '203.0.113.22',
    {
      env: VALID_ENV,
      rateLimiter: new Map(),
      createTransporter: () => ({
        async sendMail() {
          return {
            accepted: [RECIPIENT_EMAILS[0]],
            rejected: [RECIPIENT_EMAILS[1]],
          };
        },
      }),
    }
  );
  assert.equal(partialFailure.status, 502);
  assert.equal(partialFailure.body.success, false);
  assert.equal(partialFailure.body.deliveredToBoth, false);
});
