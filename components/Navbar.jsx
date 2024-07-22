import React from 'react';
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import '../style/Navbar.css'; 
import Logo from './Logo';

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
          <li className="navbar-item dropdown">
            <a href="#" className="navbar-link">Dropdown</a>
            <ul className="dropdown-menu">
              <li><a href="/option1" className="dropdown-link">Option 1</a></li>
              <li><a href="/option2" className="dropdown-link">Option 2</a></li>
              <li><a href="/option3" className="dropdown-link">Option 3</a></li>
            </ul>
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
