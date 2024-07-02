import React, { useState, useEffect } from "react";

const ChatVoice = () => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [voice, setVoice] = useState('');
  const [language, setLanguage] = useState('en');
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await fetch('/api/getVoices');
        const data = await response.json();
        if (data.success) {
          setVoices(data.voices);
          // Set default voice if not set
          if (data.voices.length > 0) {
            setVoice(data.voices[0].id);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des voix:', error);
      }
    };

    fetchVoices();
  }, []);

  const handleGenerateVoice = async () => {
    setLoading(true);
    try {
      const correctionResponse = await fetch('/api/correctText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, language }),
      });

      const correctionData = await correctionResponse.json();
      const correctedText = correctionData.correctedText;

      const response = await fetch('/api/generateVoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: correctedText, voice, language }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate voice');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error('Erreur de synthèse vocale:', error);
      setLoading(false);
    }
  };

  const playSample = async (sampleUrl) => {
    setLoading(true);
    setAudioUrl('');
    setAudioUrl(sampleUrl);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900">
      {loading && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="text-white text-2xl">Chargement...</div>
        </div>
      )}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Entrez votre texte ici"
        className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full mb-4"
        disabled={loading}
      />
      <select
        value={voice}
        onChange={(e) => setVoice(e.target.value)}
        className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full mb-4"
        disabled={loading}
      >
        {voices.map((v) => (
          <option key={v.id} value={v.id}>{v.name}</option>
        ))}
      </select>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full mb-4"
        disabled={loading}
      >
        {['en', 'fr', 'es', 'de', 'zh'].map((lang) => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
      <button
        onClick={handleGenerateVoice}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
        disabled={loading}
      >
        {loading ? 'Chargement...' : 'Générer Voix'}
      </button>
      {audioUrl && (
        <audio
          controls
          src={audioUrl}
          className="mt-4"
          autoPlay
          onLoadStart={() => setLoading(true)}
          onCanPlay={() => setLoading(false)}
        >
          Votre navigateur ne supporte pas l&apos;élément audio.
        </audio>
      )}

      <div className="mt-8">
        <h3 className="text-xl text-white mb-4">Échantillons de voix</h3>
        <div className="flex flex-wrap gap-4">
          {voices.map((v) => (
            <button
              key={v.id}
              onClick={() => playSample(v.url)}
              className={`p-2 text-white rounded ${v.gender === 'male' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-pink-500 hover:bg-pink-600'}`}
              disabled={loading}
            >
              {v.name} ({v.gender === 'male' ? 'Masculin' : 'Féminin'})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatVoice;
