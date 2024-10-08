import React from 'react';
import '../style/Profile.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { CiCirclePlus } from "react-icons/ci";
const Profile = () => {
    return (
      <>
      <Navbar/>
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
                <p>Mobile : XXXXXXX262</p>
                <button className='profile_page_button'>✏️Edit</button>
            </div>

            <div className="profile_right_div">

            <div className="profile_right_upper">
            <div className="saved-cards">
                <h3>Saved Cards</h3>
                <button className="profile_page_add_button"><CiCirclePlus></CiCirclePlus></button>
                <p>No record Found.</p>
            </div>

            <div className="saved-cards">
                <h3>Saved Address</h3>
                <button className="profile_page_add_button"><CiCirclePlus></CiCirclePlus></button>
                <p>No record Found.</p>
            </div>

            </div>

            <div className="order-details">
                <h3>Order Details</h3>
                <p>No recent orders.</p>
            </div>
        </div>
        </div>
        <Footer/>
        </>
    );
};

export default Profile;
