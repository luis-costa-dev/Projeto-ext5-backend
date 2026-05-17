const nodemailer = require('nodemailer');

(async () => {
  try {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT
      ? Number(process.env.SMTP_PORT)
      : undefined;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpSecure = process.env.SMTP_SECURE === 'true';
    const mailFrom =
      process.env.MAIL_FROM || smtpUser || 'no-reply@example.com';
    const to = process.env.TEST_TO || smtpUser || 'recipient@example.com';

    let transporter;
    const isPlaceholderHost = smtpHost && smtpHost.includes('example.com');

    if (smtpHost && smtpUser && smtpPass && !isPlaceholderHost) {
      console.log(
        'Usando SMTP real:',
        smtpHost,
        'porta:',
        smtpPort || (smtpSecure ? 465 : 587),
        'secure:',
        smtpSecure,
      );
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort || (smtpSecure ? 465 : 587),
        secure: smtpSecure,
        auth: { user: smtpUser, pass: smtpPass },
        ...(process.env.SMTP_REQUIRE_TLS === 'true'
          ? { requireTLS: true }
          : {}),
        ...(process.env.SMTP_TLS_REJECT_UNAUTHORIZED === 'false'
          ? { tls: { rejectUnauthorized: false } }
          : {}),
      });
    } else {
      console.log(
        'SMTP não configurado (ou é placeholder). Usando conta de teste Ethereal.',
      );
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
    }

    // Verifica conexão
    await transporter.verify();
    console.log('Transporte verificado. Enviando para:', to);

    const subject = process.env.TEST_SUBJECT || 'Teste de e-mail';
    const text =
      process.env.TEST_TEXT || 'Mensagem de teste enviada pelo script.';
    const html =
      process.env.TEST_HTML || '<p>Mensagem de teste enviada pelo script.</p>';

    const info = await transporter.sendMail({
      from: mailFrom,
      to,
      subject,
      text,
      html,
    });

    console.log('MessageId:', info.messageId);
    try {
      const preview = nodemailer.getTestMessageUrl(info);
      if (preview) console.log('Preview URL:', preview);
    } catch (e) {
      // ignore
    }
    console.log('Pronto.');
  } catch (err) {
    console.error('Erro no envio:', err);
    process.exit(1);
  }
})();
