import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const SingleProduct = () => {
  const axiosSecure = useAxiosSecure();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosSecure.get(`/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data: ", error);
        setError("Error fetching product data");
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

  return (
    <div className="container mx-auto my-8 text-white">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/2">
          <img
            src={product?.imageURL}
            alt={product?.productName}
            className="w-64 h-64 mx-auto rounded-full  aspect-square"
          />
        </div>
        <div className="w-full lg:w-1/2 text-left mt-4 lg:ml-8">
          <p className="text-xl font-bold mb-4">Product Info: </p>
          <p>
            <span className="font-bold text-blue-500">Name:</span>
            {product?.productName}
          </p>
          <p>
            <span className="font-bold text-blue-500">Product Price: </span>
            {product?.productPrice} TK
          </p>{" "}
          <p>
            <span className="font-bold text-blue-500">Product Quantity: </span>
            {product?.productQuantity}
          </p>{" "}
          <p>
            <span className="font-bold text-blue-500">Product Type: </span>
            {product?.ProductType}
          </p>{" "}
          <p>
            <span className="font-bold text-blue-500">Product Description: </span>
            {product?.productDescription}
          </p>
          <div className="flex gap-4 mt-4">
            <Link>
              <button className="btn btn-warning px-8"> order now </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
