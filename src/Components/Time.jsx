import React, { useState, useEffect } from "react";

const Time = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId); // Cleanup the interval when the component is unmounted
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
     
  };

  return (
    <div className="text-white">
      
     
      <p className="text-4xl p-4">
        {currentDateTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })}
        <br />

        
        
      </p>{currentDateTime.toLocaleDateString("en-US", options)}
    </div>
  );
};

export default Time;
