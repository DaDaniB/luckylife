import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { getFilteredAnswers } from '../utils/decisionUtils';
import decisionDataRaw from '../data/decision.json';
import type { DecisionTree } from '../types';
import './ResultPage.css'
import peopleImg from '../../imgs/RANDOM PEOPLE.jpg'
import star from '../../imgs/STERN.svg'
import { KEY } from '../constants/animation';

const decisionData: DecisionTree = decisionDataRaw;

const ResultPage: React.FC = () => {
  const { setState, currentSectionIndex, setCurrentSectionIndex, answers, setAnswers, resetTimer } = useAppContext();
  const [displayedQA, setDisplayedQA] = useState<{ question: string; answer: string }[]>([]);
  const totalSections = decisionData.sections.length;
  const progress = (currentSectionIndex / totalSections) * 100;
  const [isEndEarly, setIsEndEarly] = useState<boolean>(false)
  const shownAllQARef = useRef<boolean>(false)

  useEffect(() => {
    const filtered = getFilteredAnswers(currentSectionIndex, answers);
    let index = 0;

    const interval = setInterval(() => {
      if (index < filtered.length) {
        const question = filtered[index];
        const i = Math.floor(Math.random() * question.answers.length)
        const randomAnswer = question.answers[i];

        setDisplayedQA((prev) => [...prev, { question: question.question, answer: randomAnswer.answer }]);
        setAnswers({ ...answers, [question.question]: randomAnswer.answer });
        index++;

        if (randomAnswer.endflow) {
          shownAllQARef.current = true
          setIsEndEarly(true)
          clearInterval(interval)
          return
        }
      } else {
        shownAllQARef.current = true
        clearInterval(interval);
      }
    }, 1000); // Delay between displaying each Q&A

    const handleKeyPress = (event: KeyboardEvent) => {
      resetTimer()
      if (event.key === KEY && shownAllQARef.current) {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyPress)
    }

  }, []);

  const handleNext = () => {
    if (currentSectionIndex + 1 < decisionData.sections.length && !isEndEarly) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setState('slot');
    } else {
      setState('final');
    }
  };

  return (
    <div className='resultpage'>
      <div className="title">{decisionData.sections[currentSectionIndex]?.title || "Age"}</div>
      <div className="answerbox">
        {displayedQA.map((qa, idx) => (
          <div key={idx}>
            <strong>{qa.question}</strong><br /> {qa.answer}
          </div>
        ))}
      </div>
      <div className="img-box">
        <div className="people-img-box">
          <img className='people-img' src={peopleImg} alt="random people" />
          <img className='people-img' src={peopleImg} alt="random people" />
          <img className='people-img' src={peopleImg} alt="random people" />
        </div>

        <img id="result-star-1" className='star-img' src={star} alt="stern" />
        <img id="result-star-2" className='star-img' src={star} alt="stern" />
      </div>

      {/* <button id="result-next-btn" onClick={handleNext}>Next</button> */}
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
