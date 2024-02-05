import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    fetch("http://localhost:5000/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          title: "Product add ",
          text: "You clicked the button!",
          icon: "success"
        });
      });
  };

  return (
    <div className="w-11/12 mx-auto max-w-4xl p-8 space-y-3 rounded-xl m-5 text-white">
      <h1 className="text-2xl font-bold text-center">Add a Product</h1>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1 text-sm">
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
          <label className="block dark-text-gray-400">Image URL</label>
          <input
            {...register("image", { required: "Image URL is required" })}
            type="text"
            className="w-full bg-white text-black px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
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
