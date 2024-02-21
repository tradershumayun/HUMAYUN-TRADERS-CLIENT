import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { Link } from "react-router-dom";
import { useState } from "react";

const Accounts = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const { data: user = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user", {});
      if (res.data) {
        setLoading(false);
      }
      return res.data;
    },
  });

  

 

  if (loading === true) {
    return <div className="  bg-base-200 p-16 w-full h-full">Loading...</div>;
  }

  return (
    <div className="bg-base-200 p-4 m-4 rounded-xl">
      <div className="text-3xl py-2">
        <h2>Manage user</h2>
      </div>
      <div className="flex w-full  "></div>
      <h4>Total user : {user?.length}</h4>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-sm">
            <th>No</th>
            <th>image</th>
            <th>Name</th>
            <td>Total Buy Amount </td>
                <td>Total Discount</td>
                <td>Total Duo </td>
            <th>Action</th>
          </thead>
          <tbody>
            {user?.map((user, index) => (
              <tr key={user?._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user?.photoURL}
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
                      to={`/singleUserInfo/${user?._id}`}
                    >
                      <div className="font-bold">{user?.displayName}</div>
                      {!user?.displayName && <span> {user?.email}</span>}
                    </Link>
                  </div>
                </td>
                <td>Total Buy Amount </td>
                <td>Total Discount</td>
                <td > {user.totalDueAmmout}</td>
                
                <td>
                  <button className="btn btn-sm btn-warning">Send SMS</button>
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
