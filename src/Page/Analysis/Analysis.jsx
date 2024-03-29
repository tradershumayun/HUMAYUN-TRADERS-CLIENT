import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Marquee from "react-fast-marquee";

const Analysis = () => {

  const axiosSecure = useAxiosSecure();
  const { data: sellData = [] } = useQuery({
    queryKey: ["sellInfo"],
    queryFn: async () => {
      const res = await axiosSecure.get("/sell/allSell");
      return res.data;
    },
  });

  const { data: costData = [] } = useQuery({
    queryKey: ["costData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/cost");
      return res.data;
    },
  });

  const { data: moneyData = [] } = useQuery({
    queryKey: ["moneyData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/money");
      return res.data;
    },
  });

  const dailyCosts = costData.filter(item => item.costType === "Daily");
  const dailyMoney = moneyData.filter(item => item.costType === "Daily");


  const monthlyCosts = costData.reduce((acc, current) => {
    const monthYear = new Date(current.costDate).toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[monthYear]) {
      acc[monthYear] = {
        monthYear: monthYear,
        totalCost: 0
      };
    }
    acc[monthYear].totalCost += current.cost;
    return acc;
  }, {});

  const monthlyMoney = moneyData.reduce((acc, current) => {
    const monthYear = new Date(current.costDate).toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[monthYear]) {
      acc[monthYear] = {
        monthYear: monthYear,
        totalCost: 0
      };
    }
    acc[monthYear].totalCost += parseInt(current.Money);
    return acc;
  }, {});

  // Convert the grouped data into an array of objects
  const monthlyCostsArray = Object.values(monthlyCosts);
  const monthlyMoneyArray = Object.values(monthlyMoney);

  const { totalSellAmmount, monthlySellAmount, yearlySellAmount, dailySellAmmount } = sellData;


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

  const formatDateCost = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatDateForMonth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {  month: 'long', year: 'numeric' });
  };

  return (
    <div className="p-4 text-white">
      <Marquee speed={100}>
        <h2 className="text-2xl font-bold ">Sell History</h2>
      </Marquee>

      <hr />

      <div className="mb-8 pt-6">
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
            {dailySellAmmount?.slice(0, 30).reverse().map(dayData => (
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
            {monthlySellAmount?.map(monthData => (
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
            {yearlySellAmount?.map(yearData => (
              <tr key={yearData.year}>
                <td className="border px-4 py-2">{yearData.year}</td>
                <td className="border px-4 py-2">{yearData.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">Daily Costs</h2>
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-black">Date</th>
                <th className="px-4 py-2 text-black">Amount</th>
              </tr>
            </thead>
            <tbody>
              {dailyCosts.map(cost => (
                <tr key={cost._id}>
                  <td className="border px-4 py-2">{formatDateCost(cost.costDate)}</td>
                  <td className="border px-4 py-2">{cost.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Monthly Costs</h2>
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-black">Month</th>
                <th className="px-4 py-2 text-black">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {monthlyCostsArray.map(cost => (
                <tr key={cost.monthYear}>
                  <td className="border px-4 py-2">{formatDateForMonth(cost.monthYear)}</td>
                  <td className="border px-4 py-2">{cost.totalCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Daily Money</h2>
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-black">Date</th>
                <th className="px-4 py-2 text-black">Amount</th>
              </tr>
            </thead>
            <tbody>
              {dailyMoney.map(cost => (
                <tr key={cost._id}>
                  <td className="border px-4 py-2">{formatDateCost(cost.costDate)}</td>
                  <td className="border px-4 py-2">{parseInt(cost.Money)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Monthly Money</h2>
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-black">Month</th>
                <th className="px-4 py-2 text-black">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {monthlyMoneyArray.map(cost => (
                <tr key={cost.monthYear}>
                  <td className="border px-4 py-2">{formatDateForMonth(cost.monthYear)}</td>
                  <td className="border px-4 py-2">{cost.totalCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analysis; 