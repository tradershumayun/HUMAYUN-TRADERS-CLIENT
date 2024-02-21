import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const SellView = () => {
  const axiosSecure = useAxiosSecure();
  const [infos, setInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get("/sell");
        setInfo(response.data);
      } catch (error) {
        console.error("Error fetching costs:", error);
      }
    };

    fetchData();
  }, [axiosSecure]);
console.log(infos)
  return (
    <div className="text-white">
        <h2>{infos.length}</h2>
      {infos?.map((info) => (
        <div key={info?._id}>

          <p>Seller Email: {info.sellerEmail} </p>
          {/* <p>Agent Name: {info?.agetName}</p> */}

{/*   
          <ul>
            {info?.purchesProducts?.map((product) => (
              <li key={product?.productName}>
                <p>Product Name: {product?.productName}</p>
                <p>Quantity: {product?.quantity}</p>
              
              </li>
            ))}
          </ul> */}
        </div>
      ))}
    </div>
  );
};

export default SellView;
