import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
    <div className="container mx-auto my-8">
      <div className="bg-gray-800 text-white rounded-lg p-8 shadow-xl">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-semibold">{product?.productName}</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <img
            className="w-full h-auto rounded-lg mb-4"
            src={product?.imageURL}
            alt={product?.displayName}
          />
          <div className="text-lg">
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {product?.productType}
            </p>
            <p>
              <span className="font-semibold">Quantity:</span>{" "}
              {product?.productQuantity}
            </p>
            <p>
              <span className="font-semibold">Price:</span>{" "}
              ${product?.productPrice}
            </p>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {product?.productDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
