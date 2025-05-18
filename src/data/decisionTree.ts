import type { QuestionNode } from "../types";

export const decisionTree: QuestionNode[] = [
  {
    id: "q1",
    question: "What's your favorite color?",
    options: [
      { id: "red", label: "Red", probability: 0.3, description: "This is red." },
      { id: "blue", label: "Blue", probability: 0.5, description: "This is blue." },
      { id: "green", label: "Green", probability: 0.2, description: "Green is vibrant." },
      { id: "yellow", label: "Yellow", probability: 0.6, description: "Yellow is bright and cheerful." },
    ],
  },
  {
    id: "q2",
    question: "Pick a season.",
    options: [
      { id: "summer", label: "Summer", probability: 0.6, description: "Hot and sunny.", invalidatedBy: ["green"] },
      { id: "winter", label: "Winter", probability: 0.4, description: "Cold and cozy." },
      { id: "spring", label: "Spring", probability: 0.5, description: "Fresh and blooming." },
      { id: "autumn", label: "Autumn", probability: 0.5, description: "Crisp air and falling leaves." },
    ],
  },
  {
    id: "q3",
    question: "Choose a pet.",
    options: [
      { id: "dog", label: "Dog", probability: 0.7, description: "Loyal and energetic." },
      { id: "cat", label: "Cat", probability: 0.3, description: "Independent and curious.", invalidatedBy: ["red"] },
      { id: "bird", label: "Bird", probability: 0.2, description: "Chirpy and free-spirited." },
      { id: "rabbit", label: "Rabbit", probability: 0.4, description: "Soft and quick." },
    ],
  },
 // {
 //   id: "q4",
 //   question: "Pick a mode of transport.",
 //   options: [
 //     { id: "car", label: "Car", probability: 0.6, description: "Fast and flexible." },
 //     { id: "bike", label: "Bike", probability: 0.3, description: "Eco-friendly and healthy.", invalidatedBy: ["winter"] },
 //     { id: "bus", label: "Bus", probability: 0.4, description: "Public and accessible." },
 //     { id: "train", label: "Train", probability: 0.3, description: "Efficient and reliable." },
 //   ],
 // },
 // {
 //   id: "q5",
 //   question: "Pick a genre of music.",
 //   options: [
 //     { id: "rock", label: "Rock", probability: 0.4, description: "Loud and powerful.", invalidatedBy: ["yellow"] },
 //     { id: "jazz", label: "Jazz", probability: 0.3, description: "Smooth and improvisational." },
 //     { id: "pop", label: "Pop", probability: 0.5, description: "Catchy and mainstream." },
 //     { id: "classical", label: "Classical", probability: 0.2, description: "Timeless and elegant." },
 //   ],
 // },
 // {
 //   id: "q6",
 //   question: "Choose your ideal vacation.",
 //   options: [
 //     { id: "beach", label: "Beach", probability: 0.6, description: "Relaxing under the sun." },
 //     { id: "mountains", label: "Mountains", probability: 0.4, description: "Hiking and fresh air." },
 //     { id: "city", label: "City", probability: 0.5, description: "Culture and nightlife." },
 //     { id: "countryside", label: "Countryside", probability: 0.3, description: "Peace and nature." },
 //   ],
 // },
 // {
 //   id: "q7",
 //   question: "Pick a drink.",
 //   options: [
 //     { id: "coffee", label: "Coffee", probability: 0.5, description: "Energizing and bold." },
 //     { id: "tea", label: "Tea", probability: 0.4, description: "Calming and aromatic." },
 //     { id: "juice", label: "Juice", probability: 0.3, description: "Refreshing and fruity." },
 //     { id: "water", label: "Water", probability: 0.6, description: "Simple and essential." },
 //   ],
 // },
];