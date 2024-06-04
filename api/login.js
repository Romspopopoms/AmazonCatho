// /api/login.js
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

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

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Both username and password are required" });
    }

    try {
        const query = 'SELECT password FROM users WHERE username = $1';
        const params = [username];
        const { rows } = await pool.query(query, params);

        if (rows.length > 0) {
            const matched = await bcrypt.compare(password, rows[0].password);
            if (matched) {
                return res.status(200).json({ success: true, message: "Connexion réussie" });
            } else {
                return res.status(401).json({ success: false, message: "Invalid credentials" });
            }
        } else {
            return res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error('Database or bcrypt error:', error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
