import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useUserProfile } from '../context/UserProfileContext';
import { GlobalStateContext } from '../context/GlobalStateContext';

const ChatGPT = () => {
  const { profile } = useUserProfile();
  const { plans, setPlans, selectedPlan, setSelectedPlan } = useContext(GlobalStateContext);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('');
  const [platform, setPlatform] = useState('');
  const [conversations, setConversations] = useState([[]]);
  const [currentConversation, setCurrentConversation] = useState(0);
  const [loading, setLoading] = useState(false);
  const [categoryError, setCategoryError] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (profile) {
      console.log('Profile received:', profile);
      const introMessage = `Bonjour ${profile.name}! Sur quelle plateforme souhaitez-vous créer du contenu aujourd'hui ?`;
      setConversations([[{ role: 'bot', content: introMessage }]]);
    }
  }, [profile]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input.trim() === '') return;

    if (category === '') {
      setCategoryError('Veuillez sélectionner une catégorie.');
      return;
    }

    setCategoryError('');
    const newMessage = { role: 'user', content: input };
    const updatedMessages = [...conversations[currentConversation], newMessage];
    const updatedConversations = [...conversations];
    updatedConversations[currentConversation] = updatedMessages;
    setConversations(updatedConversations);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          platform,
          category,
          messages: updatedMessages,
          step: updatedMessages.length,
          profile,
          plans,
          selectedPlan,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response from bot:', data);
      const botMessage = { role: 'bot', content: data.response };
      updatedConversations[currentConversation] = [...updatedMessages, botMessage];
      setConversations(updatedConversations);
      setOptions(data.options || []);

      // Mise à jour des plans et du plan sélectionné dans le contexte global
      if (data.plans) setPlans(data.plans);
      if (data.selectedPlan) setSelectedPlan(data.selectedPlan);

    } catch (error) {
      console.error('Erreur de communication avec ChatGPT:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (option) => {
    setInput(option);
    handleSubmit({ preventDefault: () => {} }); // Simulate form submission with the selected option
  };

  const startNewConversation = () => {
    const introMessage = `Bonjour ${profile.name}! Sur quelle plateforme souhaitez-vous créer du contenu aujourd'hui ?`;

    setConversations([...conversations, [{ role: 'bot', content: introMessage }]]);
    setCurrentConversation(conversations.length);
    setPlatform('');
    setCategory('');
    setCategoryError('');
    setOptions([]);
  };

  const deleteConversation = (index) => {
    const updatedConversations = conversations.filter((_, i) => i !== index);
    setConversations(updatedConversations);
    setCurrentConversation(0); // Reset to the first conversation if the current one is deleted
  };

  const selectConversation = (index) => {
    setCurrentConversation(index);
  };

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

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white">
      <div className="w-1/4 p-4 border-r border-gray-700 mt-16">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Conversations</h2>
          <button onClick={startNewConversation} className="text-blue-500 hover:text-blue-600">
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </button>
        </div>
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
        <div className="flex items-center mb-4">
          <label className="mr-2 text-white">Catégorie:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 bg-gray-900 text-white border border-gray-600 rounded"
          >
            <option value="">Sélectionnez une catégorie</option>
            <option value="plan_post_mois">Plan de post pour un mois</option>
            <option value="plan_post_semaine">Plan de post pour une semaine</option>
            <option value="mettre_en_avant_produit">Mettre en avant un produit</option>
            <option value="augmenter_visibilite">Augmenter la visibilité</option>
            <option value="generer_engagement">Générer de l&apos;engagement</option>
            <option value="developper_audience">Développer l&apos;audience</option>
          </select>
        </div>
        {categoryError && <p className="text-red-500 mb-4">{categoryError}</p>}
        <div className="flex-1 bg-gray-800 p-4 rounded-lg mb-4 overflow-y-auto">
          {conversations[currentConversation] && conversations[currentConversation].map((message, index) => (
            <div
              key={index}
              className={`p-2 my-2 rounded-lg ${message.role === 'user' ? 'bg-blue-600 text-right' : 'bg-gray-700 text-left'}`}
            >
              {message.content.split('\n').map((str, i) => <p key={i}>{str}</p>)}
            </div>
          ))}
          {options.length > 0 && (
            <div className="my-4">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg m-1 hover:bg-blue-600"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
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
        <div className="w-1/4 p-4 border-l border-gray-700 bg-gray-900">
          <h2 className="text-xl font-bold text-white mb-4">Profil Utilisateur</h2>
          <p className="text-white mb-2"><strong>Nom:</strong> {profile.name}</p>
          <p className="text-white mb-2"><strong>Type d&apos;activité:</strong> {profile.activityType}</p>
          {profile.subActivityType && <p className="text-white mb-2"><strong>Sous-type d&apos;activité:</strong> {profile.subActivityType}</p>}
          <p className="text-white mb-2"><strong>Public cible:</strong> {parseIfNeeded(profile.targetAudience).join(', ')}</p>
          <p className="text-white mb-2"><strong>Objectifs:</strong> {parseIfNeeded(profile.goals).join(', ')}</p>
          <p className="text-white mb-2"><strong>Plateformes préférées:</strong> {parseIfNeeded(profile.preferredPlatforms).join(', ')}</p>
          <p className="text-white mb-2"><strong>Types de contenu:</strong> {parseIfNeeded(profile.contentTypes).join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default ChatGPT;
