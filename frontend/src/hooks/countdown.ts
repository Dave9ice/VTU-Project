import { useEffect, useState } from "react";

export const useCountdown = (expiresAt: string | null) => {
  const calculateTimeLeft = () => {
    if (!expiresAt) return;
    return Math.max(
      Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000),
      0,
    );
  };
  const [timeleft, setTimeLeft] = useState(calculateTimeLeft);
  useEffect(() => {
    if (!expiresAt) return;
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);
  return timeleft;
};
