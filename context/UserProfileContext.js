import React, { createContext, useContext, useState } from 'react';

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

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
        fetchProfile(data.id);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const fetchProfile = async (id) => {
    try {
      const response = await fetch(`/api/getProfile?id=${id}`);
      const data = await response.json();
      if (data.success) {
        const profileData = data.profile;
        setProfile(profileData);
        return profileData;
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <UserProfileContext.Provider value={{ profile, saveProfile, fetchProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
