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

  useEffect(() => {
    if (profile) {
      console.log('Profile received:', profile);
      const targetAudience = Array.isArray(profile.targetAudience) ? profile.targetAudience.join(', ') : 'cible';
      const goals = Array.isArray(profile.goals) ? profile.goals.join(', ') : 'objectifs';
      const introMessage = `Bonjour ${profile.name}! Vous êtes en forme? 😊 
      Pour quelle plateforme souhaitez-vous créer du contenu aujourd'hui ?`;
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
    const introMessage = `Bonjour ${profile.name}! Je suis votre créateur de contenu pour les réseaux sociaux. Pour quelle plateforme souhaitez-vous créer du contenu aujourd'hui ?`;
    setMessages([{ role: 'bot', content: introMessage }]);
    setPlatform('');
    setPlatformError('');
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white pt-16">
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
            <option value="Instagram">Instagram</option>
            <option value="TikTok">TikTok</option>
            <option value="Facebook">Facebook</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
        </div>
        {platformError && <p className="text-red-500 mb-4">{platformError}</p>}
        <div className="flex-1 bg-gray-800 p-4 rounded-lg mb-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 my-2 rounded-lg ${message.role === 'user' ? 'bg-blue-600 text-right' : 'bg-gray-700 text-left'}`}
            >
              {message.content}
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
    </div>
  );
};

export default ChatGPT;
