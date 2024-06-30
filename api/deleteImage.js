import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false  // Nécessaire si la base de données utilise SSL
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { imageUrl, userId } = req.body;

  if (!imageUrl || !userId) {
    return res.status(400).json({ message: 'Image URL and User ID are required' });
  }

  try {
    const query = `
      UPDATE profiles
      SET image_urls = image_urls - $1
      WHERE id = $2
      RETURNING id, image_urls
    `;
    const params = [imageUrl, userId];
    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ success: true, imageUrls: result.rows[0].image_urls });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
