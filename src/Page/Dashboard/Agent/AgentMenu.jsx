import { NavLink } from "react-router-dom";
import { FaChartBar, FaShoppingBag, FaClipboardList } from "react-icons/fa";

const AgentMenu = () => {
  return (
    <div className="flex flex-col gap-4">
      <NavLink to="/agentAnalysis">
        <li className="btn btn-primary text-white w-full">
          <FaChartBar className="mr-2" />
          Analysis
        </li>
      </NavLink>
      <NavLink to="/buyList">
        <li className="btn btn-primary text-white w-full">
          <FaShoppingBag className="mr-2" />
          My Buy Product list
        </li>
      </NavLink>
      <NavLink to="/orderList">
        <li className="btn btn-primary text-white w-full">
          <FaClipboardList className="mr-2" />
          Show store Product
        </li>
      </NavLink>
    </div>
  );
};

export default AgentMenu;
