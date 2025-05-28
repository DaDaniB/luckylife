import React from 'react';
import { useAppContext } from '../context/AppContext';
import './StartPage.css';

import '../../imgs/ZUGEFALLENES GLÜCK.svg'
import '../../imgs/ZUGEFALLENES GLÜCK.svg'

const StartPage: React.FC = () => {
  const { setState } = useAppContext();

  const handleStart = () => {
    setState('slot');
  };

  return (
    <div className="start-page">
      <img src="../../imgs/ZUGEFALLENES GLÜCK.svg" alt="Zugefallenes Glueck" />
      <p className="start-description">
        This interactive experience will guide you through a series of questions. Each answer may influence the next.
        Press "Start" to begin your journey.
      </p>
      <button className="start-button" onClick={handleStart}>
        Start
      </button>
    </div>
  );

};
export default StartPage;