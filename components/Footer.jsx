import React from 'react';
import { FaInstagram ,FaFacebook ,FaXTwitter } from "react-icons/fa6";
import '../style/Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-section about">
          <h2 className="logo">AniMerch</h2>
          <p>
            AniMerch is your ultimate source for all things anime merchandise. 
            We offer a wide range of products including figures, apparel, and accessories.
          </p>
          <div className="contact">
            <span className="fas fa-phone"> +1 234 567 890</span>
            <span className="fas fa-envelope"> info@animerch.com</span>
          </div>
          <div className="socials">
            <a href="#" className="fab fa-facebook"><FaFacebook/></a>
            <a href="#" className="fab fa-twitter"><FaXTwitter/></a>
            <a href="#" className="fab fa-instagram"><FaInstagram/></a>
          </div>
        </div>

        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><Link to="/" className='footerLinks'>Home</Link></li>
            <li><Link to="/" className='footerLinks'>Shop</Link></li>
            <li><Link to="/" className='footerLinks'>About Us</Link></li>
            <li><Link to="/ContactUs" className='footerLinks'>Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 AniMerch. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
