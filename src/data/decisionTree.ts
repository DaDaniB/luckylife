import type { QuestionNode } from "../types";

export const decisionTree: QuestionNode[] = [
  {
    id: "q1",
    question: "What's your favorite color?",
    options: [
      { id: "red", label: "Red", probability: 0.3, description: 'this is red' },
      { id: "blue", label: "Blue", probability: 0.5, description: 'this is bluee' },
      { id: "green", label: "Green", probability: 0.2, description: 'green is this' },
      { id: "yellow", label: "Yellow", probability: 0.6, description: 'and that is yellow' }
    ],
  },
  {
    id: "q2",
    question: "Pick a season.",
    options: [
      { id: "summer", label: "Summer", probability: 0.6, invalidatedBy: ["green"] },
      { id: "winter", label: "Winter", probability: 0.4 },
    ],
  },
  {
    id: "q3",
    question: "Choose a pet.",
    options: [
      { id: "dog", label: "Dog", probability: 0.7 },
      { id: "cat", label: "Cat", probability: 0.3, invalidatedBy: ["red"] },
    ],
  },
];
