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

const createPrompt = (messages, platform, category, step, profile) => {
  const conversationHistory = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
  const { name, activitytype, subactivitytype, targetaudience, goals, preferredplatforms, contenttypes } = profile;

  const suggestions = {
    'Création de planning de contenu sur 1 mois': `
      Pour créer un planning de contenu sur Instagram pour un mois, je propose de publier des Reels les lundis et jeudis, des posts de citations inspirantes les mercredis et samedis, et des carrousels interactifs les vendredis. Qu'en pensez-vous ?
    `,
    'Campagne de promotion de produit': `
      Pour une campagne de promotion de produit, nous pourrions commencer par des posts teaser avant le lancement, suivis de vidéos de démonstration, de témoignages de clients, et de promotions exclusives. Qu'en pensez-vous ?
    `,
    'Développement de la marque personnelle': `
      Pour développer votre marque personnelle, je suggère de partager des histoires personnelles et des témoignages les lundis, des conseils professionnels les mercredis, et des vidéos de questions-réponses les vendredis. Qu'en pensez-vous ?
    `,
    'Engagement et interaction avec l\'audience': `
      Pour engager votre audience, je recommande de publier des sondages et des questions les mardis, des sessions Q&A en direct les jeudis, et des concours interactifs les samedis. Qu'en pensez-vous ?
    `,
    'Analyse et optimisation des performances': `
      Pour analyser et optimiser vos performances, nous pouvons commencer par examiner vos indicateurs clés de performance actuels, puis proposer des recommandations d'optimisation basées sur ces données. Qu'en pensez-vous ?
    `,
    'Création de contenu saisonnier': `
      Pour créer du contenu saisonnier, je propose de planifier des posts et des vidéos en fonction des événements et des fêtes à venir, en ajoutant des éléments visuels et des messages pertinents pour chaque occasion. Qu'en pensez-vous ?
    `
  };

  const initialQuestion = `
    You are a social media content creator specialized in creating engaging content for various social media platforms. Tailor your advice to the selected category and the client's needs.

    Profile Information:
    - Name: ${name}
    - Activity Type: ${activitytype}
    - Sub-Activity Type: ${subactivitytype}
    - Target Audience: ${targetaudience.join(', ')}
    - Goals: ${goals.join(', ')}
    - Preferred Platforms: ${preferredplatforms.join(', ')}
    - Content Types: ${contenttypes.join(', ')}

    Platform: ${platform}
    Category: ${category}

    Guidelines:
    1. Start by asking specific questions to understand the client's needs based on the selected category.
    2. Provide detailed and actionable suggestions.
    3. Tailor the content to the target audience and platform.
    4. Ensure that each interaction is unique and does not repeat previous questions or suggestions unless necessary for clarification.
    5. Make specific and creative suggestions to help the client achieve their goals.

    Client's conversation history:
    ${conversationHistory}

    ${step === 0 ? suggestions[category] : ''}
  `;

  return initialQuestion;
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
