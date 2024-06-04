import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedLoggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(storedLoggedInStatus);
    }, []);
    
    const login = () => {
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
    };
    
    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };
    console.log("Is Logged In State:", isLoggedIn);


    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
