import React from "react";
import "./App.css";
import Home from "../components/Home";
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Cart from "../components/Cart";

function App() {
  const rounter= createBrowserRouter([
    {
      path :"/",
      element: <Home/>
    },
    {
      path :"/login",
      element: <Login/>
    },
    {
      path :"/register",
      element: <Register/>
    },
    {
      path :"/cart",
      element: <Cart/>
    }
  ]);
  return (
    <>
      <RouterProvider router={rounter} />
    </>
  );
}

export default App;
