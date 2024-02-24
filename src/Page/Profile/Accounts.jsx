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
  
  const handleSms = async(id) =>{
       console.log(id);
       const sendSms = await axiosSecure.post(`/user/sendSms?userId=${id}`);
       console.log(sendSms);
       Swal.fire({
        title: "Success",
        text: "Message send successfully",
        icon: "success",
      });
      refetch();
  }

  return (
    <div className="bg-base-200 p-0 m-0 lg:p-4 lg:m-4 rounded-xl">
      <div className="text-3xl py-2">
        <h2>Due list</h2>
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
                <td>Total Duo </td>
            <th>Action</th>
            <th>Last SMS Send Date</th>
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
                <td>{user?.totalPurchesAmmount} TK</td>
                <td > {user.totalDueAmmout} TK</td>
                
                <td>
                  {
                    user.totalDueAmmout > 0 ?  <button onClick={()=>handleSms(user._id)} className="btn btn-sm w-28 btn-warning">Send SMS</button> : <button className="btn btn-sm w-28 disabled btn-disabled">Send SMS</button>
                  }
                  
                </td>
                <td>
                 {
                   user?.lastSmsSendingDate === "" ? <h3>No message send yet</h3> : <h3>{user?.lastSmsSendingDate}</h3>
                 }
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
