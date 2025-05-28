import decisionData from '../data/decision.json';

export const getFilteredAnswers = (
  sectionIndex: number,
  selectedAnswers: Record<string, string>
) => {
  const section = decisionData.sections[sectionIndex];
  return section.questions.map((question) => {
    const filteredAnswers = question.answers.filter((answer) => {
      const isExcluded = answer.excludes?.some((ex) => Object.values(selectedAnswers).includes(ex));
      const isIncluded = answer.includes?.every((inc) => Object.values(selectedAnswers).includes(inc));
      return !isExcluded && (!answer.includes || isIncluded);
    });
    return { question: question.question, answers: filteredAnswers };
  });
};
