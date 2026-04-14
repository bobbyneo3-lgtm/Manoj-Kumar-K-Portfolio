import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.error('RESEND_API_KEY is missing');
      return res.status(500).json({ 
        success: false, 
        message: 'Email service not configured. Please add RESEND_API_KEY to environment variables.' 
      });
    }

    try {
      const resend = new Resend(apiKey);

      const { data, error } = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'manojkarra.kumar@gmail.com',
        subject: `New Portfolio Message from ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #ff8c42;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
              ${message}
            </div>
          </div>
        `,
      });

      if (error) {
        console.error('Resend API Error:', error);
        return res.status(400).json({ success: false, message: error.message });
      }

      res.json({ success: true, message: 'Message sent successfully!', id: data?.id });
    } catch (error) {
      console.error('Unexpected error sending email:', error);
      res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
