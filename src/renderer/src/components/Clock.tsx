import { useState, useEffect } from "react";

type ClockProps = {
  clockOrder: boolean,
  shortCutsExists: boolean
}

function Clock({clockOrder, shortCutsExists}:ClockProps) {

  const [time, setTime] = useState<Date>(new Date());

  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, "0");
  const date = String(time.getDate()).padStart(2, "0");

  const hour = String(time.getHours()).padStart(2, "0");
  const min = String(time.getMinutes()).padStart(2, "0");
  const sec = String(time.getSeconds()).padStart(2, "0");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex select-none flex-nowrap gap-1 text-nowrap">
      {shortCutsExists ? <span>|</span> : ""}
      <ul
        className={
          clockOrder
            ? "flex flex-row-reverse gap-2 text-nowrap list-none"
            : "flex gap-2 text-nowrap list-none"
        }
      >
        <li>
          {date}/{month}/{year}
        </li>
        <li>
          {hour}:{min}:{sec}
        </li>
      </ul>
    </div>
  );
}

export default Clock;
