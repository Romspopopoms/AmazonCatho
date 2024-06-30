import { getSession } from 'next-auth/react';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ message: 'Image URL is required' });
  }

  try {
    const userEmail = session.user.email;

    // Mise à jour de la colonne image_urls avec la nouvelle URL
    const query = `
      UPDATE users
      SET image_urls = array_append(image_urls, $1)
      WHERE email = $2
    `;
    const params = [imageUrl, userEmail];
    await pool.query(query, params);

    return res.status(200).json({ message: 'Image URL saved successfully' });
  } catch (error) {
    console.error('Error saving image URL:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
