import React, { useState } from "react";
import "../style/Profile.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CiCirclePlus } from "react-icons/ci";
import Address_container from "./Address_container";
import ProfileModal from "./Modal/ShowProfileModal";
import AddressModal from "./Modal/ShowAddressModal";

const Profile = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const closeModalprofile = () => setShowProfileModal(false);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const closeModalAddress = () => setShowAddressModal(false);

  const addresses = [
    "Post Jakhania, Ghazipur, Uttar Pradesh",
    "Post Sakaldiha, Chandauli, Uttar Pradesh",
    "Post Ramnagar, Varanasi, Uttar Pradesh",
    "Post Mughalsarai, Chandauli, Uttar Pradesh",
    "Post Mohamdabad, Ghazipur, Uttar Pradesh",
    "Post Niyamatabad, Chandauli, Uttar Pradesh",
    "Post Saidpur, Ghazipur, Uttar Pradesh",
    "Post Pandeypur, Varanasi, Uttar Pradesh",
    "Post Bhadohi, Sant Ravidas Nagar, Uttar Pradesh",
    "Post Zamania, Ghazipur, Uttar Pradesh"
  ];

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-info">
          <img
            src="https://easydrawingguides.com/wp-content/uploads/2017/05/how-to-draw-naruto-featured-image-1200.png"
            alt="Profile"
          />
          <h2>Naruto Uzumaki</h2>
          <p>Date of Birth: 01/01/2000</p>
          <p>Gender: Male</p>
          <p>Email: XYZ@gmail.com</p>
          <p>Mobile: XXXXXXX262</p>
          <button className="profile_page_button" onClick={() => setShowProfileModal(true)}>
            ✏️Edit
          </button>
        </div>
        {showProfileModal && <ProfileModal closeModalprofile={closeModalprofile} />}

        <div className="profile_right_div">
          <div className="profile_right_upper">
            <div className="saved-address">
              <div className="saveed_address_top">
                <h3>Saved Address</h3>
                <div className="profile_page_add_button" onClick={() => setShowAddressModal(true)}>
                  <CiCirclePlus />
                </div>
              </div>

              <div className="saveed_address_buttom">
                {addresses.length > 0 ? (
                  addresses.map((address, index) => (
                    <Address_container key={index} details={address} />
                  ))
                ) : (
                  "No address"
                )}
              </div>
            </div>
          </div>
          {showAddressModal && <AddressModal closeModalAddress={closeModalAddress} />}

          <div className="order-details">
            <h3>Order Details</h3>
            <p>No recent orders.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
