import React from 'react';
import '../style/Logo.css';
import { Link } from 'react-router-dom';


function Logo() {
  return (
      <Link to="/" className='Logo_link'><img src="https://previews.dropbox.com/p/thumb/ACWfs93Y4RMfRFMhX0uXWcfxYnBhXg7QA5bR72ufI7nlABBWR2Ow_lzO8tG3gZDJqrJlFYYooPxUD1ZRkDlhX8WiugCe9_d4wlbdLaD3rbNmbwfNmJM5hfA_COUTqxfBh7Yi5WJ5X5x8BW6kIQ5dGrqbOeYBHr3zuKJDsgG3XbVMGKN3nExTfjam1Sbd_2lJTNMF6FHTk0if1mt77QVCOUAYR58Di0X1dHn0f9URtM6wAR9RTwHpIeKhloFsaIpJ8vqZvCo3HPIKRaO8-M-J9YryZQubAKb0Iaambc0q1CKwPx_kGN2paOAGTbwBIyrYoWJGe_eM7K1H0QmZgJxSskec/p.png?is_prewarmed=true" alt="logo" className='logo_img'/></Link>
  );
}

export default Logo;
