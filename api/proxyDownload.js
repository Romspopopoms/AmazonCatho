export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { imageUrl } = req.body;
  
    try {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }
      const imageBuffer = await response.buffer();
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Disposition', 'attachment; filename="generated-image.png"');
      res.send(imageBuffer);
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error);
      res.status(500).json({ message: 'Erreur lors du téléchargement de l\'image' });
    }
  }
  