import { IncomingForm } from 'formidable';
import nodemailer from 'nodemailer';
import fs from 'fs';

// Disable default body parser to allow file uploads via formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

// API route handler for processing contact form submissions
export default async function handler(req, res) {
  // Reject any method other than POST
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // Create new formidable form instance with max file size limit
  const form = new IncomingForm({ multiples: true, maxTotalFileSize: 20 * 1024 * 1024 });

  // Parse the incoming request (fields and files)
  form.parse(req, async (err, fields, files) => {
    // Handle errors from parsing form data
    if (err) {
      console.error('❌ Błąd formularza:', err);

      // Sprawdzenie błędu przekroczenia limitu pliku
      if (err.code === 1009) {
        return res
          .status(413)
          .json({ error: 'Plik jest zbyt duży. Maksymalna dozwolona wielkość to 20 MB.' });
      }

      return res.status(500).json({ error: 'Błąd formularza' });
    }

    // Extract text fields from form
    const { name, email, phone, message } = fields;
    const fileList = files?.file
      ? (Array.isArray(files.file) ? files.file : [files.file])
      : [];

    // Prepare attachments for nodemailer
    const attachments = fileList.filter(Boolean).map(file => ({
      filename: file.originalFilename,
      path: file.filepath,
    }));

    try {
      // Configure SMTP transport using Gmail and environment variables
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Send the email with form data and attachments
      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: process.env.CONTACT_EMAIL,
        subject: `${name} potrzebuje pomocy, komputer nie działa!`,
        text: `
Imię i Nazwisko: ${name}
Email: ${email}
Telefon: ${phone}
Wiadomość: ${message}
        `,
        attachments,
      });

      res.status(200).send('OK');
    } catch (error) {
      console.error('❌ Błąd wysyłki:', error);
      res.status(500).json({ error: 'Błąd wysyłki wiadomości' });
    }
  });
}
