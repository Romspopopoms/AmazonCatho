import React, { useState } from 'react';
import Image from 'next/image';

const GenerateImageForm = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [size, setSize] = useState('1024x1024');
  const [model, setModel] = useState('dall-e-3');
  const [quality, setQuality] = useState('standard');
  const [style, setStyle] = useState('vivid');

  const checkImageStatus = async (taskId) => {
    try {
      const response = await fetch(`/api/checkImageStatus?taskId=${taskId}`);
      const data = await response.json();

      if (response.status === 200) {
        setImageUrl(data.imageUrl);
        setLoading(false);
      } else if (response.status === 202) {
        setTimeout(() => checkImageStatus(taskId), 10000); // Vérifier toutes les 10 secondes
      } else {
        setError(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du statut de l\'image:', error);
      setError('Erreur lors de la vérification du statut de l\'image');
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!prompt) {
      setError('Le prompt est requis');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/requestImageGeneration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, size, model, quality, style }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }

      const data = await response.json();
      checkImageStatus(data.taskId);
    } catch (error) {
      console.error('Erreur de génération d\'image:', error);
      setError('Erreur lors de la génération de l\'image');
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
          <Image src={imageUrl} alt="Generated" width={1024} height={1024} className="mt-2 border border-gray-600 rounded" />
        </div>
      )}
    </div>
  );
};

export default GenerateImageForm;
