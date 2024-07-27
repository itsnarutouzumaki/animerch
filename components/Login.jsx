import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Login.css';

function Login() {
  return (
    <div className="full_screen">
      <div className="container">
        <div className="details_field">
          <div className="input-group">
            <input type="text" name="text" className="input" required />
            <label className="label">UserId/Email</label>
          </div>
          <div className="input-group">
            <input type="password" name="password" className="input" required />
            <label className="label">Password</label>
          </div>
          <button className="login_button">Login</button>
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
  );
}

export default Login;
