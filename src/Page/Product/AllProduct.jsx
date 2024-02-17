import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { data: products = [] } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosSecure.get("/product");
      return res.data;
    },
  });

  return (
    <div className="grid gap-4 lg:grid-cols-2 grid-cols-1 p-8 m-5">
      {products?.map((product) => (
        <div
          key={product?._id}
          className="bg-gray-800 rounded-lg overflow-hidden shadow-xl"
        >
          <figure>
            <img
              className="w-full h-44 object-cover object-center"
              src={product?.imageURL}
              alt={product?.displayName}
            />
          </figure>
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-2">
              {product?.productName}
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Price: {product?.productPrice} <br />
              Category: {product?.ProductType} <br />
              Quantity: {product?.productQuantity} <br />
            </p>
            <div className="flex justify-end">
              <Link
                to={`/product/${product?._id}`}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
