// pages/api/conversation.js
import OpenAI from 'openai';
import dotenv from 'dotenv';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { withGlobalState, HandleUserInputWithGlobalState } from '../../utils/withGlobalState';

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message, platform, category, messages, step, profile, excludedTypes } = req.body;

  const prompt = createPrompt(messages, platform, category, step, profile);

  console.log(`Sending request to OpenAI with prompt: ${prompt}`);

  try {
    const promise = new Promise((resolve, reject) => {
      renderToString(
        React.createElement(
          withGlobalState(HandleUserInputWithGlobalState), 
          { 
            userId: profile.id, 
            userInput: message, 
            step, 
            platform, 
            category, 
            profile, 
            excludedTypes, 
            resolve, 
            reject 
          }
        )
      );
    });

    const { response, options } = await promise;
    res.status(200).json({ response, nextStep: step + 1, options });
  } catch (error) {
    console.error('Erreur de communication avec OpenAI:', error);
    res.status(500).json({ message: 'Erreur de communication avec OpenAI' });
  }
}
