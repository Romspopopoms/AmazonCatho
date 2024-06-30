import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {
    id,
    name,
    activityType,
    subActivityType,
    targetAudience,
    goals,
    preferredPlatforms,
    contentTypes,
    imageUrls,
  } = req.body;

  try {
    const query = `
      INSERT INTO profiles (id, name, activitytype, subactivitytype, targetaudience, goals, preferredplatforms, contenttypes, image_urls)
      VALUES ($1, $2, $3, $4, $5::jsonb, $6::jsonb, $7::jsonb, $8::jsonb, $9::jsonb)
      ON CONFLICT (id) DO UPDATE
      SET 
        name = EXCLUDED.name,
        activitytype = EXCLUDED.activitytype,
        subactivitytype = EXCLUDED.subactivitytype,
        targetaudience = EXCLUDED.targetaudience,
        goals = EXCLUDED.goals,
        preferredplatforms = EXCLUDED.preferredplatforms,
        contenttypes = EXCLUDED.contenttypes,
        image_urls = EXCLUDED.image_urls
      RETURNING id
    `;
    const params = [id, name, activityType, subActivityType, JSON.stringify(targetAudience), JSON.stringify(goals), JSON.stringify(preferredPlatforms), JSON.stringify(contentTypes), JSON.stringify(imageUrls)];
    const result = await pool.query(query, params);

    return res.status(200).json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
