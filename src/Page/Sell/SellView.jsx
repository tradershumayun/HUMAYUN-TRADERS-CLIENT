import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { Link } from "react-router-dom";

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

  return (
    <div className="bg-base-200 p-4 m-4 rounded-xl">
      <div className="text-3xl py-2">
        <h2>Sell history </h2>
      </div>

      <div className="flex justify-evenly">
        <h4>Total No: {infos?.length}</h4>
      </div>
      <hr className="py-2" />

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-sm">
            <th>No</th>
            <th>Date</th>
            <th>Name</th>
            <th>product </th>
            <th>Bill</th>
            <th>Due BIll</th>
            <th>Action</th>
          </thead>
          <tbody>
            {infos.map((info, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{info?.date}</td>
                <Link to={`/singleUserInfo/${info?.agentId}`}>
                  <td className="text-blue-600">{info?.agetName}</td>
                </Link>

                <td>{info?.purchesProducts.length}</td>
                <td className="text-success">{info?.totalCost}</td>
                <td className="text-error">{info?.dueAmmount}</td>
                <td className="flex gap-2">
                  <Link>     <button className="btn btn-sm btn-info">Invoice</button> </Link>
             
             
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // return (
  //   <div className="text-white">
  //     <h2>{infos.length}</h2>
  //     {infos?.map((info) => (
  //       <div key={info?._id}>
  //         <p>Agent Name: {info?.agetName}</p>
  //       </div>
  //     ))}
  //   </div>
  // );
};

export default SellView;
