import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '../../style/Modal.css';
import toast from 'react-hot-toast';
import axios from 'axios';


const ChangePassword = ({ closeModal }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');

  const handleSubmit = async() => {
    if (newPassword !== reNewPassword) {
      toast.error("New Password and ReNew Password do not match", {
        duration: 2000,
        position: "top-center",
      });
      return;
    }
    if(newPassword.length < 8){
      toast.error("Password must be at least 8 characters long", {
        duration: 2000,
        position: "top-center",
      });
      return;
    }
    await axios.post("api/v1/users/updatepassword", {
      oldPassword: oldPassword,
      newPassword: newPassword,
      reNewPassword: reNewPassword,
    })
    .then((response) => {
      toast.success("Password changed successfully", {
        duration: 2000,
        position: "top-center",
      });
      closeModal();
    })
    .catch((error) => {
      toast.error("Some error has been occured", {
        duration: 2000,
        position: "top-center",
      });
    });
  };

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'scroll';
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="modal-wrapper" onClick={closeModal}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>Change Password</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div  className="form-group">
            <label className='modalLabel' htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              className='modalInput'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className='modalLabel' htmlFor="newPassword">New Password</label>
            <input
              type="password"
              className='modalInput'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className='modalLabel' htmlFor="reNewPassword">Re-enter New Password</label>
            <input
              type="password"
              className='modalInput'
              value={reNewPassword}
              onChange={(e) => setReNewPassword(e.target.value)}
              required
            />
          </div>
          <button className="model-btn" onClick={handleSubmit}>
            Change Password
          </button>
        </form>
      </div>
    </div>,
    document.querySelector('.myPortalModalDiv')
  );
};

export default ChangePassword;
