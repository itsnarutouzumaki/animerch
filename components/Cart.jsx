import React from 'react';
import "../style/Cart.css"
import CartItem from './CartItem';

function Cart() {
  return (
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
  )
}
export default Cart
