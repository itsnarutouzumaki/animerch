import React from 'react';
import '../style/Logo.css';
import { Link } from 'react-router-dom';


function Logo() {
  return (
      <Link to="/" className='Logo_link'><img src="https://i.pinimg.com/736x/1a/46/35/1a4635dbfdb591c8bc2112655d44225f.jpg" alt="logo" className='logo_img'/></Link>
  );
}

export default Logo;
