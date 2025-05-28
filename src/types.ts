export interface Answer {
  answer: string;
  includes?: string[];  // Answers that must be selected before this one is valid
  excludes?: string[];  // Answers that must NOT be selected for this to be valid
  endflow?: boolean;
}

export interface Question {
  question: string;
  answers: Answer[];
}

export interface Section {
  title: string;
  questions: Question[];
}

export interface DecisionTree {
  sections: Section[];
}
