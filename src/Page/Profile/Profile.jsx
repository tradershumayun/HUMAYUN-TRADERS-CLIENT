import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, Navigate } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const Profile = () => {
  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Log out",
      text: "Successfully logged out",
    });
  };

  const { user, logOut } = useContext(AuthContext);
  const [dbuser, setDbuser] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get(`/user/email/${user?.email}`);
        setDbuser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user?.email) {
      fetchData();
    }
  }, [axiosSecure, user?.email]);

  const convertToBdTime = (timestamp) => {
    const gmt6Time = new Date(timestamp);
    const options = { timeZone: "Asia/Dhaka" };
    return gmt6Time.toLocaleString("en-US", options);
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      showSuccessAlert();
      Navigate(location?.state?.from ? location.state.from : "/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-base-300   p-8 rounded-lg shadow-md">
      {dbuser?.userType === "user" && (
        <h2 className="text-red-500 text-2xl p-4">
          আপনি একজন আবেদনকারী ,এজেন্ট হিসেবে যুক্ত হতে কর্তৃপক্ষের সাথে যোগাযোগ
          করুন
        </h2>
      )}
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/2">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-32 h-32 mx-auto rounded-full  aspect-square"
          />

          <p className="mt-4 text-center text-gray-500">Id: {user?.uid}</p>
        </div>
        <div className="w-full lg:w-1/2 text-left mt-4 lg:ml-8">
          <p className="text-xl font-bold mb-4">Your Profile</p>
          <p>
            <span className="font-bold text-blue-500">Beach No: </span>
            {dbuser?.beach}
          </p>
          <p>
            <span className="font-bold text-blue-500">Name:</span>{" "}
            {user?.displayName}
          </p>
          <p>
            <span className="font-bold text-blue-500">Registration Date:</span>{" "}
            {user?.metadata.creationTime &&
              convertToBdTime(user.metadata.creationTime)}
          </p>
          <p>
            <span className="font-bold text-blue-500">Last Sign In Time:</span>{" "}
            {user?.metadata.lastSignInTime &&
              convertToBdTime(user.metadata.lastSignInTime)}
          </p>
          <p>
            <span className="font-bold text-blue-500">Email:</span>{" "}
            {dbuser?.email}
          </p>
          <p>
            <span className="font-bold text-blue-500">Address:</span>{" "}
            {dbuser?.address}
          </p>
          <p>
            <span className="font-bold text-blue-500">Phone No:</span>{" "}
            {dbuser?.phoneNo}
          </p>
          <p>
            <span className="font-bold text-blue-500">NID No:</span>{" "}
            {dbuser?.nid}
          </p>
          <p>
            <span className="font-bold text-blue-500">Role No:</span>{" "}
            {dbuser?.userType}
          </p>

          <div className="flex gap-4 mt-4 justify-end">
            <button onClick={handleSignOut} className="btn btn-error px-8">
              Log-out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
