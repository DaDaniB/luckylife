import type { Decision } from "../types";

type Props = { decisions: Decision[] };

export const DecisionFooter = ({ decisions }: Props) => (
  <div className="fixed bottom-0 w-full bg-gray-100 p-4 border-t">
    <strong>Decisions:</strong>{" "}
    {decisions.map(d => d.resultLabel).join(" → ")}
  </div>
);
