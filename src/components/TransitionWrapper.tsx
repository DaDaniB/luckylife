import React, { useEffect, useState } from 'react';
import './TransitionWrapper.css';
import { FADE_DURATION_MS } from '../constants/animation';

interface Props {
  children: React.ReactNode;
  stateKey: string;
}

const TransitionWrapper: React.FC<Props> = ({ children, stateKey }) => {
  const [renderedChildren, setRenderedChildren] = useState(children);
  const [fadeState, setFadeState] = useState<'fade-in' | 'fade-out' | 'none'>(
    stateKey === 'start' ? 'none' : 'fade-in'
  );

  useEffect(() => {
    if (stateKey === 'start') {
      setRenderedChildren(children);
      setFadeState('none');
      return;
    }

    setFadeState('fade-out');

    const timeout = setTimeout(() => {
      setRenderedChildren(children);
      setFadeState('fade-in');
    }, FADE_DURATION_MS / 2); // Match fade-out duration

    return () => clearTimeout(timeout);
  }, [stateKey]);

  return (
    <div className={`transition-wrapper ${fadeState}`}>
      {renderedChildren}
    </div>
  );
};

export default TransitionWrapper;
