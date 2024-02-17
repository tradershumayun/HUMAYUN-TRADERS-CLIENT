import { NavLink } from "react-router-dom";
import { FaBeer, FaMoneyBill, FaUser, FaChartBar } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <NavLink to="/analysis">
          <li className="btn btn-primary text-white w-full">
            <FaChartBar className="mr-2" />
            Analysis
          </li>
        </NavLink>
        <NavLink to="/manageProduct">
          <li className="btn btn-primary text-white w-full">
            <FaBeer />
            Manage Product
          </li>
        </NavLink>

        <NavLink to="/cost">
          <li className="btn btn-primary text-white w-full">
            <FaMoneyBill />
            Manage Cost
          </li>
        </NavLink>

        <NavLink to="/user">
          <li className="btn btn-primary text-white w-full">
            <FaUser />
            Manage User
          </li>
        </NavLink>
        <NavLink to="/addToCard">
          <li className="btn   btn-primary text-white  w-full">
            <img
              src="https://pixner.net/egamlio/main/assets/images/icon/dashboard-menu-4.png"
              alt=""
            />
            For Sell
          </li>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
