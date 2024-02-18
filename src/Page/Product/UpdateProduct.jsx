import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      productName: e.target.productName.value,
      imageURL: e.target.imageURL.value,
      productQuantity: e.target.productQuantity.value,
      productPrice: e.target.productPrice.value,
      productType: e.target.productType.value,
      productDescription: e.target.productDescription.value,
    };
    try {
      const updateRes = await axiosSecure.put(`/product/${id}`, formData);

      if (updateRes.data) {
        navigate("/manageProduct");
        Swal.fire({
          text: updateRes.data.message,
          icon: "success",
          position: "top-right",
          timer: 1000,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: updateRes.data.message,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  return (
    <div className="w-11/12 mx-auto max-w-4xl p-8 space-y-3 rounded-xl m-5 text-white">
      <h1 className="text-2xl font-bold text-center">Update Product</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Product Name</label>
          <input
            type="text"
            name="productName"
            defaultValue={product?.productName}
            className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
          />
        </div>

        {/* Image URL */}
        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Image URL</label>
          <input
            type="text"
            name="imageURL"
            defaultValue={product?.imageURL}
            className="w-full bg-white text-black px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
          />
        </div>

        {/* Product Quantity and Product Price */}
        <div className="flex w-full gap-4 flex-col lg:flex-row">
          <div className="space-y-1 text-sm w-full lg:w-1/2">
            <label className="block dark-text-gray-400">Product Quantity</label>
            <input
              type="number"
              name="productQuantity"
              defaultValue={product?.productQuantity}
              className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
            />
          </div>
          <div className="space-y-1 text-sm w-full lg:w-1/2">
            <label className="block dark-text-gray-400">Product Price</label>
            <input
              type="number"
              name="productPrice"
              defaultValue={product?.productPrice}
              className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
            />
          </div>
        </div>

        {/* Product Type/Tags */}
        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Product Type/Tags</label>
          <select
            name="productType"
            defaultValue={product?.productType}
            className="w-full px-4 py-3 rounded-md text-black"
          >
            {/* Update options based on your product types */}
            <option value="Type1">Type 1</option>
            <option value="Type2">Type 2</option>
            <option value="Type3">Type 3</option>
            <option value="Type4">Type 4</option>
          </select>
        </div>

        {/* Product Description */}
        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">
            Product Description
          </label>
          <textarea
            name="productDescription"
            defaultValue={product?.productDescription}
            className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="block w-full p-3 text-center rounded-xl dark-text-gray-900 dark-bg-violet-400 btn btn-primary"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
