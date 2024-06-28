import React, { useState } from 'react';

const GenerateImageForm = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!prompt) {
      setError('Le prompt est requis');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/generateImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, size: "1024x1024", model: "dall-e-3" }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }

      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error('Erreur de génération d\'image:', error);
      setError('Erreur lors de la génération de l\'image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-4 bg-gray-800 rounded-lg">
      <h2 className="text-2xl text-white mb-4">Génération d&apos;Images</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Entrez votre prompt ici"
          className="p-2 bg-gray-900 text-white border border-gray-600 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Génération en cours...' : 'Générer'}
        </button>
      </form>
      {imageUrl && (
        <div className="mt-4">
          <h3 className="text-white mb-2">Image générée:</h3>
          <img src={imageUrl} alt="Généré par DALL-E 3" className="rounded" />
        </div>
      )}
    </div>
  );
};

export default GenerateImageForm;
