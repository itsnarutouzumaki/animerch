import React from 'react';
import { FaShoppingCart } from "react-icons/fa";
import '../style/Navbar.css'; 
import Logo from './Logo';
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Logo/>

        <ul className="navbar-menu">
          {/* <li className="search_container">
            <input type="text" name="search here" className='searchBox'/>
          </li> */}
          <li className="navbar-item">
            <a href="/" className="navbar-link">Home</a>
          </li>
          <li className="navbar-item">
            <a href="/shop" className="navbar-link">Shop</a>
          </li>
          <li className="navbar-item">
            <a href="/about" className="navbar-link">About Us</a>
          </li>
          <li className="navbar-item">
            <a href="/contact" className="navbar-link">Contact Us</a>
          </li>
          <li className="navbar-item">
            <a href="/cart" className="navbar-link cart"><FaShoppingCart/></a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
