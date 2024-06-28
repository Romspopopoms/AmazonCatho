import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useUserProfile } from '../context/UserProfileContext';

const ChatGPT = () => {
  const { profile } = useUserProfile();
  const [input, setInput] = useState('');
  const [platform, setPlatform] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [platformError, setPlatformError] = useState('');

  const parseIfNeeded = (data) => {
    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error('Failed to parse JSON:', error);
        return [];
      }
    }
    return data || [];
  };

  useEffect(() => {
    if (profile) {
      console.log('Profile received:', profile);

      const introMessage = `Bonjour ${profile.name}! Comment puis-je vous aider à atteindre vos objectifs aujourd'hui sur la plateforme de votre choix ?`;

      setMessages([{ role: 'bot', content: introMessage }]);
    }
  }, [profile]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input.trim() === '') return;

    if (platform === '') {
      setPlatformError('Veuillez sélectionner une plateforme de réseaux sociaux.');
      return;
    }

    setPlatformError('');
    const newMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input, platform, messages: updatedMessages, profile }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response from bot:', data);
      const botMessage = { role: 'bot', content: data.response };
      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error('Erreur de communication avec ChatGPT:', error);
    } finally {
      setLoading(false);
    }
  };

  const startNewConversation = () => {
    setConversations([...conversations, messages]);

    const introMessage = `Bonjour ${profile.name}! Comment puis-je vous aider à atteindre vos objectifs aujourd'hui sur la plateforme de votre choix ?`;

    setMessages([{ role: 'bot', content: introMessage }]);
    setPlatform('');
    setPlatformError('');
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white pt-16 font-sans">
      <div className="w-1/4 p-4 border-r border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Conversations</h2>
          <button onClick={startNewConversation} className="text-blue-500 hover:text-blue-600">
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </button>
        </div>
        <div className="space-y-2">
          {conversations.map((conv, index) => (
            <div key={index} className="p-2 bg-gray-800 rounded-lg">
              Conversation {index + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col p-4">
        <div className="flex items-center mb-4">
          <label className="mr-2 text-white">Plateforme:</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="p-2 bg-gray-900 text-white border border-gray-600 rounded"
          >
            <option value="">Sélectionnez une plateforme</option>
            {profile && Array.isArray(profile.preferredplatforms) && profile.preferredplatforms.map((platform) => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
        </div>
        {platformError && <p className="text-red-500 mb-4">{platformError}</p>}
        <div className="flex-1 bg-gray-800 p-4 rounded-lg mb-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 my-2 rounded-lg ${message.role === 'user' ? 'bg-blue-600 text-right' : 'bg-gray-700 text-left'}`}
            >
              {message.content.split('\n').map((str, i) => <p key={i}>{str}</p>)}
            </div>
          ))}
          {loading && (
            <div className="flex justify-center items-center my-2">
              <div className="loader border-t-4 border-blue-500 rounded-full w-6 h-6 animate-spin"></div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tapez votre message..."
            className="flex-1 p-2 border border-gray-600 rounded-l-lg focus:outline-none bg-gray-900 text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          >
            {loading ? 'Envoi...' : 'Envoyer'}
          </button>
        </form>
      </div>
      {profile && (
        <div className="w-1/4 p-4 border-l border-gray-700 bg-gray-800">
          <h2 className="text-xl font-bold text-blue-400 mb-4">Profil Utilisateur</h2>
          <p className="text-white mb-2"><strong>Nom:</strong> {profile.name}</p>
          <p className="text-white mb-2"><strong>Type d&apos;activité:</strong> {profile.activitytype}</p>
          {profile.subactivitytype && <p className="text-white mb-2"><strong>Sous-type d&apos;activité:</strong> {profile.subactivitytype}</p>}
          <p className="text-white mb-2"><strong>Public cible:</strong> {parseIfNeeded(profile.targetaudience).join(', ')}</p>
          <p className="text-white mb-2"><strong>Objectifs:</strong> {parseIfNeeded(profile.goals).join(', ')}</p>
          <p className="text-white mb-2"><strong>Plateformes préférées:</strong> {parseIfNeeded(profile.preferredplatforms).join(', ')}</p>
          <p className="text-white mb-2"><strong>Types de contenu:</strong> {parseIfNeeded(profile.contenttypes).join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default ChatGPT;
