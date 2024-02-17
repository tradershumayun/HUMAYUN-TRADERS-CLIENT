import React, { useState, useEffect } from "react";

const Time = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId); // Cleanup the interval when the component is unmounted
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="text-white">
      <marquee>
        Notice: এপ্লিকেশনটি বর্তমানে আন্ডার কনস্ট্রাকশন আছে,শীঘ্রই এটা পুরোপুরি
        চালু হবে
      </marquee>
      <h1>Current Time:</h1>
      <p className="text-4xl p-4">{currentTime.toLocaleTimeString()}</p>
    </div>
  );
};

export default Time;
