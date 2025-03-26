import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Login.css";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const loginRequest = () => {
    const email = document.getElementsByName("email")[0].value;
    const password = document.getElementsByName("password")[0].value;
    axios
      .post("api/v1/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        toast.success("You logged in successfully", {
          duration: 2000,
          position: 'top-center'});
        navigate("/");
      })
      .catch((error) => {
        toast.error("Some error has been occured", {
          duration: 2000,
          position: 'top-center'});
      });
  };

  const forgetPasswordRequest = () => {
    const email = document.getElementsByName("email")[0].value;
    axios
      .post("api/v1/users/forgetPassword", {
        email: email,
      })
      .then((response) => {
        const message = document.getElementsByClassName("message")[0];
        message.innerHTML = `<p> ${response.data.message} </p>`;
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [login, setLogin] = useState(1);

  const loginElement = (
    <div className="details_field">
      <p style={{ fontSize: "24px", fontWeight: "bold", color: "#333", marginBottom: "20px" }}>
        Login
      </p>
      <div className="input-group">
        <input type="text" name="email" className="input" required />
        <label className="label">UserId/Email</label>
      </div>
      <div className="input-group">
        <input type="password" name="password" className="input" required />
        <label className="label">Password</label>
      </div>
      <button className="login_button" onClick={loginRequest}>
        Login
      </button>
      <div className="forget_password_button" onClick={() => setLogin(0)}>
        forget password
      </div>
    </div>
  );

  const forgetElement = (
    <div className="details_field">
      <p style={{ fontSize: "24px", fontWeight: "bold", color: "#333", marginBottom: "20px" }}>
        Forget Password
      </p>
      <div className="input-group">
        <input type="text" name="email" className="input" required />
        <label className="label">UserId/Email</label>
      </div>
      <button className="login_button" onClick={forgetPasswordRequest}>
        Submit
      </button>
      <div className="forget_password_button" onClick={() => setLogin(1)}>
        Login if know your credential
      </div>
      <div className="message"></div>
    </div>
  );

  return (
    <>
      <div className="full_screen">
        <div className="container">
          {login ? loginElement : forgetElement}
          <div className="message_field">
            <h2 className="heading">Welcome to Animerch</h2>
            <p className="message">
              Welcome back to Animerch! Discover the latest anime merchandise
              just for you.
            </p>
            <p className="register">
              {" "}
              <Link to="/register" className="register_Link">
                Register
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;