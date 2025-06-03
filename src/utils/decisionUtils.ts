import type { DisplayedText } from '../components/ResultPage';
import rawDecisionData from '../data/decision.json';
import type { DecisionTree } from '../types';

const decisionData = rawDecisionData as DecisionTree

export const getFilteredAnswers = (
  sectionIndex: number,
  selectedAnswers: Record<string, string>
) => {
  const section = decisionData.sections[sectionIndex];

  const returnedValues: DisplayedText[] = []
  for (let question of section.questions) {
    let possibleAnswers = []
    for (let answer of question.answers) {
      const isExcluded = answer.excludes?.some((ex: string) => {
        return Object.values(selectedAnswers).includes(ex) || returnedValues.map(val => val.answer).includes(ex)
      })
      const isIncluded = answer.includes?.every((inc: string) => {
        return Object.values(selectedAnswers).includes(inc) || returnedValues.map(val => val.answer).includes(inc);
      })

      if (!isExcluded && (!answer.includes || isIncluded)) {
        possibleAnswers.push(answer)
      }
    }
    const i = Math.floor(Math.random() * possibleAnswers.length);
    const a = possibleAnswers[i];
    let selectedAnswer: DisplayedText;
    if (a) {
      selectedAnswer = { question: question.question, answer: a.answer, isEnd: a.endflow ?? false };
    } else {
      selectedAnswer = { question: "", answer: "", isEnd: false };
    }
    returnedValues.push(selectedAnswer)
  }
  return returnedValues
};
