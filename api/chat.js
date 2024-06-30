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

const createPrompt = (messages, platform, category, step) => {
  const conversationHistory = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
  const specificPrompt = getSpecificPrompt(category, step);
  return `
    You are a social media content creator specialized in creating engaging content for various social media platforms. Tailor your advice to the selected category and the client's needs.

    Platform: ${platform}
    Category: ${category}

    Guidelines:
    1. ${specificPrompt}
    2. Tailor the content to the target audience and platform.
    3. Ensure that each interaction is unique and does not repeat previous questions or suggestions unless necessary for clarification.

    Client's conversation history:
    ${conversationHistory}

    Current Step: ${step}

    Based on the current step and the client's responses, continue the conversation by providing the next relevant suggestion or action.
  `;
};

const getSpecificPrompt = (category, step) => {
  const prompts = {
    'Création de planning de contenu sur 1 mois': [
      'Identify the key topics or themes for the month and provide a detailed plan.',
      'Determine the frequency and type of content (posts, reels, stories) and create a schedule.',
      'Create a detailed content calendar with specific dates and content ideas.',
    ],
    'Campagne de promotion de produit': [
      'Define the product and its unique selling points, and suggest creative ways to promote it.',
      'Create promotional posts and stories highlighting the product with engaging content.',
      'Plan a timeline for the campaign, including launch and follow-up posts, and suggest key messages.',
    ],
    'Développement de la marque personnelle': [
      'Identify the key aspects of your personal brand to highlight, and provide content ideas.',
      'Create a mix of content types (posts, articles, videos) to showcase these aspects, with specific examples.',
      'Develop a schedule to consistently post brand-related content and suggest strategies for engagement.',
    ],
    'Engagement et interaction avec l\'audience': [
      'Plan interactive content like polls, Q&A sessions, and challenges, with examples.',
      'Encourage user-generated content and engagement through comments and shares, and suggest specific activities.',
      'Schedule regular engagement activities to maintain audience interest, with a detailed plan.',
    ],
    'Analyse et optimisation des performances': [
      'Review current performance metrics and identify areas for improvement, with detailed analysis.',
      'Provide specific recommendations for optimizing content and strategy, with actionable steps.',
      'Set new performance goals and create a plan to achieve them, with clear objectives and timelines.',
    ],
    'Création de contenu saisonnier': [
      'Identify key seasonal events and themes relevant to your audience, with specific ideas.',
      'Create themed posts and stories to align with these events, with examples and suggestions.',
      'Plan a content schedule to maximize seasonal engagement, with detailed planning.',
    ],
  };

  return prompts[category][step];
};

const getNextStep = (category, step) => {
  const steps = {
    'Création de planning de contenu sur 1 mois': [
      'Identify the key topics or themes for the month.',
      'Determine the frequency and type of content (posts, reels, stories).',
      'Create a detailed content calendar with specific dates.',
    ],
    'Campagne de promotion de produit': [
      'Define the product and its unique selling points.',
      'Create promotional posts and stories highlighting the product.',
      'Plan a timeline for the campaign, including launch and follow-up posts.',
    ],
    'Développement de la marque personnelle': [
      'Identify the key aspects of your personal brand to highlight.',
      'Create a mix of content types (posts, articles, videos) to showcase these aspects.',
      'Develop a schedule to consistently post brand-related content.',
    ],
    'Engagement et interaction avec l\'audience': [
      'Plan interactive content like polls, Q&A sessions, and challenges.',
      'Encourage user-generated content and engagement through comments and shares.',
      'Schedule regular engagement activities to maintain audience interest.',
    ],
    'Analyse et optimisation des performances': [
      'Review current performance metrics and identify areas for improvement.',
      'Provide specific recommendations for optimizing content and strategy.',
      'Set new performance goals and create a plan to achieve them.',
    ],
    'Création de contenu saisonnier': [
      'Identify key seasonal events and themes relevant to your audience.',
      'Create themed posts and stories to align with these events.',
      'Plan a content schedule to maximize seasonal engagement.',
    ],
  };

  return steps[category][step];
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message, platform, category, messages, step } = req.body;

  const prompt = createPrompt(messages, platform, category, step);

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: prompt }],
      max_tokens: 300,
    });

    const nextStep = getNextStep(category, step + 1);
    res.status(200).json({ response: completion.choices[0].message.content, nextStep });
  } catch (error) {
    console.error('Erreur de communication avec OpenAI:', error);
    res.status(500).json({ message: 'Erreur de communication avec OpenAI' });
  }
}
