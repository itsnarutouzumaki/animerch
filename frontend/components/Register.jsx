import React, { useState } from "react";
import "../style/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerRequest = () => {
    const { name, email, phoneNumber, password } = formData;
    console.log(formData);
    axios
      .post("api/v1/users/register", {
        name,
        email,
        phoneNumber,
        password,
      })
      .then((response) => {
        console.log(response);
        toast.success(response.data.message, {
          duration: 2000,
          position: "top-center",
        });
        if (response.data.success) navigate("/login");
      })
      .catch((error) => {
        toast.error("Some error has occurred", {
          duration: 2000,
          position: "top-center",
        });
      });
  };

  return (
    <>
      <div className="full_screen">
        <div className="container">
          <div className="message_field">
            <h2 className="heading">Welcome to Animerch</h2>
            <p className="message">
              Welcome back to Animerch! Discover the latest anime merchandise
              just for you.
            </p>
            <p className="register">
              <Link to="/Login" className="register_Link">
                Login
              </Link>
            </p>
          </div>

          <div className="details_field">
            <div className="input-group">
              <input
                type="text"
                name="name"
                className="input"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label className="label">Full Name</label>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                className="input"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label className="label">Email</label>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="phoneNumber"
                className="input"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              <label className="label">phoneNumber</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                className="input"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label className="label">Set Password</label>
            </div>

            <button className="Register_button" onClick={registerRequest}>
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
