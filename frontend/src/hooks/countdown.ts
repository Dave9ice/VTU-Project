import { useCallback, useEffect, useState } from "react";

export const useCountdown = (expiresAt: string | null) => {
  // const calculateTimeLeft = () => {
  //   if (!expiresAt) return;
  //   return Math.max(
  //     Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000),
  //     0,
  //   );
  // };
  // const [timeleft, setTimeLeft] = useState(calculateTimeLeft);
  // useEffect(() => {
  //   if (!expiresAt) return;
  //   const interval = setInterval(() => {
  //     setTimeLeft(calculateTimeLeft());
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [expiresAt]);
  // return timeleft;

  // Memoize calculation to avoid unnecessary re-renders
  const calculateSecondsLeft = useCallback(() => {
    if (!expiresAt) return 0;

    // Ensure format is ISO-compliant (YYYY-MM-DDTHH:mm:ss)
    const targetTimeStr = expiresAt.replace(" ", "T") + "Z";
    const target = new Date(targetTimeStr).getTime();
    const now = Date.now();

    return Math.max(Math.floor((target - now) / 1000), 0);
  }, [expiresAt]);

  const [secondsLeft, setSecondsLeft] = useState(calculateSecondsLeft());

  useEffect(() => {
    if (!expiresAt) return;

    // Initial sync
    setSecondsLeft(calculateSecondsLeft());

    const interval = setInterval(() => {
      const remaining = calculateSecondsLeft();
      setSecondsLeft(remaining);

      if (remaining <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, calculateSecondsLeft]);

  return secondsLeft;
};
