import React from 'react';

const DisplayProfile = ({ profile }) => {
  // Parse JSON fields
  const targetAudience = profile.targetaudience ? JSON.parse(profile.targetaudience) : [];
  const goals = profile.goals ? JSON.parse(profile.goals) : [];
  const preferredPlatforms = profile.preferredplatforms ? JSON.parse(profile.preferredplatforms) : [];
  const contentTypes = profile.contenttypes ? JSON.parse(profile.contenttypes) : [];

  return (
    <div className="p-4 bg-gray-800 rounded-lg w-full max-w-md">
      <h2 className="text-2xl text-white mb-4">Profil Utilisateur</h2>
      <p className="text-white mb-2"><strong>Nom:</strong> {profile.name}</p>
      <p className="text-white mb-2"><strong>Type d&apos;activité:</strong> {profile.activitytype}</p>
      {profile.subactivitytype && <p className="text-white mb-2"><strong>Sous-type d&apos;activité:</strong> {profile.subactivitytype}</p>}
      <p className="text-white mb-2"><strong>Public cible:</strong> {targetAudience.join(', ')}</p>
      <p className="text-white mb-2"><strong>Objectifs:</strong> {goals.join(', ')}</p>
      <p className="text-white mb-2"><strong>Plateformes préférées:</strong> {preferredPlatforms.join(', ')}</p>
      <p className="text-white mb-2"><strong>Types de contenu:</strong> {contentTypes.join(', ')}</p>
    </div>
  );
};

export default DisplayProfile;
