import React from 'react';
import "../style/Cart.css"
import CartItem from './CartItem';
// import App from "../src/App";
import Footer from './Footer';
import Navbar from './Navbar';


function Cart() {
  return (
    <>
    <Navbar/>
    <div className="Cart_main_container">

    <div className="cart_container">
      <CartItem/>
      <div className="total_amount">
        <div className="price_amount">
        <p className="amount_title">
          Amount: 
        </p>
        <p className="amount_number">
        ₹ 1800
        </p>
        </div>
        <button className="proceed">
          Place Order
        </button>
      </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}
export default Cart
