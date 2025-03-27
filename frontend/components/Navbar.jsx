import React, { useState } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import "../style/Navbar.css";
import Logo from "./Logo";
import LoggedIn from "./LoggedIn";
import NotLoggedIn from "./NotLoggedIn";
import { Link } from "react-router-dom";

function Navbar() {
  const [profile, setProfile] = useState(
    localStorage.getItem("profile") || null
  );
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Logo />

        <ul className="navbar-menu">
          <li className="navbar-item search-container">
            <input
              type="text"
              placeholder="Search for products..."
              className="search-box"
            />
            <button className="search-button">
              <FaSearch />
            </button>
          </li>
          {profile === null ? (
            <NotLoggedIn />
          ) : (
            <LoggedIn profile={profile} setProfile={setProfile} />
          )}
          {profile && (
            <li className="navbar-item">
              <Link to="/cart" className="navbar-link cart">
                <FaShoppingCart />
              </Link>
            </li>
          ) }
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
