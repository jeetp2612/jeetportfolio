// pages/api/contact.js

import { Client } from 'pg';

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !email || !phone || !message) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  const client = new Client({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    const result = await client.query(
      'INSERT INTO messages (first_name, last_name, email, phone, message) VALUES ($1, $2, $3, $4, $5)',
      [firstName, lastName, email, phone, message]
    );
    await client.end();
    res.status(201).json({ message: 'Message sent successfully', result });
  } catch (error) {
    console.error('Database connection error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
