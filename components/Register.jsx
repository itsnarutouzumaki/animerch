import React from 'react';
import '../style/Register.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
function Register() {
  return (
    <>
    <Navbar/>
    <div className="full_screen">
      <div className="container">
        <div className="message_field">
          <h2 className="heading">Welcome to Animerch</h2>
          <p className="message">
            Welcome back to Animerch! Discover the latest anime merchandise just for you.
          </p>
          <p className="register"> <Link to="/Login" className='register_Link'>Login</Link> </p>
        </div>

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
            <input type="password" name="password" className="input" required />
            <label className="label">Set Password</label>
          </div>

          <button className="Register_button">Register</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Register;
