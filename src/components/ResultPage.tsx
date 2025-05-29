import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { getFilteredAnswers } from '../utils/decisionUtils';
import decisionDataRaw from '../data/decision.json';
import type { DecisionTree } from '../types';
import './ResultPage.css';
import peopleImg from '../../imgs/RANDOM PEOPLE.jpg';
import star from '../../imgs/STERN.svg';
import { KEY } from '../constants/animation';

const decisionData: DecisionTree = decisionDataRaw;

interface DisplayedText {
  question: string;
  answer: string;
  isEnd: boolean;
}

const ResultPage: React.FC = () => {
  const {
    setState,
    currentSectionIndex,
    setCurrentSectionIndex,
    answers,
    setAnswers,
    resetTimer
  } = useAppContext();

  const [displayedQA, setDisplayedQA] = useState<DisplayedText[]>([]);
  const [currentText, setCurrentText] = useState<string>('');
  const [fullAnswerList, setFullAnswerList] = useState<DisplayedText[]>([]);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isEndEarly, setIsEndEarly] = useState(false);
  const shownAllQARef = useRef(false);
  const answerBoxRef = useRef<HTMLDivElement>(null)

  const totalSections = decisionData.sections.length;
  const progress = (currentSectionIndex / totalSections) * 100;

  useEffect(() => {
    const filtered = getFilteredAnswers(currentSectionIndex, answers);
    const resultList: DisplayedText[] = [];

    filtered.forEach((q) => {
      const i = Math.floor(Math.random() * q.answers.length);
      const a = q.answers[i];
      if (a) {
        resultList.push({ question: q.question, answer: a.answer, isEnd: a.endflow ?? false });
        if (a.endflow) {
          setIsEndEarly(true);
        }
      }
    });

    setFullAnswerList(resultList);
  }, [currentSectionIndex]);

  useEffect(() => {
    if (displayIndex < fullAnswerList.length) {
      const nextQA = fullAnswerList[displayIndex];
      const fullText = `${nextQA.answer}`;
      let charIndex = -1;

      setIsTyping(true);
      setCurrentText('');
      let interval: number;
      setTimeout(() => {
        interval = setInterval(() => {
          if (charIndex < fullText.length - 1) {
            setCurrentText((prev) => prev + fullText[charIndex]);
            charIndex++;
          } else {
            clearInterval(interval);
            setDisplayedQA((prev) => [...prev, { question: nextQA.question, answer: fullText, isEnd: nextQA.isEnd }]);
            setAnswers((prev) => ({
              ...prev,
              [nextQA.question]: fullText
            }));

            setIsTyping(false);
            setTimeout(() => { setDisplayIndex((prev) => prev + 1); }, 500)
          }
        }, 30);
      }, 500)

      return () => clearInterval(interval);
    } else if (fullAnswerList.length > 0) {

      shownAllQARef.current = true;
    }
  }, [displayIndex, fullAnswerList]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      resetTimer();
      if (event.key === KEY && shownAllQARef.current) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isTyping]);

  useEffect(() => {
    if (answerBoxRef.current) {
      answerBoxRef.current.scrollTo({
        top: answerBoxRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [currentText]);

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
      <div className="answerbox" ref={answerBoxRef}>
        {displayedQA.map((qa, idx) => (
          <div className={qa.isEnd ? 'ending-text' : 'something'} key={idx}>
            <strong>{qa.question}</strong><br /> {qa.answer}
          </div>
        ))}
        {isTyping && (
          <div>
            <strong>{fullAnswerList[displayIndex]?.question}</strong><br /> {currentText}
          </div>
        )}
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
