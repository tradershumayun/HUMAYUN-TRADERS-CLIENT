import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AddCost from "./AddCost";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageCost = () => {
  const [costs, setCosts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleDeleteProduct = (costId) => {
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
        // Send a request to delete the product
        axiosSecure.delete(`http://localhost:5000/cost/${costId}`)
          .then(response => {
            if (response.status === 200) {
             
              setCosts(prevProducts => prevProducts.filter(product => product._id !== costId));
              Swal.fire("Deleted!", "Your product has been deleted.", "success");
            } else {
              Swal.fire("Error!", "Failed to delete the product.", "error");
            }
          })
          .catch(error => {
            console.error('Error deleting product:', error);
            Swal.fire("Error!", "Failed to delete the product.", "error");
          });
      }
    });
  };

  const getTotalCost = () => {
    return costs.reduce((total, cost) => total + cost.cost, 0);
  };

  // useEffect(() => {
  //   fetch("cost.json")
  //     .then((res) => res.json())
  //     .then((data) => setCosts(data));
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get("/cost");
        setCosts(response.data);
      } catch (error) {
        console.error("Error fetching costs:", error);
      }
    };

    fetchData();
  }, [axiosSecure]);

  return (
    <div className="bg-base-200 p-4 m-4 rounded-xl">
      <div className="text-3xl py-2">
        <h2>Manage Cost</h2>
      </div>
      <div className="flex w-full  ">
        <Link to="/addCost">
          <button className=" btn btn-primary">Add Cost</button>
        </Link>
      </div>
      <h4>Total Cost: {costs?.length}</h4>
      <h4>Total Cost: {getTotalCost()}</h4>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-sm">
            <th>No</th>
            <th>cost</th>
            <th> </th>
          </thead>
          <tbody>
            {costs.map((cost, index) => (
                 <tr key={index}>
                 <td>{index + 1}</td>
                <td>{cost?.cost}</td>
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
                    onClick={() => handleDeleteProduct(cost?._id)}
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
