import { useEffect, useState } from "react";
import useGetCardData from "../../Hook/useGetCardata";
import useGetAllUserData from "../../Hook/useGetAllUserData";

const CheckOut = () => {
    const { product, productLoading } = useGetCardData();
    const { users } = useGetAllUserData();

    const [selectedUserId, setSelectedUserId] = useState("");
    const [due, setDue] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!productLoading && product) {
            setProducts(product.cardItems.map((item) => ({ ...item, quantity: 1 })));
        }
    }, [productLoading, product]);

    const handleQuantityChange = (event, productId) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity)) {
            setProducts((prevProducts) =>
                prevProducts.map((item) => {
                    if (item._id === productId) {
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                })
            );
        }
    };

    const incrementQuantity = (productId) => {
        setProducts((prevProducts) =>
            prevProducts.map((item) => {
                if (item._id === productId) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            })
        );
    };

    const decrementQuantity = (productId) => {
        setProducts((prevProducts) =>
            prevProducts.map((item) => {
                if (item._id === productId && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            })
        );
    };

    const deleteProduct = (productId) => {
        setProducts((prevProducts) =>
            prevProducts.filter((item) => item._id !== productId)
        );
    };

    const handleCheckout = () => {
        console.log("Selected User ID:", selectedUserId);
        console.log(products);
        products.forEach((item) => {
            console.log(`Item ID: ${item._id}, Quantity: ${item.quantity}, due: ${due}, discount: ${discount}`);
        });
    };

    const subtotal = products.reduce(
        (total, item) => total + item.quantity * parseFloat(item.productPrice),
        0
    );

    return (
        <div>
            <section className="py-12 sm:py-16 lg:pb-20 lg:pt-9">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center">
                        <h1 className="text-2xl font-semibold text-white">
                            Confirm Purchase
                        </h1>
                    </div>
                    <div className="mx-auto mt-8 max-w-2xl md:mt-12">
                        <div className="bg-white shadow">
                            <div className="px-4 py-6 sm:px-8 sm:py-10">
                                <div className="flow-root">
                                    <ul className="-my-8">
                                        {products.map((item) => (
                                            <li
                                                key={item._id}
                                                className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                                            >
                                                <div className="shrink-0">
                                                    <img
                                                        className="h-24 w-24 max-w-full rounded-lg object-cover"
                                                        src={item.imageURL}
                                                        alt={item.productName}
                                                    />
                                                </div>

                                                <div className="relative flex flex-1 flex-col justify-between">
                                                    <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                                        <div className="pr-8 sm:pr-5">
                                                            <p className="text-base font-semibold text-gray-900">
                                                                {item.productName}
                                                            </p>
                                                            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                                                {item.productDescription}
                                                            </p>
                                                        </div>

                                                        <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                                            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                                                $
                                                                {(
                                                                    item.quantity * parseFloat(item.productPrice)
                                                                ).toFixed(2)}
                                                            </p>

                                                            <div className="sm:order-1">
                                                                <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                                                    <button
                                                                        onClick={() => decrementQuantity(item._id)}
                                                                        className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <input
                                                                        type="number"
                                                                        value={item.quantity}
                                                                        onChange={(e) =>
                                                                            handleQuantityChange(e, item._id)
                                                                        }
                                                                        className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase"
                                                                        style={{
                                                                            "-moz-appearance": "textfield",
                                                                            appearance: "textfield",
                                                                            width: "100%",
                                                                            border: "none",
                                                                            outline: "none",
                                                                            resize: "none",
                                                                            padding: "0",
                                                                            textAlign: "center",
                                                                        }}
                                                                    />
                                                                    <button
                                                                        onClick={() => incrementQuantity(item._id)}
                                                                        className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                                        <button
                                                            type="button"
                                                            onClick={() => deleteProduct(item._id)}
                                                            className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                                                        >
                                                            <svg
                                                                className="h-5 w-5"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M6 18L18 6M6 6l12 12"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-6 border-t border-b py-2">
                                    <div className="flex justify-between">
                                        <div className="text-center">
                                            <div className="flex items-center justify-center">
                                                <label htmlFor="userSelect" className="mr-2">
                                                    Select User:
                                                </label>
                                                <select
                                                    id="userSelect"
                                                    onChange={(e) => setSelectedUserId(e.target.value)}
                                                    className="px-4 py-2 border rounded-md bg-gray-100"
                                                >
                                                    <option value="">Select a User</option>
                                                    {users
                                                        .filter((user) => user.userRole === "user")
                                                        .map((user) => (
                                                            <option key={user._id} value={user._id}>
                                                                {user.displayName}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-center">
                                                <label htmlFor="due" className="mr-2">
                                                    Due (if any):
                                                </label>
                                                <input
                                                    id="due"
                                                    onChange={(e) => setDue(parseInt(e.target.value))}
                                                    className="px-2 w-24 py-2 border rounded-md bg-gray-100"
                                                >
                                                </input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" border-b py-2">
                                    <div>
                                        <div className="flex items-center justify-center">
                                            <label htmlFor="due" className="mr-2">
                                                Discount Ammout (if any):
                                            </label>
                                            <input
                                                id="due"
                                                onChange={(e) => setDiscount(parseInt(e.target.value))}
                                                className="px-2 w-36 py-2 border rounded-md bg-gray-100"
                                            >
                                            </input>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 border-t border-b py-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-400">Total Cost</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            ${subtotal.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-400">Discount</p>

                                        {
                                            discount > 0 ? <p className="text-lg font-semibold text-gray-900">${discount}.00</p> : <p className="text-lg font-semibold text-gray-900">$00.00</p>
                                        }
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-400">Due Ammount</p>

                                        {
                                            due > 0 ? <p className="text-lg font-semibold text-gray-900">${due}.00</p> : <p className="text-lg font-semibold text-gray-900">$00.00</p>
                                        }
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">Total Ammount</p>
                                    <p className="text-2xl font-semibold text-gray-900">
                                        <span className="text-xs font-normal text-gray-400">
                                            USD
                                        </span>{" "}
                                        {
                                            due > 0 ? <div>{
                                                discount > 0 ? <div>
                                                    {
                                                        subtotal - (discount+due) < 0 ? <div><h3><span className="text-xl text-red-600">Invalid amout</span></h3></div>: <div>{(subtotal - (discount+due)).toFixed(2)}</div>
                                                    }
                                                </div> : <div>
                                                    {
                                                        subtotal-due < 0 ? <div><h3><span className="text-xl text-red-600">Invalid amout</span></h3></div> : <div>{(subtotal-due).toFixed(2)}</div>
                                                    }
                                                </div>
                                            }</div> 
                                            : 
                                            <div>{
                                                discount > 0 ? <div>
                                                    {
                                                        subtotal - discount < 0 ? <div><h3><span className="text-xl text-red-600">Invalid amout</span></h3></div> : <div>{(subtotal - discount).toFixed(2)}</div>
                                                    }
                                                </div> : <div>{(subtotal).toFixed(2)}</div>
                                            }</div>
                                        }
                                    </p>
                                </div>

                                <div className="mt-6 text-center">
                                    {
                                        subtotal - (discount+due) || subtotal-due || subtotal - discount < 0 ? <button
                                        type="button"
                                        className="group inline-flex w-full items-center justify-center rounded-md bg-[#666666] px-6 py-4 text-lg font-semibold text-white "
                                    >
                                        Checkout
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className=" ml-4 h-6 w-6 "
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </button> : <button
                                        type="button"
                                        onClick={handleCheckout}
                                        className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                                    >
                                        Checkout
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </button>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CheckOut;
