import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import "../style/Address_container.css";
import DeleteModal from "./Modal/RemoveAddressModal";

function Address_container({ details }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const closeModalDelete = () => setShowDeleteModal(false);

  return (
    <div className="Address_container_div">
      <div className="address_details">
        <p>{details}</p>
      </div>
      <div className="address_button">
        <button onClick={() => setShowDeleteModal(true)}>
          <MdDeleteForever style={{ fontSize: 24 }} />
        </button>
        {showDeleteModal && (
          <DeleteModal
            closeModalDelete={closeModalDelete}
            addressDetails={details}
          />
        )}
      </div>
    </div>
  );
}

export default Address_container;
