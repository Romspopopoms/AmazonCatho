import React, { useState } from 'react';

const GenerateImageForm = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [size, setSize] = useState('1024x1024');
  const [model, setModel] = useState('dall-e-3');
  const [quality, setQuality] = useState('standard');
  const [style, setStyle] = useState('vivid');
  const [platform, setPlatform] = useState('');

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
        body: JSON.stringify({ prompt, size, model, quality, style, platform }),
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
      <h2 className="text-2xl text-white mb-4">Génération d`&apos;Images</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Entrez votre prompt ici"
          className="p-2 bg-gray-900 text-white border border-gray-600 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col gap-4">
          <label className="text-white">Taille:</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="p-2 bg-gray-900 text-white border border-gray-600 rounded"
          >
            <option value="1024x1024">1024x1024</option>
            <option value="1792x1024">1792x1024</option>
            <option value="1024x1792">1024x1792</option>
          </select>
          <label className="text-white">Qualité:</label>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="p-2 bg-gray-900 text-white border border-gray-600 rounded"
          >
            <option value="standard">Standard</option>
            <option value="hd">HD</option>
          </select>
          <label className="text-white">Style:</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="p-2 bg-gray-900 text-white border border-gray-600 rounded"
          >
            <option value="vivid">Vivid</option>
            <option value="natural">Natural</option>
          </select>
          <label className="text-white">Plateforme:</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="p-2 bg-gray-900 text-white border border-gray-600 rounded"
          >
            <option value="">Sélectionnez une plateforme</option>
            <option value="Instagram">Instagram</option>
            <option value="TikTok">TikTok</option>
            <option value="Facebook">Facebook</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
        </div>
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
          <h3 className="text-white">Image générée:</h3>
          <img src={imageUrl} alt="Generated" className="mt-2 border border-gray-600 rounded" />
        </div>
      )}
    </div>
  );
};

export default GenerateImageForm;
