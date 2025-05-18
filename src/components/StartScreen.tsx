import './StartScreen.css';

type Props = { onStart: () => void };

export const StartScreen = ({ onStart }: Props) => (
  <div className="start-screen">
    <h1 className="start-header">Lucky Life</h1>
    <p className="start-text">
      Click below to see your luck.
    </p>
    <button className="start-button" onClick={onStart}>
      Start Your Journey
    </button>
  </div>
);
