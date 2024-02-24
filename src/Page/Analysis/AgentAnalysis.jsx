import Marquee from "react-fast-marquee";

const AgentAnalysis = () => {
    return (
        <div className="bg-gradient-to-br from-purple-700 to-blue-600 text-white p-8 rounded-lg shadow-lg">
      <Marquee speed={100}>
        <h2 className="text-3xl font-bold mb-4">Purchase History</h2>
      </Marquee>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Total Purchase Amount:</h3>
        <div className="border border-white rounded-md p-4">
          <p className="text-xl font-semibold">2000 Tk</p>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Total Due:</h3>
        <div className="border border-white rounded-md p-4">
          <p className="text-xl font-semibold">2000 Tk</p>
        </div>
      </div>
    </div>
    );
};

export default AgentAnalysis;