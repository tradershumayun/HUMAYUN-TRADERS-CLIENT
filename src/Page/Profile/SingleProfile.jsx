import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const SingleProfile = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosSecure.get(`/user/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching   data: ", error);
        setError("Error fetching   data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [axiosSecure, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className="container mx-auto my-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  const convertToBdTime = (timestamp) => {
    const gmt6Time = new Date(timestamp);
    const options = { timeZone: "Asia/Dhaka" };
    return gmt6Time.toLocaleString("en-US", options);
  };

  return (
    <div className="bg-base-300   p-8 rounded-lg shadow-md">
      {user?.userType === "user" && (
        <h2 className="text-gray-500  p-4">
          সে একজন আবেদনকারী
        </h2>
      )}
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/2">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-32 h-32 mx-auto rounded-full  aspect-square"
          />

          <p className="mt-4 text-center text-gray-500">Id: {user?._id}</p>
        </div>
        <div className="w-full lg:w-1/2 text-left mt-4 lg:ml-8">
          <p className="text-xl font-bold mb-4">Your Profile</p>
          <p>
            <span className="font-bold text-blue-500">Name:</span>{" "}
            {user?.displayName}
          </p>
          <p>
            <span className="font-bold text-blue-500">Registration Date:</span>{" "}
            {user?.date && convertToBdTime(user?.date)}
          </p>

          <p>
            <span className="font-bold text-blue-500">Email:</span>{" "}
            {user?.email}
          </p>
          <p>
            <span className="font-bold text-blue-500">Address:</span>{" "}
            {user?.address}
          </p>
          <p>
            <span className="font-bold text-blue-500">Phone No:</span>{" "}
            {user?.phoneNo}
          </p>
          <p>
            <span className="font-bold text-blue-500">NID No:</span> {user?.nid}
          </p>
          <p>
            <span className="font-bold text-blue-500">Role No:</span>
            {user?.userType} 
          </p> 
          <p>
            <span className="font-bold text-blue-500">Beach No:  </span>{!user?.beach && <span>Beach No select</span>}
            {user?.beach}
          </p><p>
            <span className="font-bold text-blue-500">Total Buy </span>{" "}
            .......
          </p>
          <p>
            <span className="font-bold text-blue-500">Total Duo </span>{" "}
            .......
          </p>

          <div className="flex gap-4 mt-4 justify-end"></div>
        </div>
      </div>
    </div>
  );
};

export default SingleProfile;
