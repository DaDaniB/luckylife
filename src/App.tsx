import { useState } from "react";
import { decisionTree } from "./data/decisionTree";
import type { Decision } from "./types";
import { StartScreen } from "./components/StartScreen";
import { QuestionScreen } from "./components/QuestionScreen";
import { FinishScreen } from "./components/FinishScreen";
import { DecisionFooter } from "./components/DecisionFooter";
import { useInactivityTimer } from "./hooks/useInactivityTimer";

const App = () => {
  const [step, setStep] = useState(0);
  const [decisions, setDecisions] = useState<Decision[]>([]);

  const restart = () => {
    setStep(0);
    setDecisions([]);
  };

  const handleNext = (decision: Decision) => {
    setDecisions([...decisions, decision]);
    setStep(step + 1);
  };

  const inactivityWarning = useInactivityTimer(restart);

  const inProgress = step > 0 && step <= decisionTree.length;
  const showRestart = decisions.length > 0;
  const showFooter = decisions.length > 0;

  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      {showRestart && (
        <button
          onClick={restart}
          className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded z-10"
        >
          Restart
        </button>
      )}

      {inactivityWarning && (
        <div className="fixed top-0 left-0 w-full text-center bg-yellow-300 py-2 font-bold z-10">
          No activity detected. Returning to start soon...
        </div>
      )}

      {step === 0 ? (
        <StartScreen onStart={() => setStep(1)} />
      ) : step <= decisionTree.length ? (
        <QuestionScreen
          question={decisionTree[step - 1]}
          decisions={decisions}
          onNext={handleNext}
        />
      ) : (
        <FinishScreen decisions={decisions} />
      )}

      {showFooter && <DecisionFooter decisions={decisions} />}
    </div>
  );
};

export default App;
