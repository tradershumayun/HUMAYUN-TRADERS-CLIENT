import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
import { faSearch,faExclamationCircle  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGetCardData from "../../Hook/useGetCardata";
const AddToCard = () => {
  
  const {product  } = useGetCardData();
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [allProduct, setAllProduct] = useState();
  const { productDataRefrtch } = useGetCardData();

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


  const [loading, setLoading] = useState(false);
  const [noProductFound, setNoProductFound] = useState(false);
 
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
      productDataRefrtch();
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

  const handleCardError = () => {
    console.log('hello');
    Swal.fire({
      title: "Error",
      text: `No item in the card`,
      icon: "error",
    });
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
          <button className="px-4 py-2 bg-blue-900  rounded-xl">
          {
                product.message === 'no item found' ? 
               
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  >
                    <div onClick={()=>handleCardError()} className="indicator text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg> (0)
                    </div>
                  </div>
                : <div>
                  {
                    product?.cardItems?.length ? <NavLink to="/checkOut">
                     
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                      >
                        <div className="indicator text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg> ({product?.cardItems?.length})
                        </div>
                      </div>
                    
                    </NavLink> :  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  >
                    <div onClick={()=>handleCardError()} className="indicator text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg> (0)
                    </div>
                  </div>
                  }
                </div>
              }
          </button>
      </div>

   
    </div>
  );
};

export default AddToCard;
