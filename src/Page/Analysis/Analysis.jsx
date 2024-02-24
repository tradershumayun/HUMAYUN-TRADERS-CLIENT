
const Analysis = () => {

    const sellData = [
        {
            "_id": "65d372a56e2bc190b3d39558",
            "totalSellAmmount": 70215,
            "monthlySellAmount": [{ "month": "2024-02", "totalAmmount": 70215 }],
            "yearlySellAmount": [{ "year": "2024", "totalAmount": 70215 }],
            "companyInfo": "adminCollection",
            "dailySellAmmount": [{ "day": "2024-02-23", "totalAmmount": "0" }, { "day": "2024-02-24", "totalAmmount": 3300 }]
        }
    ];

    const { totalSellAmmount, monthlySellAmount, yearlySellAmount, dailySellAmmount } = sellData[0];

    const formatMonth = (monthString) => {
        const date = new Date(monthString);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${month} ${year}`;
    };

    const formatDateForDaily = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    return (
        <div className="p-4 text-white">
            <h2 className="text-2xl font-bold mb-4">Sell History</h2>

            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Total Sell Amount:</h3>
                <table className="table-auto border-collapse w-full">
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">{totalSellAmmount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-semibold m-2">Daily Sell Amount:</h3>
                <table className="table-auto border-collapse w-full">
                    <tbody>
                        {dailySellAmmount.map(dayData => (
                            <tr key={dayData.day}>
                                <td className="border px-4 py-2">{formatDateForDaily(dayData.day)}</td>
                                <td className="border px-4 py-2">{dayData.totalAmmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Monthly Sell Amount:</h3>
                <table className="table-auto border-collapse w-full">
                    <tbody>
                        {monthlySellAmount.map(monthData => (
                            <tr key={monthData.month}>
                                <td className="border px-4 py-2">{formatMonth(monthData.month)}</td>
                                <td className="border px-4 py-2">{monthData.totalAmmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Yearly Sell Amount:</h3>
                <table className="table-auto border-collapse w-full">
                    <tbody>
                        {yearlySellAmount.map(yearData => (
                            <tr key={yearData.year}>
                                <td className="border px-4 py-2">{yearData.year}</td>
                                <td className="border px-4 py-2">{yearData.totalAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Analysis; 