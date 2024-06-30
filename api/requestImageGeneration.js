import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { prompt, size, model } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    const response = await openai.images.generate({
      prompt: prompt,
      model: model || 'dall-e-3',
      size: size || '1024x1024',
      n: 1,
      response_format: 'url'
    });

    if (response.data && response.data.length > 0) {
      const imageUrl = response.data[0].url;
      return res.status(200).json({ imageUrl });
    } else {
      throw new Error('No image URL returned by OpenAI.');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
