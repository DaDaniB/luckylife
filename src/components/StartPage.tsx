import React, {useEffect} from 'react';
import { useAppContext } from '../context/AppContext';
import './StartPage.css';

import titleSVG from '../../imgs/ZUGEFALLENES GLÜCK.svg'
import AugeImg from '../../imgs/AUGEN NEU.jpeg'
import PeopleImg from '../../imgs/RANDOM PEOPLE NEU.png'
import PTLSVG from '../../imgs/PLAY THROUGH LIFE.svg'
import StarSVG from '../../imgs/STERN.svg'
import { KEY } from '../constants/animation';
import startSoundFile from '../../sound/TITLE SCREEN.wav'

const StartPage: React.FC = () => {
  const { setState, resetTimer } = useAppContext();

  useEffect(() => {
    const startSound = new Audio(startSoundFile)
    startSound.currentTime = 0;
    startSound.loop = true;
    startSound.play().catch(e => console.warn('start sound failed', e));
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === KEY) {
        startSound.pause();
        startSound.currentTime = 0;
        handleStart()
      }
    }

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      startSound.pause();
      startSound.currentTime = 0;
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
        <p className='small-text' id="zcTEXT">zufallsbedingte chancenungleichheit</p>
        <p className='small-text' id="woTEXT">wieviele glücksfälle brauchst du?</p>
        <p className='small-text' id="wjbdTEXT">im spiel des lebens</p>
      </div>
      <img className="ptl-img" src={PTLSVG} alt="play through life" />

    </div>
  );

};
export default StartPage;