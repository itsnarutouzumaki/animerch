import React, { useEffect, useState } from 'react';
import "../style/Cart.css";
import CartItem from './CartItem';
import Footer from './Footer';
import Navbar from './Navbar';
import axios from 'axios';

function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    console.log("fdxfx "+totalPrice)
  
  }, [totalPrice])
  
  const update = (value) => {
    console.log(value);
    console.log(totalPrice);
    setTotalPrice(prevTotal => prevTotal + value);
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/carts/5')
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="Cart_main_container">
        <div className="cart_container">
          {products.length > 0 ? (
            products.map((product) => (
              <CartItem
                key={product.productId}
                productid={product.productId}
                quantity={product.quantity}
                update={update}
              />
            ))
          ) : (
            <p>No products in cart</p>
          )}
          <div className="total_amount">
            <div className="price_amount">
              <p className="amount_title">Amount: </p>
              <p className="amount_number">{totalPrice}</p>
            </div>
            <button className="proceed">Place Order</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
