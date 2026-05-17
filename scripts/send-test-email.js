const nodemailer = require('nodemailer');

(async () => {
  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log('Ethereal account user:', testAccount.user);

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });

    const from = process.env.MAIL_FROM || '"No Reply" <no-reply@example.com>';
    const to = process.env.TEST_TO || 'recipient@example.com';
    const subject = process.env.TEST_SUBJECT || 'Teste Nodemailer - Ethereal';
    const text = process.env.TEST_TEXT || 'Teste de envio via Ethereal';
    const html = process.env.TEST_HTML || '<b>Teste de envio via Ethereal</b>';

    const info = await transporter.sendMail({ from, to, subject, text, html });

    console.log('MessageId:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    console.log('Done.');
  } catch (err) {
    console.error('Error sending test email:', err);
    process.exit(1);
  }
})();
