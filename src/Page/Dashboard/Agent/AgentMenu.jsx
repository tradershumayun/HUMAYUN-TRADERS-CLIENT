import { NavLink } from "react-router-dom";

const AgentMenu = () => {
  return (
    <div className="flex flex-col gap-4">
      <NavLink to="/Dashboard/ManageUser">
        <li className="btn   btn-primary text-white  w-full">
          <img
            src="https://pixner.net/egamlio/main/assets/images/icon/dashboard-menu-3.png"
            alt=""
          />
          Manage User
        </li>
      </NavLink>
      <NavLink to="/Dashboard/ManageContest">
        <li className="btn   btn-primary text-white  w-full">
          <img
            src="https://pixner.net/egamlio/main/assets/images/icon/dashboard-menu-4.png"
            alt=""
          />
          Manage Contest
        </li>
      </NavLink>
    </div>
  );
};

export default AgentMenu;
