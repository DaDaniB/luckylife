export type ResultOption = {
    id: string;
    label: string;
    probability: number;
    invalidatedBy?: string[];
  };
  
  export type QuestionNode = {
    id: string;
    question: string;
    options: ResultOption[];
  };
  
  export type Decision = {
    questionId: string;
    questionText: string;
    resultId: string;
    resultLabel: string;
  };
  