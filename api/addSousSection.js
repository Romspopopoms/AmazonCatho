/*import { put } from '@vercel/blob';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    
    const { title, section, description, videoUrl, link, imageUrl } = req.body;
    try {
        const embedUrl = convertToEmbedURL(videoUrl);
        const query = 'INSERT INTO articles (title, section, description, imageUrl, videoUrl, link) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const params = [title, section, description, imageUrl, embedUrl, link];
        const { rows } = await pool.query(query, params);
        return res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: "Internal server error" });
    } 
}

function convertToEmbedURL(url) {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(youtube\.com\/watch\?v=|youtu.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[2]}` : url;
}*/
