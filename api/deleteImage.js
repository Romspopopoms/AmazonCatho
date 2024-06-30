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

    // Supprimer l'URL de l'image de la colonne image_urls
    const query = `
      UPDATE users
      SET image_urls = array_remove(image_urls, $1)
      WHERE email = $2
    `;
    const params = [imageUrl, userEmail];
    await pool.query(query, params);

    return res.status(200).json({ message: 'Image URL deleted successfully' });
  } catch (error) {
    console.error('Error deleting image URL:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
