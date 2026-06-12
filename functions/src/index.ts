import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import * as nodemailer from 'nodemailer';

const gmailUser = defineSecret('GMAIL_USER');
const gmailPass = defineSecret('GMAIL_APP_PASSWORD');

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;
  return typeof b['name'] === 'string' && b['name'].length > 0 &&
         typeof b['email'] === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b['email']) &&
         typeof b['message'] === 'string' && b['message'].length > 0;
}

export const contactForm = onRequest(
  {
    secrets: [gmailUser, gmailPass],
    cors: [
      'https://www.gvaverkaufer.ro',
      'https://gvawebsite-b74d4.web.app',
      /https:\/\/gvawebsite-b74d4--.*\.web\.app/,
    ],
  },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const body = req.body as unknown;
    if (!isValidPayload(body)) {
      res.status(400).json({ error: 'Invalid request payload' });
      return;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser.value(), pass: gmailPass.value() },
    });

    const mailOptions = {
      from: `"GVA Website" <${gmailUser.value()}>`,
      to: 'auto@gvaverkaufer.ro',
      replyTo: body.email,
      subject: `Cerere contact — ${body.name}${body.company ? ` (${body.company})` : ''}`,
      text: [
        `Nume: ${body.name}`,
        `Email: ${body.email}`,
        `Telefon: ${body.phone ?? '-'}`,
        `Companie: ${body.company ?? '-'}`,
        `Serviciu: ${body.service ?? '-'}`,
        '',
        `Mesaj:\n${body.message}`,
      ].join('\n'),
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true });
    } catch (err) {
      console.error('Mail send error:', err);
      res.status(500).json({ error: 'Failed to send message' });
    }
  },
);
