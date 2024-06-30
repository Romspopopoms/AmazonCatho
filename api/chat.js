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

  Profile Information:
  - Name: ${profile.name}
  - Activity Type: ${profile.activityType}
  - Sub Activity Type: ${profile.subActivityType}
  - Target Audience: ${targetAudience}
  - Goals: ${goals}
  - Preferred Platforms: ${preferredPlatforms}
  - Content Types: ${contentTypes}

  Platform: ${platform}
  Category: ${category}

  Guidelines:
  1. Start by confirming the user's objectives and any specific requests.
  2. Provide detailed and actionable suggestions quickly.
  3. Limit the number of questions to a maximum of 2-3 before giving a concrete plan.
  4. Summarize information gathered and confirm with the user before finalizing plans.
  5. Use specific details from the user's profile to tailor your suggestions.

  Client's conversation history:
  ${conversationHistory}

  Current Step: ${step}

  Based on the current step and the client's responses, continue the conversation by providing a concrete suggestion or asking a targeted question.
`;
};

const getNextStep = (category, step) => {
const steps = {
  'Création de planning de contenu sur 1 mois': [
    'Quelle est votre audience cible ?',
    'Quels sont les principaux objectifs de votre contenu ?',
    'Voici une suggestion de plan pour la première semaine...'
  ],
  'Campagne de promotion de produit': [
    'Quel est le produit que vous souhaitez promouvoir ?',
    'Quelle est votre audience cible ?',
    'Voici un plan de promotion détaillé pour la première semaine...'
  ],
  'Développement de la marque personnelle': [
    'Quels aspects de votre carrière ou de votre entreprise souhaitez-vous mettre en avant ?',
    'Quelle est votre audience cible ?',
    'Voici des idées de contenu pour développer votre marque...'
  ],
  'Engagement et interaction avec l\'audience': [
    'Quel type d\'engagement recherchez-vous (sondages, questions, sessions Q&A) ?',
    'Quelle est votre audience cible ?',
    'Voici des idées d\'interactions pour engager votre audience...'
  ],
  'Analyse et optimisation des performances': [
    'Quels sont vos principaux indicateurs de performance sur [plateforme] ?',
    'Quels objectifs souhaitez-vous atteindre ?',
    'Voici des recommandations d\'optimisation basées sur vos performances actuelles...'
  ],
  'Création de contenu saisonnier': [
    'Quel événement ou saison souhaitez-vous cibler ?',
    'Quel message souhaitez-vous transmettre ?',
    'Voici un plan de contenu saisonnier pour la première semaine...'
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
