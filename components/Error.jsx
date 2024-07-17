import React from 'react'
import '../style/Error.css';
import { MdErrorOutline } from "react-icons/md";
function error() {
  return (
    <div className='Error_container'>
      <MdErrorOutline className="icon_error"/>
      <p className="error_message">
      Oops! Page is not found.
      </p>
    </div>
  )
}

export default error
