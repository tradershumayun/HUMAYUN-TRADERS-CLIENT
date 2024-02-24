import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const Invoice = () => {
    const { id } = useParams()
     
    const axiosSecure = useAxiosSecure();

    const { data = [] } = useQuery({
        queryKey: ["memo", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/sell/memo?memoId=${id}`);
            return res.data;
        },
    });
    

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
            <div className="text-center">
                <h1 className="text-3xl font-semibold">Humayun Traders</h1>
                <p className="text-gray-500">Adderss :Danmohol ,college road ,kendua ,netrokona</p>
                <p className="text-gray-500">Contuct no : +8801713513659,01973513659 </p>
                <p className="text-gray-500">Date: {data?.date}</p>
            </div>
            <div className="flex justify-between mt-6">
                <div className="w-1/2 pr-4">
                    <h2 className="text-xl font-semibold mb-2">Customer Details</h2>
                    <p>Customer Name: {data.agetName}</p>
                    <p>address ,phone no</p>
                    {/* Add more customer details as needed */}
                </div>
             
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Invoice Items</h2>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2">Item</th>
                                <th className="py-2">Description</th>
                                <th className="py-2">Quantity</th>
                                <th className="py-2">Price</th>
                                <th className="py-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.purchesProducts?.map((product, idx) => <tr key={idx}> <td className="py-2">Item {idx+1}</td>
                                    <td className="py-2">{product.productName}</td>
                                    <td className="py-2">{product.quantity}</td>
                                    <td className="py-2">{product.unitPrice}</td>
                                    <td className="py-2">{product.unitPrice * product.quantity}</td> </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="  pl-4">
                     <hr />
                   
                    <p className=" text-right">Total Amount: {data.totalCost} TK</p>
                    <p className=" text-right">Total Paid: {data.paid} TK</p>
                    {
                        data.dueAmmount > 0 && <p className=" text-right">Due: {data.dueAmmount} TK</p>
                    } 
                    {
                        data.dueAmmount > 0 && <p className=" text-right">Total Due: {data.dueAmmount} TK</p>
                    }
                    {/* Add more billing details as needed */}
                </div>
                <p className=" text-left">Received by -----------------</p>
            <div className="text-center mt-6 italic text-gray-600">
                <p>Thank you for your business!</p>
            </div>
        </div>
    );
};

export default Invoice;
