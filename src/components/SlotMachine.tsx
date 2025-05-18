import React, { useEffect, useState, useRef } from "react";
import "./SlotMachine.css";
import type { ResultOption } from "../types";

type Props = {
  options: ResultOption[];
  previousResults: string[];
  onResult: (result: ResultOption) => void;
};

export const SlotMachine = ({ options, previousResults, onResult }: Props) => {
  const [spinning, setSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [result, setResult] = useState<ResultOption | null>(null);
  const [showModal, setShowModal] = useState(false);

  const reelRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const getValidOptions = (): ResultOption[] =>
    options.filter((opt) => !opt.invalidatedBy?.some((id) => previousResults.includes(id)));

  function shuffle<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function pickRandom<T>(array: T[]): T {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
  }

  const weightedRandom = (opts: ResultOption[]): ResultOption => {
    const total = opts.reduce((sum, o) => sum + o.probability, 0);
    const r = Math.random() * total;
    let acc = 0;
    for (const opt of opts) {
      acc += opt.probability;
      if (r <= acc) return opt;
    }
    return opts[0];
  };

  // Fill initial reel content on load
  useEffect(() => {
    const validOptions = getValidOptions();

    reelRefs.forEach((ref, index) => {
      if (!ref.current) return;

      const reel = ref.current;
      const repetitions = 10 + index * 3;
      const fullList = shuffle(Array.from({ length: repetitions }, () => validOptions).flat());

      reel.innerHTML = fullList
        .map((opt) => `<div class="reel-item">${opt.label}</div>`)
        .join("");

      reel.style.transition = "none";
      reel.style.transform = `translateY(0px)`;
    });
  }, [options, previousResults]);

  const handleSpin = () => {
    if (spinning || hasSpun) return;

    const validOptions = getValidOptions();
    const chosen = weightedRandom(validOptions);
    setResult(null);
    setSpinning(true);
    setHasSpun(true);

    reelRefs.forEach((ref, index) => {
      if (!ref.current) return;

      const reel = ref.current;
      const repetitions = 10 + index * 3;
      const fullList = shuffle(Array.from({ length: repetitions }, () => validOptions).flat());
      const randomLast = pickRandom(fullList);
      const fullListWithResult = [...fullList, chosen, randomLast];

      reel.innerHTML = fullListWithResult
        .map((opt) => `<div class="reel-item">${opt.label}</div>`)
        .join("");

      reel.style.transition = "none";
      reel.style.transform = "translateY(0)";
      void reel.offsetHeight;

      const offset = -(fullListWithResult.length - 3) * 40;
      reel.style.transition = `transform ${1.5 + index * 0.5}s cubic-bezier(0.2, 0.6, 0.4, 1)`;
      reel.style.transform = `translateY(${offset}px)`;
    });

    setTimeout(() => {
      setSpinning(false);
      setResult(chosen);

      // Delay before showing modal
      setTimeout(() => setShowModal(true), 500);
    }, 3000);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setHasSpun(false); // allow new decision
    if (result) onResult(result); // advance to next question
    setResult(null);
  };

  return (
    <div className="text-center">
      <div className="slot-machine-container">
        {reelRefs.map((ref, i) => (
          <div key={i} className="reel">
            <div className="reel-content" ref={ref} />
          </div>
        ))}
      </div>

      <button
        onClick={handleSpin}
        disabled={spinning || hasSpun}
        style={{
          marginTop: "30px",
          fontSize: "1.3rem",
          padding: "1rem 2rem",
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          cursor: spinning || hasSpun ? "not-allowed" : "pointer",
          opacity: spinning || hasSpun ? 0.5 : 1,
        }}
      >
        {spinning ? "Spinning..." : "Spin Slot Machine"}
      </button>

      {showModal && result && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>🎉 Result: {result.label}</h2>
            <p>{result.description ?? "This will guide your next decision."}</p>
            <button onClick={handleModalClose}>Okay</button>
          </div>
        </div>
      )}
    </div>
  );
};
