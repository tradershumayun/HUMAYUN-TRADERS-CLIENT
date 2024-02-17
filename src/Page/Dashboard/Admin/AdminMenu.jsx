import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <NavLink to="/AddProduct">
          <li className="btn   btn-primary text-white  w-full">
            <img
              src="https://pixner.net/egamlio/main/assets/images/icon/dashboard-menu-4.png"
              alt=""
            />
            Add Product
          </li>
        </NavLink>
        <NavLink to="/manageProduct">
          <li className="btn   btn-primary text-white  w-full">
            <img
              src="https://pixner.net/egamlio/main/assets/images/icon/dashboard-menu-4.png"
              alt=""
            />
            Manage Product
          </li>
        </NavLink>
        

        <NavLink to="/cost">
          <li className="btn   btn-primary text-white  w-full">
            <img
              src="https://pixner.net/egamlio/main/assets/images/icon/dashboard-menu-4.png"
              alt=""
            />
            Cost 
          </li>
        </NavLink>
        <NavLink to="/cost">
          <li className="btn   btn-primary text-white  w-full">
            <img
              src="https://pixner.net/egamlio/main/assets/images/icon/dashboard-menu-4.png"
              alt=""
            />
            Contest Submitted Page
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
