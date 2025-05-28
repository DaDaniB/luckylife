import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import type { ReactNode } from 'react'


const TIMEOUT = 60000

type AppState = 'start' | 'slot' | 'result' | 'final';

interface AppContextProps {
  state: AppState;
  setState: (state: AppState) => void;
  currentSectionIndex: number;
  setCurrentSectionIndex: (index: number) => void;
  answers: Record<string, string>;
  setAnswers: (answers: Record<string, string>) => void;
  resetTimer: () => void;
  resetStateMachine: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>('start');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ⏳ Reset function
  const resetStateMachine = () => {
    setState('start');
    setCurrentSectionIndex(0);
    setAnswers({});
  };

  // 🔁 Reset timer
  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      resetStateMachine();
    }, TIMEOUT); // 1 minute
  };

  // Start/reset timer on mount and when state changes
  useEffect(() => {
    resetTimer();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [state]);

  const contextValue = {
    state,
    setState,
    currentSectionIndex,
    setCurrentSectionIndex,
    answers,
    setAnswers,
    resetTimer,
    resetStateMachine
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};