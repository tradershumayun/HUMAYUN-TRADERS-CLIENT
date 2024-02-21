
const Invoice = () => {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
            <div className="text-center">
                <h1 className="text-3xl font-semibold">Invoice</h1>
                <p className="text-gray-500">Date: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex justify-between mt-6">
                <div className="w-1/2 pr-4">
                    <h2 className="text-xl font-semibold mb-2">Customer Details</h2>
                    <p>Customer Name: John Doe</p>
                    <p>Email: john.doe@example.com</p>
                    {/* Add more customer details as needed */}
                </div>
                <div className="w-1/2 pl-4">
                    <h2 className="text-xl font-semibold mb-2">Billing Details</h2>
                    <p>Invoice Number: 123456</p>
                    <p>Total Amount: $100.00</p>
                    {/* Add more billing details as needed */}
                </div>
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Invoice Items</h2>
                <table className="w-full border-collapse">
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
                        <tr>
                            <td className="py-2">Item 1</td>
                            <td className="py-2">Description 1</td>
                            <td className="py-2">2</td>
                            <td className="py-2">$50.00</td>
                            <td className="py-2">$100.00</td>
                        </tr>
                        {/* Add more rows for additional items */}
                    </tbody>
                </table>
            </div>
            <div className="text-center mt-6 italic text-gray-600">
                <p>Thank you for your business!</p>
            </div>
        </div>
    );
};

export default Invoice;
