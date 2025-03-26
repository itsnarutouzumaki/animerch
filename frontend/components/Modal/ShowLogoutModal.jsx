import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios';
import '../../style/Modal.css';
import axios from 'axios';

const LogoutModal = ({ closeModalLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'scroll'
    }
  }, [])
  const logoutRequest = () => {
    axios.post('/api/v1/users/logout').then((response) => {
      console.log(response.data.message);
      navigate("/login");
    }).catch((error) => {
      console.log(error);
    });
    closeModalLogout()
  }
  return ReactDOM.createPortal(
    <div className="modal-wrapper" onClick={closeModalLogout}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <p>Are you sure want to logout?</p>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <button className="model-btn" onClick={logoutRequest}>Yes</button>
        <button className="model-btn" onClick={closeModalLogout}>No</button>
        </div>
        
      </div>
    </div>,
    document.querySelector('.myPortalModalDiv')
  )
}

export default LogoutModal
