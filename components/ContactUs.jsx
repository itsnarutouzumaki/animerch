import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../style/Contact.css";

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="full_screen">
        <div className="container">
          <div className="details_field">
            <div className="input-group">
              <input type="text" name="text" className="input" required />
              <label className="label">Full Name</label>
            </div>

            <div className="input-group">
              <input type="text" name="text" className="input" required />
              <label className="label">Email</label>
            </div>

            <div className="input-group">
              <input type="text" name="text" className="input" required />
              <label className="label">Mobile</label>
            </div>

            <div className="input-group">
              <textarea type="text" name="text" className="input" required />
              <label className="label">Message</label>
            </div>

            <button className="Register_button">Submit</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
