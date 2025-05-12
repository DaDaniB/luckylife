import { useEffect, useState } from "react";

export const useInactivityTimer = (
  onTimeout: () => void,
  delay = 30000,
  countdown = 15000
) => {
  const [timeoutWarning, setTimeoutWarning] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let countdownTimer: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timer);
      clearTimeout(countdownTimer);
      setTimeoutWarning(false);
      timer = setTimeout(() => {
        setTimeoutWarning(true);
        countdownTimer = setTimeout(onTimeout, countdown);
      }, delay);
    };

    const handleActivity = () => resetTimer();

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    resetTimer();

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      clearTimeout(timer);
      clearTimeout(countdownTimer);
    };
  }, [onTimeout, delay, countdown]);

  return timeoutWarning;
};
