import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { text, voice, language, response_format = 'mp3', speed = 1.0 } = req.body;

  if (!text || !voice || !language) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Ensure the voice is valid
  const validVoices = ['nova', 'shimmer', 'echo', 'onyx', 'fable', 'alloy'];
  if (!validVoices.includes(voice)) {
    return res.status(400).json({ message: `Invalid voice. Must be one of: ${validVoices.join(', ')}` });
  }

  // Ensure the speed is within the valid range
  if (speed < 0.25 || speed > 4.0) {
    return res.status(400).json({ message: 'Invalid speed. Must be between 0.25 and 4.0' });
  }

  try {
    const response = await openai.audio.speech.create({
      model: 'tts-1-hd',
      voice,
      input: text,
      language,
      response_format,
      speed
    });

    const buffer = Buffer.from(await response.arrayBuffer());

    res.setHeader('Content-Type', `audio/${response_format}`);
    res.send(buffer);
  } catch (error) {
    console.error('Erreur de synthèse vocale:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
