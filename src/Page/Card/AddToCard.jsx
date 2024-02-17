import { NavLink } from "react-router-dom";
import useAllProductData from "../../Hook/useAllProductData";

const AddToCard = () => {

    const {allProduct, productLoading, productDataRefrtch, isPending} = useAllProductData();
    console.log(allProduct)

    return (
        <div>
            <h3 className="text-white">add to card comming soon</h3>
            <div className="grid grid-cols-2 gap-4 justify-items-center">


                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img className="p-8 rounded-t-lg" src="/docs/images/products/apple-watch.png" alt="product image" />
                    </a>
                    <div className="px-5 pb-5">
                        <a href="#">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
                        </a>
                    
                        <div className="flex items-center justify-between pt-5">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                            <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                        </div>
                    </div>
                </div>
            </div>
            <NavLink className='text-white' to="/checkOut">Check Out Page</NavLink>
        </div>
    );
};

export default AddToCard;