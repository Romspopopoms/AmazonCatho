import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const query = `
            SELECT section, ARRAY_AGG(subsection) AS subsections
            FROM section
            GROUP BY section
        `;
        const { rows } = await pool.query(query);

        const sections = rows.map(row => ({
            name: row.section,
            subsections: row.subsections
        }));

        res.status(200).json(sections);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}
