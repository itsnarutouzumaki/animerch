import React from "react";
import axios from "axios";
import "../style/forgetPassword.css";
import { useNavigate, useParams } from "react-router-dom";

function Resetpassword() {
  const { id } = useParams();
  const navigate = useNavigate();

  const ForgetPasswordRequest = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Access the input values directly from the DOM
    const password = event.target.elements.password.value;
    const rePassword = event.target.elements.rePassword.value;

    // Basic validation
    if (password !== rePassword) {
      console.log("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/v1/users/resetpassword", {
        resetToken: id,
        newPassword: password,
        reNewPassword: rePassword,
      });
      console.log(response.data.message);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="resetfull_screen">
        <div className="resetcontainer">
          <form onSubmit={ForgetPasswordRequest}>
            <div className="resetinput-group">
              <input
                type="password"
                name="password"
                className="resetinput"
                required
              />
              <label className="resetlabel">New Password</label>
            </div>

            <div className="resetinput-group">
              <input
                type="password"
                name="rePassword"
                className="resetinput"
                required
              />
              <label className="resetlabel">Re-New Password</label>
            </div>
            <button type="submit" className="resetRegister_button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Resetpassword;