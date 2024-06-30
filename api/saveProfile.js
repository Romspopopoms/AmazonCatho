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
    customActivityType,
    targetAudience,
    goals,
    preferredPlatforms,
    contentTypes,
    experienceLevel,
  } = req.body;

  try {
    const query = `
      INSERT INTO profiles (id, name, activity_type, sub_activity_type, custom_activity_type, target_audience, goals, preferred_platforms, content_types, experience_level)
      VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8::jsonb, $9::jsonb, $10)
      ON CONFLICT (id) DO UPDATE
      SET 
        name = EXCLUDED.name,
        activity_type = EXCLUDED.activity_type,
        sub_activity_type = EXCLUDED.sub_activity_type,
        custom_activity_type = EXCLUDED.custom_activity_type,
        target_audience = EXCLUDED.target_audience,
        goals = EXCLUDED.goals,
        preferred_platforms = EXCLUDED.preferred_platforms,
        content_types = EXCLUDED.content_types,
        experience_level = EXCLUDED.experience_level
      RETURNING id
    `;
    const params = [id, name, activityType, subActivityType, customActivityType, JSON.stringify(targetAudience), JSON.stringify(goals), JSON.stringify(preferredPlatforms), JSON.stringify(contentTypes), experienceLevel];
    const result = await pool.query(query, params);

    return res.status(200).json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
