import React, { useEffect, useState } from "react";

type ClockType = {
  timeZone: string;
};

export default function Clock(props: ClockType) {
  const [time, setTime] = useState("");

  const updateClock = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: props.timeZone,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true, // Use 12-hour format with AM/PM
    };

    setTime(date.toLocaleString("en-US", options));
  };

  useEffect(() => {
    const interval = setInterval(updateClock, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [props.timeZone, updateClock]);

  return <div className="flex-grow flex-shrink-0">{time}</div>;
}
