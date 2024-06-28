import React, { useState } from 'react';

const UserProfile = ({ saveProfile }) => {
  const [name, setName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [goals, setGoals] = useState('');
  const [preferredPlatforms, setPreferredPlatforms] = useState([]);
  const [contentTypes, setContentTypes] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const profileData = {
      name,
      businessType,
      targetAudience,
      goals,
      preferredPlatforms,
      contentTypes,
      experienceLevel,
    };
    saveProfile(profileData);
  };

  const handleCheckboxChange = (event, setState) => {
    const value = event.target.value;
    setState(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg w-full max-w-md">
      <h2 className="text-2xl text-white mb-4">Profil Utilisateur</h2>
      <div className="mb-4">
        <label className="block text-white mb-2">Nom:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Type d`&apos;entreprise:</label>
        <input
          type="text"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Public cible:</label>
        <input
          type="text"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Objectifs:</label>
        <input
          type="text"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Plateformes préférées:</label>
        <div className="flex flex-wrap gap-2">
          {['Instagram', 'TikTok', 'Facebook', 'LinkedIn', 'Twitter'].map(platform => (
            <label key={platform} className="flex items-center text-white">
              <input
                type="checkbox"
                value={platform}
                onChange={(e) => handleCheckboxChange(e, setPreferredPlatforms)}
                className="mr-2"
              />
              {platform}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Types de contenu:</label>
        <div className="flex flex-wrap gap-2">
          {['Posts', 'Reels', 'Carrousels', 'Stories', 'Lives'].map(contentType => (
            <label key={contentType} className="flex items-center text-white">
              <input
                type="checkbox"
                value={contentType}
                onChange={(e) => handleCheckboxChange(e, setContentTypes)}
                className="mr-2"
              />
              {contentType}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Niveau d`&apos;expérience:</label>
        <select
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
          className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full"
          required
        >
          <option value="">Sélectionnez votre niveau d`&apos;expérience</option>
          <option value="Débutant">Débutant</option>
          <option value="Intermédiaire">Intermédiaire</option>
          <option value="Avancé">Avancé</option>
          <option value="Expert">Expert</option>
        </select>
      </div>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full">Sauvegarder</button>
    </form>
  );
};

export default UserProfile;
