import React from 'react';
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import '../style/Navbar.css';
import Logo from './Logo';
import LoggedIn from './LoggedIn';
import NotLoggedIn from './NotLoggedIn';
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Logo/>

        <ul className="navbar-menu">
          <li className="navbar-item search-container">
            <input type="text" placeholder="Search for products..." className="search-box" />
            <button className="search-button"><FaSearch /></button>
          </li>
            <LoggedIn/>
          <li className="navbar-item">
            <a href="/cart" className="navbar-link cart"><FaShoppingCart/></a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
