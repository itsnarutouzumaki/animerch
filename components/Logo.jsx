import React from 'react';
import '../style/Logo.css';


function Logo() {
  return (
    <div className="logo-container">
      <a href="/"><img src="../assets/logo_img.png" alt="logo" className='logo_img'/></a>
    </div>
  );
}

export default Logo;
