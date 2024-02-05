import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="flex flex-col gap-4">
      <NavLink to="/Dashboard/Registered">
        <li className="btn   btn-primary text-white  w-full">
          <img
            src="https://pixner.net/egamlio/main/assets/images/icon/dashboard-menu-4.png"
            alt=""
          />
          My Registered Contest
        </li>
      </NavLink>
    </div>
  );
};

export default UserMenu;
