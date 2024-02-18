import { NavLink } from "react-router-dom";
import useAllProductData from "../../Hook/useAllProductData";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import Swal from "sweetalert2";

const AddToCard = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { allProduct, isLoading } = useAllProductData();

  if (isLoading) {
    return <h3>loading</h3>;
  }

  const handleClick = async (product) => {
    console.log("hello", product, user.email);
    const res = await axiosPublic.post(
      `/card?userEmail=${user.email}`,
      product
    );
    console.log(res);
    if (res.status == 200 || res.status == 201) {
      Swal.fire({
        title: "Success",
        text: "Congratulations! your product added successfully",
        icon: "success",
      });
    }
    if (res.status == 202) {
      Swal.fire({
        title: "Error",
        text: "Item Already added!",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <h3 className="text-white font-bold pb-5">
        Select item you want to sell
      </h3>

      <div className="grid grid-cols-2 gap-4 justify-items-center">
        {allProduct.map((product) => (
          <div
            key={product._id}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div>
              <img
                className="h-48 w-72 mx-auto max-w-full p-4 rounded-lg object-cover"
                src={product.imageURL}
                alt="product image"
              />
            </div>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {product.productName}
                </h5>
              </a>

              <div className="flex items-center justify-between pt-5">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {product.productPrice} BDT
                </span>
                <button
                  onClick={() => handleClick(product)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <NavLink className="text-white" to="/checkOut">
        <button className="btn btn-active btn-primary text-white font-semibold mt-5">
          My Cart
        </button>
      </NavLink>
    </div>
  );
};

export default AddToCard;
