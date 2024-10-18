import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FiLogIn } from "react-icons/fi";
import { SiGnuprivacyguard } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
function NotLoggedIn() {
  return (
    <li className="navbar-item dropdown">
      <p href="#" className="navbar-link"><FaRegUserCircle className='dropped_down_icon'/> Login</p>
            <ul className="dropdown-menu">
              <li><Link to="/login" className="dropdown-link"><FiLogIn className='dropped_down_icon'/>Login </Link></li>
              <li><Link to="/register" className="dropdown-link"><SiGnuprivacyguard className='dropped_down_icon'/> Register </Link></li>
              <li><Link to="/profile" className="dropdown-link"><CgProfile className='dropped_down_icon'/> Profile </Link></li>
            </ul>
    </li>
  )
}

export default NotLoggedIn
