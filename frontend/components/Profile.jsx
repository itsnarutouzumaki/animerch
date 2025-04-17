import React, { useEffect, useState } from "react";
import "../style/Profile.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CiCirclePlus } from "react-icons/ci";
import Address_container from "./Address_container";
import ProfileModal from "./Modal/EditProfileModal";
import AddressModal from "./Modal/AddAddressModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const closeModalprofile = () => setShowProfileModal(false);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const closeModalAddress = () => setShowAddressModal(false);

  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  // useEffect(() => {
  //   if (localStorage.getItem("profile") == null) {
  //     navigate("/login");
  //     return;
  //   }

  //   const fetchProfile = async () => {
  //     try {
  //       const response = await axios.get("/api/v1/users/profile");
  //       console.log(response);
  //       setProfile(response.data.data);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  if (profile == null) return <div>Loading...</div>;
  const addresses = profile.addresses;

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
          <p>Gender: Unknown</p>
          <p>Email: XYZ@gmail.com</p>
          <p>Mobile: XXXXXXX262</p>
          <button
            className="profile_page_button"
            onClick={() => setShowProfileModal(true)}
          >
            ✏️Edit
          </button>
          <button
            className="profile_page_button"
            style={{ margin: 10 }}
            onClick={() => setShowProfileModal(true)}
          >
            ✏️Edit Image
          </button>
        </div>
        {showProfileModal && (
          <ProfileModal closeModalprofile={closeModalprofile} />
        )}

        <div className="profile_right_div">
          <div className="profile_right_upper">
            <div className="saved-address">
              <div className="saveed_address_top">
                <h3>Saved Address</h3>
                <div
                  className="profile_page_add_button"
                  onClick={() => setShowAddressModal(true)}
                >
                  <CiCirclePlus />
                </div>
              </div>

              <div className="saveed_address_buttom">
                {addresses.length > 0
                  ? addresses.map((address, index) => (
                      <Address_container key={index} details={address} />
                    ))
                  : "No address"}
              </div>
            </div>
          </div>
          {showAddressModal && (
            <AddressModal closeModalAddress={closeModalAddress} />
          )}

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
