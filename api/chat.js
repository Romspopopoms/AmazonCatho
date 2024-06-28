import OpenAI from 'openai';
import dotenv from 'dotenv';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('Clé API non définie');
  throw new Error('Clé API non définie');
}

const openai = new OpenAI({
  apiKey: apiKey,
});

const createPrompt = (messages, platform) => {
  const conversationHistory = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
  return `
    You are a social media content creator specialized in creating engaging content for platforms like Instagram, TikTok, Facebook, and LinkedIn. Follow these guidelines:
    
    1. Ask specific questions to understand the client's needs.
    2. Tailor the content to the target audience of the specified platform.
    3. Provide suggestions for posts, reels, carousels, etc.
    4. Ensure that each interaction is unique and does not repeat previous questions or suggestions unless necessary for clarification.

    Client's conversation history:
    ${conversationHistory}

    Platform: ${platform}

    Start by introducing yourself as a social media content creator and ask relevant questions to understand the client's goals and preferences.
  `;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message, platform, messages } = req.body;

  const prompt = createPrompt(messages, platform);

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: prompt }],
      max_tokens: 300,
    });

    res.status(200).json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Erreur de communication avec OpenAI:', error);
    res.status(500).json({ message: 'Erreur de communication avec OpenAI' });
  }
}
