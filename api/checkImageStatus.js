import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { taskId } = req.query;

  if (!taskId) {
    return res.status(400).json({ message: "Task ID is required" });
  }

  try {
    const response = await fetch(`https://api.openai.com/v1/images/generations/${taskId}/status`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.status === 'completed' && data.data && data.data.length > 0) {
      const imageUrl = data.data[0].url;
      return res.status(200).json({ imageUrl });
    } else if (data.status === 'pending') {
      return res.status(202).json({ message: "Image generation is still in progress" });
    } else {
      throw new Error('Failed to check image status.');
    }
  } catch (error) {
    console.error('Error checking image status:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
