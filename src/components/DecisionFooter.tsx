import type { Decision } from "../types";
import './DecisionFooter.css'

type Props = { decisions: Decision[] };

export const DecisionFooter = ({ decisions }: Props) => (
  <div className="decision-list">
    <strong>Decisions:</strong>{" "}
    {decisions.map(d => d.resultLabel).join(" → ")}
  </div>
);
