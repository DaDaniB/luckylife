import React, { useEffect } from 'react';
import './FinalPage.css'
import endText from '../../imgs/BETTER LUCK NEXT LIFE.svg'
import star from '../../imgs/STERN.svg'
import gameOver from '../../imgs/GAME OVER.svg'
import { useAppContext } from '../context/AppContext';
import { KEY } from '../constants/animation';

const FinalPage: React.FC = () => {
  const { resetStateMachine } = useAppContext()

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === KEY) {
        resetStateMachine()
      }
    }

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  })

  return (
    <div className='end-page'>
      <img className='end-game-over' src={gameOver} alt="gameOver" />
      <img className='end-text' src={endText} alt="Better luck next life" />
      <img id="end-star-1" className='end-star-img' src={star} alt="Star" />
      <img id="end-star-2" className='end-star-img' src={star} alt="Star" />
      <img id="end-star-3" className='end-star-img' src={star} alt="Star" />
      <img id="end-star-4" className='end-star-img' src={star} alt="Star" />
    </div>
  );
};

export default FinalPage;
