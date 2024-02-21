import { useContext, useEffect, useState } from "react";
 
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const SingleProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [dbuser, setDBuser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosSecure.get(`/user/email/${user.email}`);
        setDBuser(response.data);
      } catch (error) {
        console.error("Error fetching product data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [axiosSecure, user.email]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-base-300   p-8 rounded-lg shadow-md">
      <div className="bg-base-300">
        <div className="bg-base-200  rounded-xl">
          <div className="text-3xl py-2 ">
            <h2>History</h2>
          </div>
          <div className="flex w-full  "></div>
          <h4>Total Product: {dbuser?.purchesProductCollection?.length}</h4>

          <div className="overflow-x-auto">
            <table className="table">
              <thead className=" text-sm">
                <tr>
                  <th>No</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {dbuser?.purchesProductCollection?.map((product, index) => (
                  <tr className="  border-gray-300" key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={product?.imageURL} alt="Product Image" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <Link
                      className="text-blue-800 font-bold"
                      to={`/product/${product?._id}`}
                    >
                      <td>{product?.productName}</td>
                    </Link>

                    <td>{product?.productQuantity}</td>
                    <td>{product?.productPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProfile;
