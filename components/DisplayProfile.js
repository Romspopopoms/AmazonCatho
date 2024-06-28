import React from 'react';

const DisplayProfile = ({ profile }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg w-full max-w-md">
      <h2 className="text-2xl text-white mb-4">Profil Utilisateur</h2>
      <p className="text-white mb-2"><strong>Nom:</strong> {profile.name}</p>
      <p className="text-white mb-2"><strong>Type d&apos;`activité:</strong> {profile.activityType}</p>
      {profile.subActivityType && <p className="text-white mb-2"><strong>Sous-type d&apos;`activité:</strong> {profile.subActivityType}</p>}
      <p className="text-white mb-2"><strong>Public cible:</strong> {profile.targetAudience ? profile.targetAudience.join(', ') : ''}</p>
      <p className="text-white mb-2"><strong>Objectifs:</strong> {profile.goals ? profile.goals.join(', ') : ''}</p>
      <p className="text-white mb-2"><strong>Plateformes préférées:</strong> {profile.preferredPlatforms ? profile.preferredPlatforms.join(', ') : ''}</p>
      <p className="text-white mb-2"><strong>Types de contenu:</strong> {profile.contentTypes ? profile.contentTypes.join(', ') : ''}</p>
    </div>
  );
};

export default DisplayProfile;
