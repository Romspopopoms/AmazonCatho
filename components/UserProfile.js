import React, { useState } from 'react';

const UserProfile = ({ saveProfile }) => {
  const [name, setName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [goals, setGoals] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const profileData = { name, businessType, targetAudience, goals };
    saveProfile(profileData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg">
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
        <label className="block text-white mb-2">Type d&apos;entreprise:</label>
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
      <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Sauvegarder</button>
    </form>
  );
};

export default UserProfile;
