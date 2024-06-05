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
            SELECT section, subsection
            FROM section
        `;
        const { rows } = await pool.query(query);

        const sectionsMap = {};

        rows.forEach(row => {
            const { section, subsection } = row;
            if (!sectionsMap[section]) {
                sectionsMap[section] = { name: section, subsections: [] };
            }
            if (subsection) {
                sectionsMap[section].subsections.push(subsection);
            }
        });

        const sections = Object.values(sectionsMap);

        res.status(200).json(sections);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}
