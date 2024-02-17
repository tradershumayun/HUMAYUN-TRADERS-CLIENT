import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: user = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user", {});
      return res.data;
    },
  });

  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/user/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleRoleChange = (e, user) => {
    e.preventDefault();

    const newRole = e.target.role.value;

    axiosSecure
      .patch(`/user/${user._id}`, { role: newRole })
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `success  Change role!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
            <th>Email</th>
            <th>Role</th>
          </thead>
          <tbody>
            {user?.map((user, index) => (
              <tr key={user._id}>
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
                    <div className="font-bold">{user?.name}</div>
                  </div>
                </td>{" "}
                <td>
                  <div>
                    <div className="font-bold">{user?.email}</div>
                  </div>
                </td>
                <td>
                  <form onSubmit={(e) => handleRoleChange(e, user)}>
                    <div className=" text-sm flex gap-2">
                      <select
                        name="role"
                        defaultValue={user?.userType}
                        className="px-4 py-0  rounded-md text-black"
                      >
                        <option value="isAdmin">Admin</option>
                        <option value="isAgent">Agent</option>
                        <option value="user">User</option>
                      </select>
                      <button type="submit" className="btn btn-sm btn-primary ">
                        Action
                      </button>
                    </div>
                  </form>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-sm btn-error"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
