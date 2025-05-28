import React from 'react';
import { useAppContext, AppProvider } from './context/AppContext';
import StartPage from './components/StartPage';
import SlotMachinePage from './components/SlotMachinePage';
import ResultPage from './components/ResultPage';
import FinalPage from './components/FinalPage';
import GlobalUI from './components/GlobalUI';
import TransitionWrapper from './components/TransitionWrapper';

const AppContent: React.FC = () => {
  const { state } = useAppContext();

  const renderPage = () => {
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

  return (
    <>
      <GlobalUI />
      <TransitionWrapper stateKey={state}>
        {renderPage()}
      </TransitionWrapper>
    </>
  );
};

const App: React.FC = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;
