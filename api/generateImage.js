import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { prompt, size, model, quality, style } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const response = await openai.images.generate({
      prompt,
      model: model || "dall-e-3",
      size: size || "1024x1024",
      n: 1, // For dall-e-3, only n=1 is supported
      quality: quality || "standard",
      style: style || "vivid",
      response_format: "url",
    });

    const imageUrl = response.data[0].url;
    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
