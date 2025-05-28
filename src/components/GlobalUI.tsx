import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import './GlobalUI.css';

const GlobalUI: React.FC = () => {
  const { state } = useAppContext();

  useEffect(() => {
    const ui = document.getElementById('global-ui');
    if (!ui) return;

    const defaultBoxClass = "global-ui";

    switch (state) {
      case 'start': {
        ui.className = defaultBoxClass + " start-box";
        setClassNameOfAllLines("start-line");
        resetSpecialAnimations();
        return;
      }
      case 'slot': {
        ui.className = defaultBoxClass + " slot-box";
        setClassNameOfAllLines("slot-line");
        resetSpecialAnimations();
        return;
      }
      case 'result': {
        ui.className = defaultBoxClass + " start-box";
        setClassNameOfAllLines("result-line");

        // special animations
        document.getElementById('v1')?.classList.add('fade-out');
        document.getElementById('v2')?.classList.add('fade-out');
        document.getElementById('h1')?.classList.add('move-up');
        document.getElementById('h2')?.classList.add('move-down')
        return;
      }
      case 'final':
        resetSpecialAnimations();
        return;
    }
  }, [state]);

  const resetSpecialAnimations = () => {
    document.getElementById('v1')?.classList.remove('fade-out');
    document.getElementById('v2')?.classList.remove('fade-out');
    document.getElementById('h1')?.classList.remove('move-up');
    document.getElementById('h2')?.classList.remove('move-down');
  };

  const setClassNameOfAllLines = (className: string) => {
    const defaultLineClass = "line"
    const verticalLines = document.getElementsByClassName("vertical-line")
    const horizontalLines = document.getElementsByClassName("horizontal-line")

    setClassNameOfAll(verticalLines, `${defaultLineClass} vertical-line ${className}`)
    setClassNameOfAll(horizontalLines, `${defaultLineClass} horizontal-line ${className}`)
  }

  const setClassNameOfAll = (elements: HTMLCollection, className: string) => {
    for (let i = 0; i < elements.length; i++) {
      elements[i].className = className;
    }

  }

  return (
    <div id="global-ui" className="global-ui">
      <div id="v1" className="vertical-line line"></div>
      <div id="v2" className="vertical-line line"></div>
      <div id="v3" className="vertical-line line"></div>
      <div id="v4" className="vertical-line line"></div>
      <div id="h1" className="horizontal-line line"></div>
      <div id="h2" className="horizontal-line line"></div>
    </div>
  );
};

export default GlobalUI;
