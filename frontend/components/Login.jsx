import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import '../style/Login.css';

function Login() {
  const loginRequest = () => {
    const email = document.getElementsByName('email')[0].value;
    const password = document.getElementsByName('password')[0].value;
    axios.post('api/v1/users/login', {
      email: email,
      password: password
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  return (
    <>
    <Navbar />
    <div className="full_screen">
      <div className="container">
        <div className="details_field">
          <div className="input-group">
            <input type="text" name="email" className="input" required />
            <label className="label">UserId/Email</label>
          </div>
          <div className="input-group">
            <input type="password" name="password" className="input" required />
            <label className="label">Password</label>
          </div>
          <button className="login_button" onClick={loginRequest}>Login</button>
        </div>
        <div className="message_field">
          <h2 className="heading">Welcome to Animerch</h2>
          <p className="message">
            Welcome back to Animerch! Discover the latest anime merchandise just for you.
          </p>
          <p className="register"> <Link to="/register" className='register_Link'>Register</Link> </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
