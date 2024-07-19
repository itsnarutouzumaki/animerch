import React from 'react';
import "../style/Cart.css"
import CartItem from './CartItem';

function Cart() {
  return (
    <div className="cart_container">
      <CartItem/>

      <div className="total_amount">
        
      </div>
    </div>
  )
}
export default Cart
