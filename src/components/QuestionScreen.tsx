import type { QuestionNode, Decision } from "../types";
import { SlotMachine } from "./SlotMachine";

type Props = {
  question: QuestionNode;
  decisions: Decision[];
  onNext: (decision: Decision) => void;
};

export const QuestionScreen = ({ question, decisions, onNext }: Props) => (
  <div className="p-8">
    <h2 className="text-2xl font-semibold mb-4">{question.question}</h2>
    <SlotMachine
      options={question.options}
      previousResults={decisions.map(d => d.resultId)}
      onResult={(result) => {
        onNext({
          questionId: question.id,
          questionText: question.question,
          resultId: result.id,
          resultLabel: result.label,
        });
      }}
    />
  </div>
);
