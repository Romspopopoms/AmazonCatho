// utils/withGlobalState.js
import React, { useContext } from 'react';
import { GlobalStateProvider, GlobalStateContext } from '../context/GlobalStateContext';

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

export { withGlobalState, HandleUserInputWithGlobalState };
