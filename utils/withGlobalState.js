const React = require('react');
const { useContext } = require('react');
const { GlobalStateProvider, GlobalStateContext } = require('../context/GlobalStateContext');

// Fonction wrapper sans JSX
const withGlobalState = (Component) => {
  return function WrappedComponent(props) {
    return React.createElement(
      GlobalStateProvider,
      null,
      React.createElement(Component, props)
    );
  };
};

// Composant pour gérer l'entrée utilisateur avec le contexte global
const HandleUserInputWithGlobalState = (props) => {
  const { plans, setPlans, selectedPlan, setSelectedPlan } = useContext(GlobalStateContext);
  
  // Appel de la fonction handleUserInput avec le contexte global
  handleUserInput(
    props.userId,
    props.userInput,
    props.step,
    props.platform,
    props.category,
    props.profile,
    props.excludedTypes,
    { plans, setPlans, selectedPlan, setSelectedPlan }
  ).then(props.resolve).catch(props.reject);

  return null;
};

module.exports = { withGlobalState, HandleUserInputWithGlobalState };
