import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const Accounts = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const { data: user = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/user", {});
        if (res.data) {
          setLoading(false);
        }
        return res.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
    },
  });

  const handleSms = async (id) => {
    try {
      console.log(id);
      const sendSms = await axiosSecure.post(`/user/sendSms?userId=${id}`);
      console.log(sendSms);
      Swal.fire({
        title: "Success",
        text: "Message sent successfully",
        icon: "success",
      });
      refetch();
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  };

  const onSubmit = async (e, userId) => {
    e.preventDefault();
    const amount = parseInt(e.target.elements.amount.value);

    if (amount > 0) {
      const res = await axiosSecure.post(`/user/paid?userId=${userId}&amount=${amount}`)
      if (res) {
        refetch();
        Swal.fire({
          title: "Success",
          text: "Add Money Successfully",
          icon: "success",
        });
        e.target.elements.amount.value = '';
      }
    }

  };

  if (loading) {
    return <div className="bg-base-200 p-16 w-full h-full">Loading...</div>;
  }

  return (
    <div className="bg-base-200 p-0 m-0 lg:p-4 lg:m-4 rounded-xl">
      <div className="text-3xl py-2">
        <h2>Due list</h2>
      </div>
      <div className="flex w-full"></div>
      <h4>Total user : {user?.length}</h4>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-sm">
            <tr>
              <th>No</th>
              <th>image</th>
              <th>Name</th>
              <th>Paid Amount</th>
              <th>Total Due</th>
              <th>Action</th>
              <th>Last SMS Send Date</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((userData, index) => (
              <tr key={userData?._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={userData?.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <Link
                      className="text-blue-800 font-bold"
                      to={`/singleUserInfo/${userData?._id}`}
                    >
                      <div className="font-bold">{userData?.displayName}</div>
                      {!userData?.displayName && (
                        <span> {userData?.email}</span>
                      )}
                    </Link>
                  </div>
                </td>
                <td className="flex gap-2">
                  <td className="">
                    <form className="flex gap-2" onSubmit={(e) => onSubmit(e, userData._id)}>
                      <input
                        name="amount"
                        className="input input-sm w-16"
                        type="number"
                      />
                      <button className="w-1/2 btn btn-sm btn-success">
                        Paid
                      </button>
                    </form>
                  </td>
                </td>
                <td>{userData.totalDueAmmout} TK</td>
                <td>
                  {userData.totalDueAmmout > 0 ? (
                    <button
                      onClick={() => handleSms(userData._id)}
                      className="btn btn-sm w-28 btn-warning"
                    >
                      Send SMS
                    </button>
                  ) : (
                    <button className="btn btn-sm w-28 disabled btn-disabled">
                      Send SMS
                    </button>
                  )}
                </td>
                <td>
                  {userData?.lastSmsSendingDate === "" ? (
                    <h3>No message sent yet</h3>
                  ) : (
                    <h3>{userData?.lastSmsSendingDate}</h3>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Accounts;
