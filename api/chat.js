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

const parseIfNeeded = (data) => {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return [];
    }
  }
  return data || [];
};

const createPrompt = (messages, platform, category, step, profile) => {
  const conversationHistory = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');

  const targetAudience = parseIfNeeded(profile.targetAudience);
  const goals = parseIfNeeded(profile.goals);
  const preferredPlatforms = parseIfNeeded(profile.preferredPlatforms);
  const contentTypes = parseIfNeeded(profile.contentTypes);

  return `
    You are a social media content creator specialized in creating engaging content for various social media platforms. Tailor your advice to the selected category and the client's needs.

    Platform: ${platform}
    Category: ${category}
    User Profile:
    - Name: ${profile.name}
    - Activity Type: ${profile.activityType}
    - Sub-Activity Type: ${profile.subActivityType}
    - Target Audience: ${targetAudience.join(', ')}
    - Goals: ${goals.join(', ')}
    - Preferred Platforms: ${preferredPlatforms.join(', ')}
    - Content Types: ${contentTypes.join(', ')}

    Guidelines:
    1. Start by asking specific questions to understand the client's needs based on the selected category.
    2. Provide detailed and actionable suggestions.
    3. Tailor the content to the target audience and platform.
    4. Ensure that each interaction is unique and does not repeat previous questions or suggestions unless necessary for clarification.

    Client's conversation history:
    ${conversationHistory}

    Current Step: ${step}

    Based on the current step and the client's responses, continue the conversation by asking the next relevant question or providing the next suggestion.
  `;
};

const getNextStep = (category, step) => {
  const steps = {
    'Création de planning de contenu sur 1 mois': [
      'Quelle est votre audience cible ?',
      'Quels sont les principaux objectifs de votre contenu ?',
      'Quelles sont les dates importantes à inclure dans le planning ?',
      'Quels types de contenu souhaitez-vous publier (posts, reels, stories) ?',
    ],
    'Campagne de promotion de produit': [
      'Quel est le produit que vous souhaitez promouvoir ?',
      'Quelle est votre audience cible ?',
      'Quels sont les messages clés à communiquer ?',
      'Quels types de contenu souhaitez-vous utiliser (posts, reels, stories, publicités) ?',
    ],
    'Développement de la marque personnelle': [
      'Quels aspects de votre carrière ou de votre entreprise souhaitez-vous mettre en avant ?',
      'Quelle est votre audience cible ?',
      'Quels types de contenu souhaitez-vous créer (posts, articles, vidéos) ?',
    ],
    'Engagement et interaction avec l\'audience': [
      'Quel type d\'engagement recherchez-vous (sondages, questions, sessions Q&A) ?',
      'Quelle est votre audience cible ?',
      'Quels types de contenu souhaitez-vous utiliser pour engager votre audience ?',
    ],
    'Analyse et optimisation des performances': [
      'Quels sont vos principaux indicateurs de performance sur [plateforme] ?',
      'Quels objectifs souhaitez-vous atteindre ?',
      'Souhaitez-vous des recommandations d\'optimisation basées sur vos performances actuelles ?',
    ],
    'Création de contenu saisonnier': [
      'Quel événement ou saison souhaitez-vous cibler ?',
      'Quel message souhaitez-vous transmettre ?',
      'Quels types de contenu souhaitez-vous créer (posts, stories, vidéos) ?',
    ],
  };

  return steps[category][step];
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message, platform, category, messages, step, profile } = req.body;

  const prompt = createPrompt(messages, platform, category, step, profile);

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
