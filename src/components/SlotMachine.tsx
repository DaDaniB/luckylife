import type { ResultOption } from "../types";

type Props = {
  options: ResultOption[];
  previousResults: string[];
  onResult: (result: ResultOption) => void;
};

export const SlotMachine = ({ options, previousResults, onResult }: Props) => {
  const getValidOptions = (): ResultOption[] =>
    options.filter(opt =>
      !opt.invalidatedBy?.some(id => previousResults.includes(id))
    );

  const spin = () => {
    const validOptions = getValidOptions();
    const total = validOptions.reduce((sum, opt) => sum + opt.probability, 0);
    const rand = Math.random() * total;
    let cumulative = 0;

    for (const opt of validOptions) {
      cumulative += opt.probability;
      if (rand <= cumulative) {
        onResult(opt);
        return;
      }
    }
  };

  return (
    <div className="text-center">
      <button onClick={spin} className="bg-green-500 text-white px-4 py-2 rounded">
        Spin Slot Machine
      </button>
    </div>
  );
};
