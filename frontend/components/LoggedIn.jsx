import React,{useState} from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import ChangePassword from "./Modal/ChangePasswordModal";

function LoggedIn({ profile, setProfile }) {
  const logoutRequest = async () => {
    setProfile(null);
    localStorage.removeItem("profile");
    try {
      await axios.post("api/v1/users/logout");
      toast.success("You logged out successfully", {
        duration: 2000,
        position: "top-center",
      });
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`, {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false)

  return (
    <li className="navbar-item dropdown">
      <div type="button" className="navbar-link">
        <FaRegUserCircle className="dropped_down_icon" />
        {profile}
      </div>
      <ul className="dropdown-menu" role="menu">
        <li>
          <Link to='/profile' className="dropdown-link">
            <FaRegUserCircle className="dropped_down_icon" />
            Profile
          </Link>
        </li>
        <li>
          <Link
            onClick={()=>setShowPasswordChangeModal(true)}
            className="dropdown-link"
          >
            <RiLockPasswordLine className="dropped_down_icon" />
            Change Password
          </Link>
        </li>
        <li>
          <Link
            onClick={logoutRequest}
            className="dropdown-link"
          >
            <FiLogOut className="dropped_down_icon" />
            Logout
          </Link>
        </li>
      </ul>

      {showPasswordChangeModal && <ChangePassword closeModal={()=>setShowPasswordChangeModal(false)} />}
    </li>
  );
}

export default LoggedIn;
