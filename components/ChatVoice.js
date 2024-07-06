import React, { useState, useEffect } from "react";

const ChatVoice = () => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [voice, setVoice] = useState('');
  const [language, setLanguage] = useState('en');
  const [voices, setVoices] = useState([]);
  const [responseFormat, setResponseFormat] = useState('mp3');
  const [speed, setSpeed] = useState(1.0);
  
  const responseFormats = ['mp3', 'opus', 'aac', 'flac', 'wav', 'pcm'];

  useEffect(() => {
    const validVoices = ['nova', 'shimmer', 'echo', 'onyx', 'fable', 'alloy'];
    const fetchVoices = async () => {
      try {
        const response = await fetch('/api/getVoices');
        const data = await response.json();
        if (data.success) {
          // Filtrer les voix pour n'inclure que celles qui sont valides
          const filteredVoices = data.voices.filter(v => validVoices.includes(v.name));
          setVoices(filteredVoices);
          // Set default voice if not set
          if (filteredVoices.length > 0) {
            setVoice(filteredVoices[0].name);
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
        body: JSON.stringify({ text: correctedText, voice, language, response_format: responseFormat, speed }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate voice');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error('Erreur de synthèse vocale:', error);
    }
    setLoading(false);
  };

  const playSample = (sampleUrl) => {
    setAudioUrl(sampleUrl);
  };

  return (
    <div className="relative flex flex-col items-center justify-center mt-40 xl:mt-28 gap-y-8">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Entrez votre texte ici"
        className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full"
      />
      <select value={voice} onChange={(e) => setVoice(e.target.value)} className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full">
        {voices.map((v) => (
          <option key={v.id} value={v.name}>{v.name}</option>
        ))}
      </select>
      <select value={language} onChange={(e) => setLanguage(e.target.value)} className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full">
        {['en', 'fr', 'es', 'de', 'zh'].map((lang) => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
      <select value={responseFormat} onChange={(e) => setResponseFormat(e.target.value)} className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full">
        {responseFormats.map((format) => (
          <option key={format} value={format}>{format}</option>
        ))}
      </select>
      <input
        type="number"
        value={speed}
        onChange={(e) => setSpeed(parseFloat(e.target.value))}
        step="0.1"
        min="0.25"
        max="4.0"
        className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full"
        placeholder="Vitesse (0.25 à 4.0)"
      />
      <button
        onClick={handleGenerateVoice}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Chargement...' : 'Générer Voix'}
      </button>
      {audioUrl && (
        <audio controls src={audioUrl} className="mt-4">
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
