import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const AddCost = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const res = await axiosSecure.post("/addProperty", data);

      if (res.data.insertedId === null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Player Already Register!",
          position: "top-right",
          footer: `<a href="#">Please check </a>`,
        });
      } else {
        Swal.fire({
          title: "Property added Success!",
          text: "Thanks You!",
          icon: "success",
          position: "top-right",
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error adding property:", error);
      // You can handle errors here, for example, show an error message to the user
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Add cost
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="rounded-xl bg-base-200 modal-box">
          <h3 className="font-bold text-lg">Add a Product</h3>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1 text-sm">
              <label className="block dark-text-gray-400">Cost (tk)</label>
              <input
                {...register("cost", {
                  required: "Cost is required",
                })}
                type="number"
                className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
              />
              {errors.cost && (
                <p className="text-red-500">{errors.cost.message}</p>
              )}
            </div>
            <div className="space-y-1 text-sm">
              <label className="block dark-text-gray-400">Cost Date</label>
              <input
                {...register("costDate", {
                  required: "Cost Date is required",
                })}
                type="date"
                className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
              />
              {errors.costDate && (
                <p className="text-red-500">{errors.costDate.message}</p>
              )}
            </div>
            <div className="space-y-1 text-sm">
              <label className="block dark-text-gray-400">Cost Issues</label>
              <input
                {...register("costIssues", {
                  required: "Cost Issues is required",
                })}
                type="text"
                className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
              />
              {errors.costIssues && (
                <p className="text-red-500">{errors.costIssues.message}</p>
              )}
            </div>
            <div className="space-y-1 text-sm">
              <label className="block dark-text-gray-400">Cost Type</label>

              <select
                {...register("costType", {
                  required: "Cost Type is required",
                })}
                className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
              >
                <option disabled selected>
                  Cost Type
                </option>
                <option>Daily</option>
                <option>Month</option>
              </select>

              {errors.costType && (
                <p className="text-red-500">{errors.costType.message}</p>
              )}
            </div>

            <div className="flex gap-2 items-end justify-end">
              <button
                type="submit"
                className="block p-3 btn-success text-center rounded-xl dark-text-gray-900 dark-bg-violet-400 btn btn-1"
              >
                Add Cost
              </button>
              <form method="dialog">
                <button className="btn btn-error text-white">Close</button>
              </form>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddCost;
