import React, { useState } from "react";
import { Link } from "react-router-dom";

const OrderList = () => {
  // Example data for buy products
  const exampleCosts = [
    {
      _id: 1,
      productName: "Product A",
      date: "2024-02-19",
      amount: 50,
      type: "Type A",
    },
    {
      _id: 2,
      productName: "Product B",
      date: "2024-02-20",
      amount: 75,
      type: "Type B",
    },
    // Add more example data as needed
  ];

  // State to hold buy products
  const [costs, setCosts] = useState(exampleCosts);

  // Function to calculate total buy cost
  const getTotalCost = () => {
    return costs.reduce((total, buy) => total + buy.amount, 0);
  };

  // Function to handle product deletion
  const handleDeleteProduct = (productId) => {
    // Implement logic to delete the product with the given productId
    // Update the 'costs' state accordingly
    // For example: setCosts(costs.filter((buy) => buy._id !== productId));
  };

  return (
    <div className="bg-base-200 p-4 m-4 rounded-xl">
      <div className="text-3xl py-2">
        <h2>Show my request product list</h2>
      </div>
      <div className="flex w-full">
        <Link to="/Products">
          <button className="btn btn-primary">Add More</button>
        </Link>
      </div>
      <div className="flex justify-evenly">
        <h4>Total No: {costs?.length}</h4>
        <h4>Total buy: {getTotalCost()} TK</h4>
      </div>
      <hr className="py-2" />

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-sm">
            <th>No</th>
            <th>Product Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Action</th>
          </thead>
          <tbody>
            {costs.map((buy, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{buy?.productName}</td>
                <td>{new Date(buy.date).toLocaleDateString("en-GB")}</td>
                <td>{buy.amount} tk</td>
                <td>{buy.type}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleDeleteProduct(buy?._id)}
                  >
                    cancel request
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Your edit modal code goes here */}
    </div>
  );
};

export default OrderList;
