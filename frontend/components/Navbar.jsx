import React from 'react';
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import '../style/Navbar.css';
import Logo from './Logo';
import LoggedIn from './LoggedIn';
import NotLoggedIn from './NotLoggedIn';
import { Link } from 'react-router-dom';

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
            <NotLoggedIn/>
          <li className="navbar-item">
            <Link to="/cart" className="navbar-link cart"><FaShoppingCart/></Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
