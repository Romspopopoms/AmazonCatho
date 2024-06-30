import React from 'react';

const ProfileNavigation = ({ activeSection, setActiveSection }) => {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      <button
        className={`p-2 ${activeSection === 'profile' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'} rounded`}
        onClick={() => setActiveSection('profile')}
      >
        Informations du profil
      </button>
      <button
        className={`p-2 ${activeSection === 'images' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'} rounded`}
        onClick={() => setActiveSection('images')}
      >
        Images sauvegardées
      </button>
    </div>
  );
};

export default ProfileNavigation;
