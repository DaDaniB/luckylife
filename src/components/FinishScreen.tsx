import type { Decision } from "../types";
import './FinishScreen.css'

type Props = {
  decisions: Decision[];
};

export const FinishScreen = ({ decisions }: Props) => {
  const finalSummary = decisions.some(d => d.resultId === "green")
    ? "You seem to prefer calm and nature."
    : "You have a dynamic and energetic personality!";

  return (
    <div className="p-8 text-center">
      <h2 className="finish-header">All Done!</h2>
      <p className="mb-4">Here's a summary of your choices:</p>
      <ul className="mb-4">
        {decisions.map((d, i) => (
          <li key={i}>{d.questionText}: {d.resultLabel}</li>
        ))}
      </ul>
      <p className="text-lg font-bold">{finalSummary}</p>
    </div>
  );
};
