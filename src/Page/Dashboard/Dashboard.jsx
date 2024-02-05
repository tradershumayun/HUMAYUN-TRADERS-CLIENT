import { useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../../components/Shared/Header/Header";
import { AuthContext } from "../../providers/AuthProvider";
import AdminMenu from "./Admin/AdminMenu";
import AgentMenu from "./Agent/AgentMenu";
import UserMenu from "./User/UserMenu";
const isAdmin = true;
const isAgent = true;

const showSuccessAlert = () => {
  Swal.fire({
    icon: "success",
    title: "Log out",
    text: "Successfully logged out",
  });
};

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  const handleSignOut = async () => {
    try {
      await logOut();
      showSuccessAlert();
      navigate(location?.state?.from ? location.state.from : "/");
    } catch (error) {
      console.error(error);
    }
  };
 

  return (
    <div
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-vector/abstract-white-tone-memphis-social-background_53876-113860.jpg)",
        backgroundSize: "cover",
      }}
      className="min-h-screen"
    >
      <Header />
      <div className="lg:h-[300px] bg-cover bg-center relative">
        <div className="container mx-auto">
          <div className=" px-8 lg:p-8">
            <p className="pt-8  text-gray-800">স্বাগতম,</p>
            <h2 className="text-2xl lg:text-4xl font-bold py-2 lg:py-4 text-left text-gray-950  capitalize">
              {isAdmin ? (
                <>অ্যাডমিন ড্যাশবোর্ড,</>
              ) : isAgent ? (
                <> এজেন্ট ড্যাশবোর্ড,</>
              ) : (
                <> ব্যবহারকারী,</>
              )}
            </h2>
          </div>
        </div>
 
      </div>
      <div className="flex flex-col lg:flex-row w-full container mx-auto  gap-5 ">
        <div className="w-full lg:w-1/3  p-4  sticky top-10">
          <div className="justify-around p-4 text-center rounded-lg lg:-mt-32 bg-[#172554] w-full mx-auto ">
            <p className="text-white"> Email : {user?.email} </p>
            <img
              src={user?.displayPhotoURL}
              alt={user?.displayName}
              className=" h-44 mx-auto rounded-full aspect-square"
            />
            <div className="space-y-4 text-center divide-y">
              <div className="my-4 space-y-1">
                <h2 className="text-xl font-semibold sm:text-2xl text-white">
                  {/* {displayName} */}
                </h2>
              </div>
              <button onClick={handleSignOut} className="btn btn-info  px-8">
                Log Out
              </button>
            </div>
          </div>
          <div className="justify-around p-8 gap-9 text-center rounded-lg  my-8 bg-[#172554] w-full mx-auto   ">
            <div className=" ">
              {isAdmin ? (
                <>
                  <AdminMenu />
                </>
              ) : isAgent ? (
                <>
                  <AgentMenu />
                </>
              ) : (
                <>
                  <UserMenu />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/3 p-4  sticky top-10  ">
          <div className="w-full justify-around p-8 gap-9 text-center rounded-lg lg:-mt-32 bg-[#172554]  ">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;