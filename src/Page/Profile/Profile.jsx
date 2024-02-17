import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Profile = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div className="text-white">
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
