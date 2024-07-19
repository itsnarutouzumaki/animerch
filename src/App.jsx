import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./App.css";
import Card from "../components/Card";
import Login from "../components/Login";
import Register from "../components/Register";
import Cart from "../components/Cart";

// Card
function App() {
  return (
    <>
      <Navbar />
      <div className="main_container">
        <Card />
      </div>
      <Footer />
    </>
  );
}

export default App;
