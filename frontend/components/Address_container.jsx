import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import "../style/Address_container.css";
import { MdDeleteForever } from "react-icons/md";
import EditModal from "./Modal/ShowEditModal";
import DeleteModal from "./Modal/ShowDeleteModal";

function Address_container({ details }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const closeModalEdit = () => setShowEditModal(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const closeModalDelete = () => setShowDeleteModal(false);

  return (
    <div className="Address_container_div">
      <div className="address_details">
        <p>{details}</p>
      </div>
      <div className="address_button">
        <button onClick={() => setShowEditModal(true)}>
          <CiEdit />
        </button>
        {showEditModal && <EditModal closeModalEdit={closeModalEdit} />}

        <button onClick={() => setShowDeleteModal(true)}>
          <MdDeleteForever />
        </button>
        {showDeleteModal && <DeleteModal closeModalDelete={closeModalDelete} addressDetails={details} />}
      </div>
    </div>
  );
}

export default Address_container;
