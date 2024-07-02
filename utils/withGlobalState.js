// utils/withGlobalState.js
const React = require('react');
const { useContext } = require('react');
const { GlobalStateProvider, GlobalStateContext } = require('../context/GlobalStateContext');

const withGlobalState = (Component) => {
  return function WrappedComponent(props) {
    return (
      <GlobalStateProvider>
        <Component {...props} />
      </GlobalStateProvider>
    );
  };
};

const HandleUserInputWithGlobalState = ({ userId, userInput, step, platform, category, profile, excludedTypes, resolve, reject }) => {
  const { plans, setPlans, selectedPlan, setSelectedPlan } = useContext(GlobalStateContext);
  
  handleUserInput(userId, userInput, step, platform, category, profile, excludedTypes, { plans, setPlans, selectedPlan, setSelectedPlan })
    .then(resolve)
    .catch(reject);

  return null;
};

module.exports = { withGlobalState, HandleUserInputWithGlobalState };
