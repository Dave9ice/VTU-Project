import { useEffect, useState } from "react";

export const useCountdown = (
  expiresAt: string | null,
  createdAt: string | null,
) => {
  const calculateDuration = () => {
    if (!createdAt || !expiresAt) return 0;

    const start = new Date(createdAt.replace(" ", "T")).getTime();
    const end = new Date(expiresAt.replace(" ", "T")).getTime();

    // This gives you exactly 3600 seconds (1 hour)
    // regardless of what time the laptop thinks it is.
    return Math.max(Math.floor((end - start) / 1000), 0);
  };

  const [timeLeft, setTimeLeft] = useState(calculateDuration());

  useEffect(() => {
    // Sync when props change
    setTimeLeft(calculateDuration());

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt, expiresAt]);

  return timeLeft;
};
