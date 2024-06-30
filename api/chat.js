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
  const specificPrompt = getSpecificPrompt(category, step);
  return `
    You are a social media content creator specialized in creating engaging content for various social media platforms. Tailor your advice to the selected category and the client's needs.

    Client Profile:
    Name: ${profile.name}
    Activity Type: ${profile.activityType}
    Sub Activity Type: ${profile.subActivityType}
    Target Audience: ${profile.targetAudience.join(', ')}
    Goals: ${profile.goals.join(', ')}
    Preferred Platforms: ${profile.preferredPlatforms.join(', ')}
    Content Types: ${profile.contentTypes.join(', ')}

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
      'Based on your profile, I suggest creating a content calendar with a mix of posts, reels, and stories to keep your audience engaged. For example, a reel on Monday and Thursday, a carousel on Saturday, and a post on Wednesday and Sunday. What do you think about this approach?',
      'Now that we have the basic structure, let’s add some specific topics. What are your key themes for the month?',
      'Great! Let’s finalize your content calendar. Would you like me to create a detailed schedule with specific dates and content ideas?',
    ],
    'Campagne de promotion de produit': [
      'For your product promotion on TikTok, I suggest creating a series of engaging videos showcasing the product features and benefits. Start with a teaser video, followed by a demonstration, and end with a call-to-action. Does this sound good?',
      'Who is your target audience for this campaign, and what key messages do you want to communicate?',
      'Perfect! Let’s create a detailed promotional plan with specific dates, content ideas, and calls to action.',
    ],
    'Développement de la marque personnelle': [
      'To develop your personal brand, I recommend sharing a mix of professional achievements, personal stories, and industry insights. How about posting an achievement on Monday, a personal story on Wednesday, and an industry insight on Friday?',
      'What specific aspects of your career or business do you want to highlight?',
      'Excellent! Let’s create a detailed content plan that aligns with your personal brand goals and audience preferences.',
    ],
    'Engagement et interaction avec l\'audience': [
      'For engaging your audience, I suggest starting with a poll or a question on Monday, followed by a Q&A session on Wednesday, and ending with user-generated content on Friday. Does this approach work for you?',
      'What type of engagement are you specifically looking for (polls, questions, Q&A sessions)?',
      'Great! Let’s create a detailed engagement plan with specific dates, content ideas, and interaction strategies.',
    ],
    'Analyse et optimisation des performances': [
      'To optimize your performance, I suggest starting with a review of your current metrics. Identify what’s working and what’s not. Then, implement changes and track the improvements. How does this plan sound?',
      'What are your key performance indicators on the selected platform?',
      'Let’s create a detailed optimization plan based on your current performance and goals.',
    ],
    'Création de contenu saisonnier': [
      'For seasonal content, I suggest creating themed posts and stories around the event or season. For example, a countdown series leading up to the event. What are your thoughts on this?',
      'What specific message do you want to convey for this season or event?',
      'Let’s create a detailed seasonal content plan with specific dates and content ideas.',
    ],
  };

  return prompts[category][step];
};

const getNextStep = (category, step) => {
  const steps = {
    'Création de planning de contenu sur 1 mois': [
      'What are your key topics or themes for the month?',
      'How often do you want to post, and what types of content (posts, reels, stories) do you prefer?',
      'Would you like a detailed content calendar with specific dates and content ideas?',
    ],
    'Campagne de promotion de produit': [
      'What product do you want to promote, and what are the key messages you want to communicate?',
      'Who is your target audience for this campaign, and what content types (posts, reels, stories, ads) do you want to use?',
      'Would you like a detailed promotional plan with specific dates, content ideas, and calls to action?',
    ],
    'Développement de la marque personnelle': [
      'What aspects of your career or business do you want to highlight?',
      'Who is your target audience, and what content types (posts, articles, videos) do you prefer?',
      'Let’s create a detailed content plan that aligns with your personal brand goals and audience preferences.',
    ],
    'Engagement et interaction avec l\'audience': [
      'What type of engagement are you looking for (polls, questions, Q&A sessions)?',
      'Who is your target audience, and what content types do you prefer to engage them?',
      'Let’s create a detailed engagement plan with specific dates, content ideas, and interaction strategies.',
    ],
    'Analyse et optimisation des performances': [
      'What are your key performance indicators on the selected platform?',
      'What goals do you want to achieve, and what optimization strategies do you need?',
      'Let’s create a detailed optimization plan based on your current performance and goals.',
    ],
    'Création de contenu saisonnier': [
      'What event or season do you want to target?',
      'What specific message do you want to convey?',
      'Let’s create a detailed seasonal content plan with specific dates and content ideas.',
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
