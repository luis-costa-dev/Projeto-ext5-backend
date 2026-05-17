const { Client } = require('pg');

(async () => {
  try {
    require('dotenv').config();

    const client = new Client({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    await client.connect();

    const id = process.env.SAMPLE_ID || `user-${Date.now()}`;
    const name = process.env.SAMPLE_NAME || 'Usuário Teste';
    const email = process.env.SAMPLE_EMAIL || 'usuario.teste@example.com';
    const password = process.env.SAMPLE_PASSWORD || 'Teste123456@#';
    const createdAt = new Date().toISOString();

    const query = `
      INSERT INTO users (id, name, email, password, role, "createdAt", "resetCode", "resetCodeExpiresAt", approved)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
      RETURNING id, email, role, approved;
    `;

    const values = [
      id,
      name,
      email,
      password,
      'user',
      createdAt,
      null,
      null,
      false,
    ];

    const res = await client.query(query, values);
    console.log('Sample user created/updated:', res.rows[0]);

    await client.end();
  } catch (err) {
    console.error('Error creating sample user:', err.message || err);
    process.exit(1);
  }
})();
