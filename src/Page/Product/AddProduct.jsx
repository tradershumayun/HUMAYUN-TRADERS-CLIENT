import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../Components/hook/useAxiosPublic";

const AddProduct = () => {
  const {
    register, 
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange', 
  });
  const axiosPublic = useAxiosPublic();
  
  const { user } = useContext(AuthContext);

  const apiKey = "ce962703e172614d7c982b1ffcc21721";
  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${apiKey}`;

  const onSubmit = async (data) => {
    const photoURL = data.photoURL[0];
    const imageFile = { image: photoURL };

    try {
      const res = await axios.post(imageHostingApi, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const productData = {
        ...data,
        imageURL: res.data.data.url,
        ownerEmail: user?.email,
      };
 
      const productRes = await axiosPublic.post("/product", productData);


      if (productRes.data) {
        reset({
          productName: "",
          photoURL: "",
          productQuantity: "",
          productPrice: "",
          ProductType: "",
          productDescription: "",
        });

        Swal.fire({
          title: "Product added",
          text: "You clicked the button!",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="rounded-xl  text-white p-8 ">
      <h1 className="text-2xl font-bold text-center">Add a Product</h1>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1 text-sm">
          <p> </p>
          <label className="block dark-text-gray-400">Product Name</label>
          <input
            {...register("productName", {
              required: "Product Name is required",
            })}
            type="text"
            className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
          />
          {errors.productName && (
            <p className="text-red-500">{errors.productName.message}</p>
          )}
        </div>

        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Image  </label>
          <input
            {...register("photoURL", { required: "Image URL is required" })}
            type="file"
            className="w-full bg-white text-black px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
          />
          {errors.photoURL && (
            <p className="text-red-500">{errors.photoURL.message}</p>
          )}
        </div>

        {/* Product Quantity and Product Price */}
        <div className="flex w-full gap-4 flex-col lg:flex-row">
          <div className="space-y-1 text-sm w-full lg:w-1/2">
            <label className="block dark-text-gray-400">Product Quantity</label>
            <input
              {...register("productQuantity", {
                required: "Product Quantity is required",
              })}
              type="number"
              className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
            />
            {errors.productQuantity && (
              <p className="text-red-500">{errors.productQuantity.message}</p>
            )}
          </div>
          <div className="space-y-1 text-sm w-full lg:w-1/2">
            <label className="block dark-text-gray-400">Product Price</label>
            <input
              {...register("productPrice", {
                required: "Product Price is required",
              })}
              type="number"
              className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
            />
            {errors.productPrice && (
              <p className="text-red-500">{errors.productPrice.message}</p>
            )}
          </div>
        </div>

        {/* Product Type/Tags */}
        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Product Type/Tags</label>
          <select
            {...register("ProductType", {
              required: "Product Type is required",
            })}
            className="w-full px-4 py-3 rounded-md text-black"
          >
            <option value="Business">Type 1</option>
            <option value="Business">Type 1</option>
            <option value="Business">Type 1</option>
            <option value="Business">Type 1</option>
          </select>
          {errors.ProductType && (
            <p className="text-red-500">{errors.ProductType.message}</p>
          )}
        </div>

        {/* Product Description */}
        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">
            Product Description
          </label>
          <textarea
            {...register("productDescription", {
              required: "Product Description is required",
            })}
            className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
          />
          {errors.productDescription && (
            <p className="text-red-500">{errors.productDescription.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="block w-full p-3 text-center rounded-xl dark-text-gray-900 dark-bg-violet-400 btn btn-primary"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
