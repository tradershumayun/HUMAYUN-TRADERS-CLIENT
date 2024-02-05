import { useState, useEffect } from "react";
import useAxiosPublic from "../../Components/hook/useAxiosPublic";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const axiosInstance = useAxiosPublic();
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  console.log(productId);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/product/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data: ", error);
      }
    };

    fetchProduct();
  }, [axiosInstance, productId]);

  return (
    <div className="w-11/12 mx-auto max-w-4xl p-8 space-y-5 rounded-xl m-5 text-white">
      <div className="card w-full bg-[#0000005d] rounded-lg shadow-xl">
        <h2 className="text-xl font-semibold text-center pt-4"></h2>
        <figure className="m-4">
          <div className="h-44 w-[500px] rounded-xl bg-base-300">
            <img
              className="h-44 rounded-xl mx-auto"
              src={product?.image}
              alt={product?.title}
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
