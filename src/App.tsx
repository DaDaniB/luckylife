import React from 'react';
import { AppProvider } from './context/AppContext';
import StartPage from './components/StartPage';
import SlotMachinePage from './components/SlotMachinePage';
import ResultPage from './components/ResultPage';
import FinalPage from './components/FinalPage';
import GlobalUI from './components/GlobalUI';

import { useAppContext } from './context/AppContext';

const AppContent: React.FC = () => {
  const { state } = useAppContext();

  switch (state) {
    case 'start':
      return <StartPage />;
    case 'slot':
      return <SlotMachinePage />;
    case 'result':
      return <ResultPage />;
    case 'final':
      return <FinalPage />;
    default:
      return null;
  }
};

const App: React.FC = () => (
  <AppProvider>
    <GlobalUI />
    <AppContent />
  </AppProvider>
);

export default App;
