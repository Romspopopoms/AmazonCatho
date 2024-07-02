import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { text, voice, language } = req.body;

  if (!text || !voice || !language) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const response = await openai.audio.speech.create({
      model: 'tts-1-hd',
      voice,
      input: text,
      language
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    
    res.setHeader('Content-Type', 'audio/mp3');
    res.send(buffer);
  } catch (error) {
    console.error('Erreur de synthèse vocale:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
