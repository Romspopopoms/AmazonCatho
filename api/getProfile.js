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

  const { id } = req.query;

  try {
    const query = `
      SELECT 
        id,
        name, 
        activity_type AS "activityType", 
        sub_activity_type AS "subActivityType", 
        custom_activity_type AS "customActivityType", 
        target_audience AS "targetAudience", 
        goals, 
        preferred_platforms AS "preferredPlatforms", 
        content_types AS "contentTypes", 
        experience_level AS "experienceLevel", 
        COALESCE(image_urls, '{}') AS "imageUrls" 
      FROM profiles 
      WHERE id = $1
    `;
    const params = [id];
    const { rows } = await pool.query(query, params);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, profile: rows[0] });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
