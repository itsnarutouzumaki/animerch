import React, { useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
function LoggedIn() {
  const [username, setUsername] = useState(' Somenath');
  return (
    <li className="navbar-item dropdown">
      <p href="#" className="navbar-link"><FaRegUserCircle className='dropped_down_icon'/>{ username}</p>
            <ul className="dropdown-menu">
            <li><a href="/option3" className="dropdown-link"><FaRegUserCircle className='dropped_down_icon'/>Profile</a></li>
              <li><a href="/option1" className="dropdown-link"><GiCardboardBoxClosed className='dropped_down_icon'/>Order</a></li>
              <li><a href="/option2" className="dropdown-link"><RiCoupon2Line className='dropped_down_icon'/>Coupon</a></li>
              <li><a href="/option3" className="dropdown-link"><FaRegHeart className='dropped_down_icon'/>Wishlist</a></li>
              <li><a href="/option3" className="dropdown-link"><IoIosNotificationsOutline className='dropped_down_icon'/>Notifications</a></li>
              <li><a href="/option3" className="dropdown-link"><FiLogOut className='dropped_down_icon'/>Logout</a></li>
            </ul>
    </li>
  )
}

export default LoggedIn
