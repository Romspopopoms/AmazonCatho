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
    const blob = new Blob([buffer], { type: 'audio/mp3' });
    const url = URL.createObjectURL(blob);

    res.status(200).json({ audioUrl: url });
  } catch (error) {
    console.error('Erreur de synthèse vocale:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
