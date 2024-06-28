import OpenAI from 'openai';
import dotenv from 'dotenv';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY || "sk-proj-OF0FUOmWKRwTNbMe75h1T3BlbkFJu9lMJB2JFH9u5o1pQ6fP"

const openai = new OpenAI({
  apiKey: apiKey,
});

export default async function handler(req, res) {
  console.log('Handler start'); // Log de début de la fonction
  if (req.method !== 'POST') {
    console.log('Invalid method'); // Log pour méthode non supportée
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    console.log('Before API call'); // Log avant l'appel à l'API OpenAI
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
    });
    console.log('After API call'); // Log après l'appel à l'API OpenAI

    res.status(200).json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Erreur de communication avec OpenAI:', error);
    res.status(500).json({ message: 'Erreur de communication avec OpenAI' });
  }
}
