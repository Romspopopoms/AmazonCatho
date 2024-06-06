import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { title, description, price, section, subsection, fileurl } = req.body;

  if (!title || !description || !price || !section || !subsection || !fileurl) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const query = 'INSERT INTO articles (title, description, price, section, subsection, imageurl) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const params = [title, description, price, section, subsection, fileurl];
    const { rows } = await pool.query(query, params);
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
