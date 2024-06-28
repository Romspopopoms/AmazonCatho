// /api/saveProfile.js
import { Pool } from 'pg';

// Assurez-vous que la variable d'environnement POSTGRES_URL est définie sur Vercel
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false  // Nécessaire si la base de données utilise SSL
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, activityType, subActivityType, targetAudience, goals, preferredPlatforms, contentTypes, experienceLevel } = req.body;

  try {
    const query = `
      INSERT INTO profiles (name, activityType, subActivityType, targetAudience, goals, preferredPlatforms, contentTypes)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;
    const params = [name, activityType, subActivityType, JSON.stringify(targetAudience), JSON.stringify(goals), JSON.stringify(preferredPlatforms), JSON.stringify(contentTypes), experienceLevel];
    const result = await pool.query(query, params);

    return res.status(200).json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
