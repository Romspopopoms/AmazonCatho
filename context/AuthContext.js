import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (username, pass) => {
    setUser({ username });
    setPassword(pass);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setPassword(null);
    setIsLoggedIn(false);
  };

  const register = (username, pass) => {
    setUser({ username });
    setPassword(pass);
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{ user, password, isLoggedIn, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
