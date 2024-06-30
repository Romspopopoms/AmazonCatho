import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { prompt, size, model, quality, style } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        model: model || "dall-e-3",
        size: size || "1024x1024",
        n: 1,
        quality: quality || "standard",
        style: style || "vivid",
        response_format: "url",
      }),
    });

    const data = await response.json();

    if (data && data.data && data.data.length > 0) {
      const imageUrl = data.data[0].url;
      return res.status(200).json({ imageUrl });
    } else {
      throw new Error('Failed to initiate image generation.');
    }
  } catch (error) {
    console.error('Error requesting image generation:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
