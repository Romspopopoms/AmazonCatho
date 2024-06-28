import React from 'react';

const DisplayProfile = ({ profile }) => {
  // Parse JSON fields if necessary
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

  const targetAudience = parseIfNeeded(profile.targetaudience);
  const goals = parseIfNeeded(profile.goals);
  const preferredPlatforms = parseIfNeeded(profile.preferredplatforms);
  const contentTypes = parseIfNeeded(profile.contenttypes);

  return (
    <div className="p-4 bg-gray-800 rounded-lg w-full max-w-md">
      <h2 className="text-2xl text-white mb-4">Profil Utilisateur</h2>
      <p className="text-white mb-2"><strong>Nom:</strong> {profile.name}</p>
      <p className="text-white mb-2"><strong>Type d&apos;ctivité:</strong> {profile.activitytype}</p>
      {profile.subactivitytype && <p className="text-white mb-2"><strong>Sous-type d&apos;activité:</strong> {profile.subactivitytype}</p>}
      <p className="text-white mb-2"><strong>Public cible:</strong> {targetAudience.join(', ')}</p>
      <p className="text-white mb-2"><strong>Objectifs:</strong> {goals.join(', ')}</p>
      <p className="text-white mb-2"><strong>Plateformes préférées:</strong> {preferredPlatforms.join(', ')}</p>
      <p className="text-white mb-2"><strong>Types de contenu:</strong> {contentTypes.join(', ')}</p>
    </div>
  );
};

export default DisplayProfile;
