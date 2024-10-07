import React from 'react';
import '../style/Profile.css';
import Navbar from './Navbar';
import Footer from './Footer';

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
            </div>

            <div className="profile_right_div">

            <div className="profile_right_upper">
            <div className="saved-cards">
                <h3>Saved Cards</h3>
                <p>Card 1: **** **** **** 1234</p>
                <p>Card 2: **** **** **** 5678</p>
                <button>Add New Card</button>
            </div>

            <div className="saved-cards">
                <h3>Saved Address</h3>
                <p>Card 1: **** **** **** 1234</p>
                <p>Card 2: **** **** **** 5678</p>
                <button>Add New Card</button>
            </div>

            </div>

            <div className="order-details">
                <h3>Order Details</h3>
                <p>No recent orders.</p>
                {/* Add more order details here */}
            </div>
        </div>
        </div>
        <Footer/>
        </>
    );
};

export default Profile;
