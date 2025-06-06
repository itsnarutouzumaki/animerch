import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import '../../style/Modal.css';

const AddressModal = ({ closeModalAddress }) => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'scroll'
    }
  }, [])

  return ReactDOM.createPortal(
    <div className="modal-wrapper" onClick={closeModalAddress}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>Hello World</h2>
        <p>Subscribe to our newsletter and never miss our designs, latest news, etc. Our newsletter is sent once a week, every Monday.</p>
        <button className="model-btn" onClick={closeModalAddress}>Accept It</button>
      </div>
    </div>,
    document.querySelector('.myPortalModalDiv')
  )
}

export default AddressModal
