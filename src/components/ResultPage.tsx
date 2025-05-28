import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { getFilteredAnswers } from '../utils/decisionUtils';
import decisionDataRaw from '../data/decision.json';
import type { DecisionTree } from '../types';
import './ResultPage.css'

const decisionData: DecisionTree = decisionDataRaw;

const ResultPage: React.FC = () => {
  const { setState, currentSectionIndex, setCurrentSectionIndex, answers, setAnswers } = useAppContext();
  const [displayedQA, setDisplayedQA] = useState<{ question: string; answer: string }[]>([]);
  const totalSections = decisionData.sections.length;
  const progress = (currentSectionIndex / totalSections) * 100;


  useEffect(() => {
    const filtered = getFilteredAnswers(currentSectionIndex, answers);
    let index = 0;

    const interval = setInterval(() => {
      if (index < filtered.length) {
        const question = filtered[index];
        const randomAnswer = question.answers[Math.floor(Math.random() * question.answers.length)];
        setDisplayedQA((prev) => [...prev, { question: question.question, answer: randomAnswer.answer }]);
        setAnswers({ ...answers, [question.question]: randomAnswer.answer });
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1000); // Delay between displaying each Q&A

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    if (currentSectionIndex + 1 < decisionData.sections.length) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setState('slot');
    } else {
      setState('final');
    }
  };

  return (
    <div>
      <h2>Results</h2>
      {displayedQA.map((qa, idx) => (
        <div key={idx}>
          <strong>{qa.question}</strong>: {qa.answer}
        </div>
      ))}
      <button onClick={handleNext}>Next</button>
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ResultPage;
