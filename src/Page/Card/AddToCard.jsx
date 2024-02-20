import { Link } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
import { faSearch,faExclamationCircle  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AddToCard = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [allProduct, setAllProduct] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/product");
        setAllProduct(response.data);
      } catch (error) {
        console.error("Error fetching costs:", error);
      }
    };

    fetchData();
  }, [axiosPublic]);
console.log(setAllProduct)


  const [loading, setLoading] = useState(false);
  const [noProductFound, setNoProductFound] = useState(false);

  const plusSvg = `
 <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100px" height="100px" viewBox="0,0,256,256"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(2.56,2.56)"><path d="M13,27c-1.10457,0 -2,0.89543 -2,2c0,1.10457 0.89543,2 2,2c1.10457,0 2,-0.89543 2,-2c0,-1.10457 -0.89543,-2 -2,-2z" fill="#8ba5c4"></path><path d="M77,12c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1z" fill="#f1bc19"></path><path d="M50,13c-20.43454,0 -37,16.56546 -37,37c0,20.43454 16.56546,37 37,37c20.43454,0 37,-16.56546 37,-37c0,-20.43454 -16.56546,-37 -37,-37z" fill="#C73435"></path><path d="M83,11c-2.20914,0 -4,1.79086 -4,4c0,2.20914 1.79086,4 4,4c2.20914,0 4,-1.79086 4,-4c0,-2.20914 -1.79086,-4 -4,-4z" fill="#f1bc19"></path><path d="M87,22c-1.10457,0 -2,0.89543 -2,2c0,1.10457 0.89543,2 2,2c1.10457,0 2,-0.89543 2,-2c0,-1.10457 -0.89543,-2 -2,-2z" fill="#8ba5c4"></path><path d="M81,74c-1.10457,0 -2,0.89543 -2,2c0,1.10457 0.89543,2 2,2c1.10457,0 2,-0.89543 2,-2c0,-1.10457 -0.89543,-2 -2,-2zM15,59c-2.20914,0 -4,1.79086 -4,4c0,2.20914 1.79086,4 4,4c2.20914,0 4,-1.79086 4,-4c0,-2.20914 -1.79086,-4 -4,-4z" fill="#fbcd59"></path><path d="M25,85c-1.10457,0 -2,0.89543 -2,2c0,1.10457 0.89543,2 2,2c1.10457,0 2,-0.89543 2,-2c0,-1.10457 -0.89543,-2 -2,-2z" fill="#8ba5c4"></path><path d="M18.5,51c-1.38071,0 -2.5,1.11929 -2.5,2.5c0,1.38071 1.11929,2.5 2.5,2.5c1.38071,0 2.5,-1.11929 2.5,-2.5c0,-1.38071 -1.11929,-2.5 -2.5,-2.5z" fill="#ffffff"></path><path d="M21,66c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1z" fill="#f1bc19"></path><path d="M80,33c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1z" fill="#ffffff"></path><g><path d="M49.978,66.107l12.838,-12.807h-37.116v-5.6h37.123l-12.916,-12.807l3.729,-3.747l19.374,19.292l-19.328,19.413z" fill="#172554"></path><path d="M53.638,32.136l18.382,18.303l-18.337,18.418l-2.718,-2.746l11.146,-11.119l2.397,-2.391h-3.386h-34.722v-4.2h34.723h3.4l-2.414,-2.394l-11.211,-11.118l2.74,-2.753M53.633,30.156l-4.717,4.74l12.207,12.104h-36.123v7h36.123l-12.133,12.104l4.691,4.74l20.319,-20.409l-20.367,-20.279z" fill="#ffffff"></path></g></g></g></svg>`;

  const handleClick = async (product) => {
    const res = await axiosPublic.post(
      `/card?userEmail=${user.email}`,
      product
    );

    if (res.status === 200 || res.status === 201) {
      Swal.fire({
        title: "Success",
        text: "Congratulations! your product added successfully",
        icon: "success",
      });
    }
    if (res.status === 202) {
      Swal.fire({
        title: "Error",
        text: "Item Already added!",
        icon: "error",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setNoProductFound(false);

      const productName = e.target.elements.productName.value;
      const response = await axiosPublic.get(
        `/product/searchbyName/${productName}`
      );

      if (response.data.length === 0) {
        setNoProductFound(true);
      } else {
         
        setAllProduct(response.data);
      }
    } catch (error) {
      console.error("Error in submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-200 rounded-xl px-4">
      <h3 className="font-normal py-5">Select item you want to sell</h3>
      <hr />
      <form onSubmit={handleSubmit} className="flex w-full  p-4">
        <div className="form-control w-full py-4">
          <div className="input-group mx-auto  gap-2 flex flex-row">
            <input
              required
              type="text"
              name="productName"
              placeholder="Find by product Name"
              className="input input-bordered"
            />
            <button type="submit" className="btn btn-square bg-base-300">
              {loading ? (
                <span className="loading loading-ring loading-lg"></span>
              ) : (
                <FontAwesomeIcon
                  icon={faSearch}
                  className="h-6 mt-2 w-6 text-current "
                />
              )}
            </button>
          </div>
        </div>
      </form>
      {noProductFound ? (
       <div className="text-center py-4">
       <p className="text-red-500">
         <FontAwesomeIcon icon={faExclamationCircle} className="ml-2 text-6xl" /> <p> No products found </p> 
        
       </p>
     </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center">
          {allProduct?.map((product) => (
            <div
              key={product?._id}
              className="card w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow relative hover:shadow-lg"
            >
              <Link
                to={`/product/${product?._id}`}
                title="click for product detail page"
              >
                <div>
                  <img
                    className="h-48 w-72 mx-auto max-w-full p-4 rounded-lg object-cover"
                    src={product?.imageURL}
                    alt="product image"
                  />
                </div>
              </Link>
              <div className="px-5 pb-5">
                <div className="flex items-center justify-between pt-5">
                  <h5 className="text-sm font-semibold tracking-tight">
                    {product.productName}
                  </h5>

                  <span className="text-xs font-medium text-red-800">
                    {product.productPrice} BDT
                  </span>
                </div>

                <div className="flex items-center justify-between pt-5">
                  <span className="text-xs font-medium text-gray-800 dark:text-white">
                    {product.productQuantity} unit
                  </span>
                  <button
                    onClick={() => handleClick(product)}
                    className="uppercase text-white btn bg-[#C73435] btn-sm text-xs font-light hover:bg-red-800"
                  >
                    Add to cart
                  </button>
                </div>

                <div className=" text-sm text-left text-slate-600 py-2">
                  {product.productDescription.slice(0, 40)}...
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="fixed bottom-8 right-8 transition-all duration-300">
        <Link to="/checkOut">
          <button className="px-4 py-2   ">
            <span dangerouslySetInnerHTML={{ __html: plusSvg }} />
          </button>
        </Link>
      </div>

   
    </div>
  );
};

export default AddToCard;
