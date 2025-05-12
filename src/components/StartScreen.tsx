import './StartScreen.css';

type Props = { onStart: () => void };

export const StartScreen = ({ onStart }: Props) => (
  <div className="start-screen">
    <h1 className="start-header">🎰 Decision Journey</h1>
    <p className="start-text">
      Click below to begin your personalized decision path.
    </p>
    <button className="start-button" onClick={onStart}>
      Start Your Journey
    </button>
  </div>
);
