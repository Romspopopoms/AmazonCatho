const { Pool } = require('pg');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Charger les variables d'environnement depuis un fichier .env
dotenv.config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const voices = [
  { name: 'Allow', gender: 'male', url: 'blob:https://amazon-catho.vercel.app/7ca8087f-813d-4879-927c-ce97d7ea6bcb' },
  { name: 'Echo', gender: 'male', url: 'blob:https://amazon-catho.vercel.app/2daf6170-cb17-478e-acb0-c492e0c1a50a' },
  { name: 'Onyx', gender: 'male', url: 'blob:https://amazon-catho.vercel.app/19c67b03-8022-486e-878e-286b6fb1a531' },
  { name: 'Fable', gender: 'female', url: 'blob:https://amazon-catho.vercel.app/0575abc2-b4b9-4da2-8799-83d85c2a4881' },
  { name: 'Nova', gender: 'female', url: 'blob:https://amazon-catho.vercel.app/8f7db6fe-1aa1-41a9-b923-da888212c328' },
  { name: 'Shimmer', gender: 'female', url: 'blob:https://amazon-catho.vercel.app/e1da3a7a-77f2-47f3-9a4a-b4b38bd30553' },
];

async function insertVoices() {
  for (const voice of voices) {
    try {
      const query = `
        INSERT INTO voices (name, gender, url)
        VALUES ($1, $2, $3)
      `;
      const params = [voice.name, voice.gender, voice.url];
      await pool.query(query, params);
      console.log(`Voix ${voice.name} insérée avec succès`);
    } catch (error) {
      console.error(`Erreur lors de l'insertion de la voix ${voice.name}:`, error);
    }
  }

  await pool.end();
  console.log('Insertion terminée');
}

insertVoices();
