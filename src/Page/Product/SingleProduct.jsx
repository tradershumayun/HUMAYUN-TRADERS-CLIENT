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
    return <p>Loading...</p>; // You can replace this with a loading spinner or any other UI element.
  }

  if (error) {
    return (
      <div className="w-11/12 mx-auto max-w-4xl p-8 space-y-5 rounded-xl m-5 text-white">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto max-w-4xl p-8 space-y-5 rounded-xl m-5 text-white">
      <div className="card w-full bg-[#0000005d] rounded-lg shadow-xl">
        <h2 className="text-xl font-semibold text-center pt-4"></h2>
        <figure className="m-4">
          <div className="h-44 w-[500px] rounded-xl bg-base-300">
            <img
              className="h-44 rounded-xl mx-auto"
              src={product?.imageURL}
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
            Price: ${product?.productPrice} <br />
            Description: {product?.productDescription} <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
