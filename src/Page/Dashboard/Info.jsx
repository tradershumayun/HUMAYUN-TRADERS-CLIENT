import  { useEffect, useState } from "react";
import Time from "../../Components/Time";
import Calculator from "../../Components/Calculator";

const Info = () => {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.text())
      .then((data) => setStatus(data))
      .catch((error) => {
        console.error("Error fetching database status:", error.message);
        setStatus("! DB not connected , please contact: 01917019619");
      });
  }, []);
  return (
    <div>
        
      <Time />
      <div className="text-white">
        <p className="p-4">{status}</p>
      </div>
      <hr className="py-4" />
      <Calculator />

     
    </div>
  );
};

export default Info;
