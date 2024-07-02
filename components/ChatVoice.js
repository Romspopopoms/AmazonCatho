import React, { useState } from "react";
import OpenAI from "openai";

const ChatVoice = () => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [voice, setVoice] = useState('onyx');
  const [language, setLanguage] = useState('en');

  const voices = [
    { name: 'Alloy', id: 'alloy' },
    { name: 'Echo', id: 'echo' },
    { name: 'Fable', id: 'fable' },
    { name: 'Onyx', id: 'onyx' },
    { name: 'Nova', id: 'nova' },
    { name: 'Shimmer', id: 'shimmer' }
  ];

  const languages = [
    { code: 'en', name: 'Anglais' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Espagnol' },
    { code: 'de', name: 'Allemand' },
    { code: 'zh', name: 'Chinois' }
    // Ajouter d'autres langues courantes ici
  ];

  const handleGenerateVoice = async () => {
    setLoading(true);
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
    try {
      const response = await openai.audio.speech.create({
        model: "tts-1-hd",
        voice: voice,
        input: text,
        language: language
      });
      const buffer = Buffer.from(await response.arrayBuffer());
      const blob = new Blob([buffer], { type: 'audio/mp3' });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error('Erreur de synthèse vocale:', error);
    }
    setLoading(false);
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
          <option key={v.id} value={v.id}>{v.name}</option>
        ))}
      </select>
      <select value={language} onChange={(e) => setLanguage(e.target.value)} className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full">
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>{lang.name}</option>
        ))}
      </select>
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
    </div>
  );
};

export default ChatVoice;
