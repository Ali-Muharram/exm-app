/* eslint-disable react-hooks/exhaustive-deps */
import { useTimer } from "react-timer-hook";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
// @ts-expect-error: no type declarations for side-effect CSS import
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";
const rootStyles = getComputedStyle(document.documentElement);
export default function Duration({ durationn }: { durationn: number }) {
  const [expireDate, setExpireDate] = useState<number>();
  /* ----------------------------- make expire date ---------------------------- */
  const expiryTime = new Date();
  expiryTime.setSeconds(expiryTime.getSeconds() + durationn);

  /* ------------------------------ hook useTimer ----------------------------- */
  const { seconds, minutes } = useTimer({
    expiryTimestamp: expiryTime,
    onExpire: () => console.log("الوقت انتهى"),
  });

  /* ------------------------- make expire date static ------------------------ */
  useEffect(() => {
    setExpireDate(expiryTime.getTime() / 1000);
  }, []);

  /* --------------------------- make progress value -------------------------- */
  const elapsed = Math.round((expireDate ?? 0) - Date.now() / 1000);
  const progressValue = Math.min((elapsed / durationn) * 100, 100);
  const timer = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

  return (
    <div className="w-[3.8rem]">
      <CircularProgressbar
        styles={buildStyles({
          pathColor: rootStyles.getPropertyValue("--primary"),
          textColor: "#000000",
        })}
        text={`${timer}`}
        value={progressValue}
        maxValue={100}
        strokeWidth={15}
      />
    </div>
  );
}
