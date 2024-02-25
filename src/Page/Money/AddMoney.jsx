import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";
const AddMoney = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    
  } = useForm();

  const onSubmit = async (data) => {
    try {
 
      const res = await axiosSecure.post("/money", data);

      if (res.data.insertedId === null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error Already Register!",
          position: "top-right",
        });
      } else {
        Swal.fire({
          title: "Money  added Success!",
          text: "Thanks You!",
          icon: "success",
          position: "top-right",
          timer: 1500,
        });
        navigate("/money");
      }
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  return (
    <div>
      <div className="rounded-xl bg-base-200 p-8 ">
        <h3 className="font-bold text-lg">Add a money</h3>
        <form className="space-y-6 " onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1 text-sm">
            <div className="space-y-1 text-sm">
              <label className="block dark-text-gray-400">Money Issues</label>
              <input
                {...register("costIssues", {
                  required: "Money Issues is required",
                })}
                type="text"
                className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
              />
              {errors.costIssues && (
                <p className="text-red-500">{errors.costIssues.message}</p>
              )}
            </div>
            <label className="block dark-text-gray-400">Money (tk)</label>
            <input
              {...register("Money", {
                required: "Money is required",
              })}
              type="number"
              className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
            />
            {errors.Money && (
              <p className="text-red-500">{errors.Money.message}</p>
            )}
          </div>
          <div className="space-y-1 text-sm">
            <label className="block dark-text-gray-400"> Date</label>
            <input
              {...register("costDate", {
                required: "Date is required",
              })}
              type="date"
              className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
            />
            {errors.costDate && (
              <p className="text-red-500">{errors.costDate.message}</p>
            )}
          </div>

          <div className="space-y-1 text-sm">
            <label className="block dark-text-gray-400">Money Type</label>

            <select
              {...register("costType", {
                required: "Money Type is required",
              })}
              className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
            >
              <option disabled selected>
                Money Type
              </option>
              <option>Daily</option>
              <option>Month</option>
            </select>

            {errors.costType && (
              <p className="text-red-500">{errors.costType.message}</p>
            )}
          </div>

          {/* ... (other form fields) ... */}

          <div className="flex gap-2 items-end justify-end">
            <button
              type="submit"
              className="block p-3 btn-success text-center rounded-xl dark-text-gray-900 dark-bg-violet-400 btn btn-1"
            >
              Add Money
            </button>
            <Link to="/Money">
              <button type="button" className="btn btn-error text-white">
                Close
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

 

export default AddMoney;