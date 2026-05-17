import { Injectable, InternalServerErrorException } from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: any;

  constructor() {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
    const secure = process.env.SMTP_SECURE === 'true';
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (host && (user || pass)) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: user && pass ? { user, pass } : undefined,
      });
    }
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    const from =
      process.env.MAIL_FROM || process.env.SMTP_USER || 'no-reply@example.com';
    try {
      // If transporter wasn't configured from env, create a test account (Ethereal) for local testing
      if (!this.transporter) {
        const testAccount = await nodemailer.createTestAccount();
        this.transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: { user: testAccount.user, pass: testAccount.pass },
        });
      }

      const info = await this.transporter.sendMail({
        from,
        to,
        subject,
        text,
        html,
      });

      // If using Ethereal, print preview URL to console
      try {
        const preview = nodemailer.getTestMessageUrl(info);
        if (preview) console.log('Ethereal preview URL:', preview);
      } catch (e) {
        // ignore
      }
      return info;
    } catch (error) {
      console.error('Mail send error:', error);
      throw new InternalServerErrorException('Erro ao enviar e-mail');
    }
  }
}
