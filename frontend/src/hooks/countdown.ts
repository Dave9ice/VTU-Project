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
    const targetTimeStr = expiresAt.replace(" ", "T");
    const target = new Date(targetTimeStr).getTime();
    const now = Date.now();
    console.log("Original String:", expiresAt);
    console.log(
      "Target Date Object:",
      new Date(expiresAt.replace(" ", "T")).toString(),
    );
    console.log("Current Date Object:", new Date().toString());
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
