import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const UserNavigationPanel = () => {
  const { user, signout } = useAuthContext();
  const logout = async () => {
    try {
      await axios.post("/api/auth/signout");
      signout();
    } catch (error) {
      toast("Faild to sign out try agin later.");
    }
  };

  return (
    <AnimationWrapper
      transition={{ duration: 0.2 }}
      className="absolute right-0 z-50"
    >
      <div className="bg-white absolute right-0 rounded-md shadow-md border border-grey w-60 overflow-hidden duration-200">
        <Link
          to="/editor"
          className="flex gap-2 link  md:hidden pl-8 py-4 border-b border-grey"
        >
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>
        <Link
          to={`/user/${user.userName}`}
          className="flex gap-2 link pl-8 py-4 border-b border-grey"
        >
          <i className="fi fi-rr-user"></i>
          <p>Profile</p>
        </Link>
        <Link
          to="/dashboard/blogs"
          className="flex gap-2 link pl-8 py-4 border-b border-grey "
        >
          <i className="fi fi-rr-dashboard"></i>
          <p>Dashboard</p>
        </Link>
        <Link
          to="/settings/edit-profile"
          className="flex gap-2 link pl-8 py-4 border-b border-[#cccccc]"
        >
          <i className="fi fi-rr-settings"></i>
          <p>Settings</p>
        </Link>
        <button
          className="flex gap-2 link pl-8 py-4 w-full items-center"
          onClick={logout}
        >
          <i className="fi fi-rr-exit"></i>
          <p className="leading-6 font-bold text-black">
            <span className="block">Sign Out</span>
            <span className="text-sm text-dark-grey">@{user.userName}</span>
          </p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;
