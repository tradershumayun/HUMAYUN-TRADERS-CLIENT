import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AddCost from "./AddCost";

const ManageCost = () => {
  const [costs, setCosts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDeleteProduct = (property) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(property._id);
      }
    });
  };

  const getTotalCost = () => {
    return costs.reduce((total, cost) => total + cost.cost, 0);
  };

  useEffect(() => {
    fetch("cost.json")
      .then((res) => res.json())
      .then((data) => setCosts(data));
  }, []);

  return (
    <div className="bg-base-200 p-4 m-4 rounded-xl">
      <div className="text-3xl py-2">
        <h2>Manage Cost</h2>
      </div>
      <div className="flex w-full  ">
        <AddCost className="justify-end items-end" />
      </div>
      <h4>Total Cost: {costs?.length}</h4>
      <h4>Total Cost: {getTotalCost()}</h4>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-sm"> </thead>
          <tbody>
            {costs.map((cost, index) => (
              <tr key={index} className="  ">
                <td>{cost.id}</td>
                <td>{cost.cost}</td>
                <td>{cost.costIssues}</td>
                <td>{cost.costDate}</td>
                <td>{cost.costType}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => setShowEditModal(true)}
                  >
                    Edit
                  </button>{" "}
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDeleteProduct(cost)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEditModal && (
        <dialog key="my_modal_2" className="modal" open>
          <div className="modal-box m-0 bg-base-300">
            <div className="modal-action"></div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageCost;
