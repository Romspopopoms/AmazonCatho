// context/GlobalStateContext.js
const React = require('react');
const { createContext, useState } = React;

// Créez le contexte
const GlobalStateContext = createContext();

// Créez un fournisseur de contexte
const GlobalStateProvider = ({ children }) => {
  const [plans, setPlans] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <GlobalStateContext.Provider value={{ plans, setPlans, selectedPlan, setSelectedPlan }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

module.exports = { GlobalStateContext, GlobalStateProvider };
