import React from 'react';
import { useAppContext } from '../context/AppContext';

const FinalPage: React.FC = () => {
  const { answers } = useAppContext();

  return (
    <div>
      <h2>Final Results</h2>
      {Object.entries(answers).map(([question, answer], idx) => (
        <div key={idx}>
          <strong>{question}</strong>: {answer}
        </div>
      ))}
    </div>
  );
};

export default FinalPage;
