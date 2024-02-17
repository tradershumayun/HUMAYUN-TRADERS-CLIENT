import { NavLink } from "react-router-dom";
import { FaBeer, FaMoneyBill, FaUser,FaChartBar } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">
      <NavLink to="/Dashboard/ManageUser">
        <li className="btn btn-primary text-white w-full">
          <FaChartBar className="mr-2" />
          Analysis
        </li>
      </NavLink>
        <NavLink to="/manageProduct">
          <li className="btn btn-primary text-white w-full">
            <FaBeer  />
            Manage Product
          </li>
        </NavLink>

        <NavLink to="/cost">
          <li className="btn btn-primary text-white w-full">
            <FaMoneyBill  />
            Manage Cost
          </li>
        </NavLink>

        <NavLink to="/user">
          <li className="btn btn-primary text-white w-full">
            <FaUser  />
            Manage User
          </li>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
