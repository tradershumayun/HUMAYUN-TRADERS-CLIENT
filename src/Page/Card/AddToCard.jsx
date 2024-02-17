import { NavLink } from "react-router-dom";
import useAllProductData from "../../Hook/useAllProductData";

const AddToCard = () => {

    const { allProduct, productLoading, productDataRefrtch, isLoading } = useAllProductData();
    console.log(allProduct)

    if (isLoading) {
        return <h3>loading</h3>
    }

    return (
        <div>
            <h3 className="text-white font-bold pb-5">Select item you want to sell</h3>

            <div className="grid grid-cols-2 gap-4 justify-items-center">
                {
                    allProduct.map(product =>  <div key={product._id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div>
                        <img className="h-48 w-72 mx-auto max-w-full p-4 rounded-lg object-cover" src={product.imageURL} alt="product image" />
                    </div>
                    <div className="px-5 pb-5">
                        <a href="#">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.productName}</h5>
                        </a>
                    
                        <div className="flex items-center justify-between pt-5">
                            <span className="text-xl font-bold text-gray-900 dark:text-white">{product.productPrice} BDT</span>
                            <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                        </div>
                    </div>
                    </div> )
                }
            </div>
            <NavLink className='text-white' to="/checkOut"><button className="btn btn-active btn-primary text-white font-semibold mt-5">My Added Product</button></NavLink>
        </div>
    );
};

export default AddToCard;

