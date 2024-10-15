import React from 'react';
import { CiEdit } from "react-icons/ci";
import '../style/Address_container.css';
import { MdDeleteForever } from "react-icons/md";
function Address_container() {
  return (
    <div className="Address_container_div">
      <div className="address_details">
        <p>VIll post Hingutar garh ,Chandauli ,Uttar pardesh, 232105</p>
      </div>
      <div className="address_button">
        <button><CiEdit /></button>
        <button><MdDeleteForever/></button>
      </div>
    </div>
  )
}

export default Address_container
