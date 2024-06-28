import React, { createContext, useContext, useState } from 'react';

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  const saveProfile = (profileData) => {
    setProfile(profileData);
  };

  return (
    <UserProfileContext.Provider value={{ profile, saveProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
