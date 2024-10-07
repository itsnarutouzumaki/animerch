import React, { useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Cart from "../components/Cart";
import ContactUs from "../components/ContactUs";
import ProductPage from "../components/ProductPage";

function App() {
  useEffect(() => {
    document.title = "AniMerch";
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/contactus",
      element: <ContactUs />,
    },
    {
      path: "/product/:productid",
      element: <ProductPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
