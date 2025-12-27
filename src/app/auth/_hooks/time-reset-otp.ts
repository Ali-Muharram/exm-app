import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function useTimeResendOtp() {
  const [seconds, setSeconds] = useState<number>(0);
  /* -------------------------- save or refresh time -------------------------- */
  function setTime() {
    const isAllowed = getStatus();
    if (!isAllowed) return;
    const timestampSec = Math.floor(Date.now() / 1000);
    Cookies.set("_TOA", timestampSec.toString());
  }

  /* --------------------- cheack if allowed  to send otp --------------------- */
  function getStatus(): boolean {
    try {
      const timestampSec = Math.floor(Date.now() / 1000);
      const lastTime = Cookies.get("_TOA") || 0;
      if (lastTime === 0) return true;
      const duration = timestampSec - Number(lastTime);
      if (duration < 60) {
        if (seconds == 0) {
          setSeconds(60 - duration);
        }
        return false;
      } 

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log(error);
      return true;
    }
  }
  /* ---------------------------------- timer --------------------------------- */
  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return { seconds, setTime, getStatus };
}
