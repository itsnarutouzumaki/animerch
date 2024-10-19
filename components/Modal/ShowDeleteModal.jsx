import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../../style/Modal.css';

const DeleteModal = ({ closeModalDelete, addressDetails }) => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'scroll';
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="modal-wrapper" onClick={closeModalDelete}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2 style={{ color: 'red' }}>Delete</h2>
        <p>Are you sure you want to delete the address?</p>
        <span>{addressDetails}</span>
        <div>
        <button className="model-btn" onClick={closeModalDelete} style={{ marginRight: '20px' }}>
          Yes
        </button>
        <button className="model-btn" onClick={closeModalDelete} style={{ marginLeft: '20px' }}>
          No
        </button>
        </div>
      </div>
    </div>,
    document.querySelector('.myPortalModalDiv')
  );
};

export default DeleteModal;
