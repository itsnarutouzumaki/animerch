import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { SiGnuprivacyguard } from "react-icons/si";
function NotLoggedIn() {
  return (
    <li className="navbar-item dropdown">
      <p href="#" className="navbar-link"><FaRegUserCircle className='dropped_down_icon'/> Login</p>
            <ul className="dropdown-menu">
              <li><a href="/option1" className="dropdown-link"><FiLogIn className='dropped_down_icon'/>Login </a></li>
              <li><a href="/option2" className="dropdown-link"><SiGnuprivacyguard className='dropped_down_icon'/> Register </a></li>
            </ul>
    </li>
  )
}

export default NotLoggedIn
