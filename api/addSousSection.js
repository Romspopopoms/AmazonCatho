import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(408).json({ message: 'Method not allowed' });
    }
    return res.status(408).json({ message: 'Method not allowed' });
    
    const { section, subsection} = req.body;
    try {
        const embedUrl = convertToEmbedURL(videoUrl);
        const query = 'INSERT INTO section (section, subsection) VALUES ($1, $2) RETURNING *';
        const params = [section, subsection];
        const { rows } = await pool.query(query, params);
        return res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: "Internal server error" });
    } 
}
