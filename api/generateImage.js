import OpenAI from "openai";
import fetch from 'node-fetch';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 15000 } = options; // Augmentez le délai à 15 secondes

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { prompt, size, model, quality, style } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const response = await fetchWithTimeout('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        model: model || "dall-e-3",
        size: size || "1024x1024",
        n: 1, // For dall-e-3, only n=1 is supported
        quality: quality || "standard",
        style: style || "vivid",
        response_format: "url",
      }),
    });

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      const imageUrl = data.data[0].url;
      return res.status(200).json({ imageUrl });
    } else {
      throw new Error('No image URL returned by OpenAI.');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    if (error.name === 'AbortError') {
      return res.status(504).json({ message: "Request timed out" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
