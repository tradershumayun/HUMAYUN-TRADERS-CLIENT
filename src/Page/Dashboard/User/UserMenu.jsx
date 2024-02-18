import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="flex flex-col gap-4">
      <NavLink to="/profile">
        <li className="btn   btn-primary text-white  w-full">
            
         Profile
        </li>
      </NavLink>
    </div>
  );
};

export default UserMenu;
