import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faDownload, faSave } from '@fortawesome/free-solid-svg-icons';

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
      const response = await fetch('/api/requestImageGeneration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt, size: '1024x1024', model: 'dall-e-3' })
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }

      const data = await response.json();
      console.log('Image URL:', data.imageUrl); // Log pour vérifier l'URL
      setImageUrl(data.imageUrl);
      setLoading(false);
    } catch (error) {
      console.error('Erreur de génération d\'image:', error);
      setError('Erreur lors de la génération de l\'image');
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/saveImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageUrl })
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }

      alert('Image sauvegardée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'image:', error);
      setError('Erreur lors de la sauvegarde de l\'image');
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'generated-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error);
      setError('Erreur lors du téléchargement de l\'image');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-4 bg-gray-800 rounded-lg">
        <h2 className="text-2xl text-white mb-4 text-center">Génération d&apos;Images</h2>
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
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Générer'}
          </button>
        </form>
        {loading && (
          <div className="flex justify-center mt-4">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
          </div>
        )}
        {imageUrl && (
          <div className="mt-4">
            <h3 className="text-white">Image générée:</h3>
            <img src={imageUrl} alt="Generated" className="mt-2 border border-gray-600 rounded" style={{ width: '100%', height: 'auto' }} />
            <div className="flex justify-between mt-4">
              <button
                className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleSave}
              >
                <FontAwesomeIcon icon={faSave} /> Sauvegarder
              </button>
              <button
                className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                onClick={handleDownload}
              >
                <FontAwesomeIcon icon={faDownload} /> Télécharger
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImageForm;
