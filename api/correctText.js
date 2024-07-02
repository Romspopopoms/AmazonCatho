export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { text, language } = req.body;
  
    if (!text || !language) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          text: text,
          language: language,
        }),
      });
  
      const data = await response.json();
  
      const correctedText = data.matches.reduce((acc, match) => {
        if (match.replacements && match.replacements.length > 0) {
          return acc.replace(match.context.text, match.replacements[0].value);
        }
        return acc;
      }, text);
  
      res.status(200).json({ correctedText });
    } catch (error) {
      console.error('Error during text correction:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  