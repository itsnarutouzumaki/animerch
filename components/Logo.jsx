import React from 'react';
import '../style/Logo.css';
import { Link } from 'react-router-dom';


function Logo() {
  return (
      <Link to="/" className='Logo_link'><img src="../assets/logo_img.png" alt="logo" className='logo_img'/></Link>
  );
}

export default Logo;
