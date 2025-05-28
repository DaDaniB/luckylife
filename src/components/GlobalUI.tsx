import React from 'react';
import { useAppContext } from '../context/AppContext';
import './GlobalUI.css';

const GlobalUI: React.FC = () => {
  const { state } = useAppContext();

  return (
    <div className="global-ui">
      <span className="state-indicator">App State: {state.toUpperCase()}</span>
      {/* Add any other globally visible elements here */}
    </div>
  );
};

export default GlobalUI;
