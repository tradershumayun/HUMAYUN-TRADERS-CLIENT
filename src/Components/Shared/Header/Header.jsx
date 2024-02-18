import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../../assets/logo.png";
import { AuthContext } from "../../../providers/AuthProvider";
import "./header.css";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const [dbuser, setDbuser] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/getDeader/${user?.uid}`)

      .then((res) => {
        setDbuser(res.data);
      })
      .catch((error) => {});
  }, [user?.uid]);

  const displayName = user?.displayName || dbuser?.displayName;
  const displayPhotoURL = dbuser?.photoURL || user?.photoURL;
  const handleSignOut = async () => {
    try {
      await logOut();
      toast.info("You are just log out ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error(error);
    }
  };
  const menu = (
    <>
      <li className="flex">
        <NavLink to="/" className="flex items-center px-8 py-3 font-semibold  ">
          Home
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-blue-950 ">
      <div className="navbar  text-white container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52 bg-[#8981D7]"
            >
              {menu}
            </ul>
          </div>
          <Link to="/" className="text-2xl font-bold flex gap-4 ">
            <div className="w-16 mx-auto block rounded-full  ">
              <img src={logo} />
            </div>
            <p className=" hidden lg:flex  lg:text-2xl  my-auto  ">
              {" "}
              মেসার্স হুমায়ুন ট্রেডার্স
            </p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 ">{menu}</ul>
        </div>
        <div className="navbar-end">
          <>
            <ul className="menu menu-horizontal px-1 flex  items-center justify-center">
              <li>
                <NavLink
                  to="/Products"
                  className="flex items-center px-8 py-3  font-semibold  "
                >
                  AllProduct
                </NavLink>
              </li>
              <NavLink to="/checkOut">
                <li>
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  >
                    <div className="indicator text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </li>
              </NavLink>
            </ul>
          </>
        </div>
      </div>
    </div>
  );
};

export default Header;
