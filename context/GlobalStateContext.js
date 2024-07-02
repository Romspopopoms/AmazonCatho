// context/GlobalStateContext.js
import React, { createContext, useState } from 'react';

// Créez le contexte
export const GlobalStateContext = createContext();

// Créez un fournisseur de contexte
export const GlobalStateProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <GlobalStateContext.Provider value={{ plans, setPlans, selectedPlan, setSelectedPlan }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
