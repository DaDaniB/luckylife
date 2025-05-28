import React, {useEffect} from 'react';
import { useAppContext } from '../context/AppContext';
import './StartPage.css';

import titleSVG from '../../imgs/ZUGEFALLENES GLÜCK.svg'
import AugeImg from '../../imgs/AUGEN.jpg'
import PeopleImg from '../../imgs/RANDOM PEOPLE.jpg'
import PTLSVG from '../../imgs/PLAY THROUGH LIFE.svg'
import StarSVG from '../../imgs/STERN.svg'
import { KEY } from '../constants/animation';

const StartPage: React.FC = () => {
  const { setState, resetTimer } = useAppContext();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === KEY) {
        handleStart()
      }
    }

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  })



  const handleStart = () => {
    resetTimer()
    setState('slot');
  };

  return (
    <div className="start-page">
      <img className='title-img' src={titleSVG} alt="Zugefallenes Glueck" />
      <div className="img-container">
        <div className="auge-img-container">
          <img src={AugeImg} alt="Eyes" />
          <img src={AugeImg} alt="Eyes" />
          <img src={AugeImg} alt="Eyes" />
          <img src={AugeImg} alt="Eyes" />
        </div>
        <div className="people-img-container">
          <img src={PeopleImg} alt="People Walking" />
          <img src={PeopleImg} alt="People Walking" />
          <img src={PeopleImg} alt="People Walking" />
        </div>
        <div className="star-img-container">
          <img id='star-1' src={StarSVG} alt="Stern" />
          <img id='star-2' src={StarSVG} alt="Stern" />
          <img id='star-3' src={StarSVG} alt="Stern" />
          <img id='star-4' src={StarSVG} alt="Stern" />
        </div>
        <p id="zcTEXT">zufallsbedingte chancenungleichheit</p>
        <p id="woTEXT">which one???</p>
        <p id="wjbdTEXT">wieviele jackpots brauchst du?</p>
      </div>
      <img className="ptl-img" src={PTLSVG} alt="play through life" />

    </div>
  );

};
export default StartPage;