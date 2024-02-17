import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">
     
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
           Manage Cost 
          </li>
        </NavLink>
        <NavLink to="/user">
          <li className="btn   btn-primary text-white  w-full">
            <img
              src="https://pixner.net/egamlio/main/assets/images/icon/dashboard-menu-4.png"
              alt=""
            />
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
