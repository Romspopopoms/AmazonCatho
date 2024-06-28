import React, { createContext, useContext, useState, useEffect } from 'react';

const UserProfileContext = createContext();

export const useUserProfile = () => {
  return useContext(UserProfileContext);
};

export const UserProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  const fetchProfile = async (userId) => {
    try {
      const response = await fetch(`/api/getProfile?id=${userId}`);
      const data = await response.json();
      if (data.success) {
        setProfile(data.profile);
      }
    } catch (error) {
      console.error('Erreur de chargement du profil:', error);
    }
  };

  const saveProfile = async (profileData) => {
    try {
      const response = await fetch('/api/saveProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      const data = await response.json();
      if (data.success) {
        setProfile(profileData);
      }
    } catch (error) {
      console.error('Erreur de sauvegarde du profil:', error);
    }
  };

  return (
    <UserProfileContext.Provider value={{ profile, saveProfile, fetchProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};
