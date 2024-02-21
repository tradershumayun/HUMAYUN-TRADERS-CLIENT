import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const ProductDetail = () => {
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

  const handleSwalNotification = (status) => {
    let title, text, icon;

    if (status === 200 || status === 201) {
      title = "Success";
      text = "Congratulations! Your product was added successfully";
      icon = "success";
    } else if (status === 202) {
      title = "Error";
      text = "Item already added!";
      icon = "error";
    }

    Swal.fire({
      title,
      text,
      icon,
    });
  };

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
            className="w-64 mx-auto"
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
          </p>
          <p>
            <span className="font-bold text-blue-500">Product Quantity: </span>
            {product?.productQuantity}
          </p>
          <p>
            <span className="font-bold text-blue-500">Product Type: </span>
            {product?.ProductType}
          </p>
          <p>
            <span className="font-bold text-blue-500">
              Product Description:{" "}
            </span>
            {product?.productDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
