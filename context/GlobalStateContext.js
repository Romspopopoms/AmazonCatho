const React = require('react');
const { createContext, useState } = React;

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <GlobalStateContext.Provider value={{ plans, setPlans, selectedPlan, setSelectedPlan }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

module.exports = { GlobalStateContext, GlobalStateProvider };
