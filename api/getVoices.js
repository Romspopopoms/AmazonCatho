import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    try {
      const query = 'SELECT id, name, gender, url FROM voices';
      const { rows } = await pool.query(query);
  
      return res.status(200).json({ success: true, voices: rows });
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }