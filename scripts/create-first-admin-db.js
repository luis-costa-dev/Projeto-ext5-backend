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

    const id = process.env.ADMIN_ID || `admin-${Date.now()}`;
    const name = process.env.ADMIN_NAME || 'Admin Principal';
    const email = process.env.ADMIN_EMAIL || 'admin@ong.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const createdAt = new Date().toISOString();

    const query = `
      INSERT INTO users (id, name, email, password, role, "createdAt", "resetCode", "resetCodeExpiresAt", approved)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      ON CONFLICT (email) DO UPDATE SET role = EXCLUDED.role, approved = TRUE
      RETURNING id, email, role, approved;
    `;

    const values = [
      id,
      name,
      email,
      password,
      'admin',
      createdAt,
      null,
      null,
      true,
    ];

    const res = await client.query(query, values);
    console.log('Admin created/updated:', res.rows[0]);

    await client.end();
  } catch (err) {
    console.error('Error creating admin:', err.message || err);
    process.exit(1);
  }
})();
