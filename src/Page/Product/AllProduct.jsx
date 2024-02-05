import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Components/hook/useAxiosPublic";

const AllProducts = () => {
  const axiosSecure = useAxiosPublic();
  const { data: products = [] } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosSecure.get("/product");
      return res.data;
    },
  });

  console.log(products);

  return (
    <div className="lg:p-8 space-y-5 text-white rounded-xl lg:m-5 grid gap-2 lg:grid-cols-2 grid-cols-1 ">
      <p>{products?.length}</p>
      {products?.map((product) => (
        <div
          key={product?._id}
          className="card w-full bg-[#0000005d] rounded-lg shadow-xl"
        >
          <h2 className="text-xl font-semibold text-center pt-4"></h2>
          <figure className="m-4">
            <div className="h-44 w-[500px] rounded-xl bg-base-300">
              <img
                className="h-44 rounded-xl mx-auto"
                src={product?.image}
                alt={product?.displayName}
              />
            </div>
          </figure>
          <h2 className="text-xl font-semibold text-center pt-4">
            {product?.productName}
          </h2>
          <div className="card-body p-4">
            <p>
              Category: {product?.productType} <br />
              Quantity: {product?.productQuantity} <br />
            </p>
            <div className="card-actions flex justify-end grid-cols-3">
              <Link to={`/UpdateProduct/${product?._id}`}>
                <button className="text-white bg-green-500  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                  Update
                </button>
              </Link>
              <Link to={`/product/${product?._id}`}>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                  Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
