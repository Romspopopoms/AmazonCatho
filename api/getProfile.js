// /api/getProfile.js
import { Pool } from 'pg';

// Assurez-vous que la variable d'environnement POSTGRES_URL est définie sur Vercel
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false  // Nécessaire si la base de données utilise SSL
  }
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  try {
    const query = 'SELECT * FROM profiles WHERE id = $1';
    const params = [id];
    const result = await pool.query(query, params);

    if (result.rows.length > 0) {
      return res.status(200).json({ success: true, profile: result.rows[0] });
    } else {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
