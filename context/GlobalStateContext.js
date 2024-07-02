import React, { createContext, useState } from 'react';

// Crée le contexte global
const GlobalStateContext = createContext();

// Crée le fournisseur de contexte global
const GlobalStateProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <GlobalStateContext.Provider value={{ plans, setPlans, selectedPlan, setSelectedPlan }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };
