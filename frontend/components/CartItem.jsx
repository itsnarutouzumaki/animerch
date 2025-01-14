import React, { useEffect, useState } from 'react';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import "../style/CartItem.css";
import axios from 'axios';

function CartItem({ productid, quantity, update }) {
  const [count, setCount] = useState(quantity);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${productid}`)
      .then((response) => {
        setProduct(response.data);
        update(response.data.price * quantity);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
      update(-product.price);
    }
  };

  const handleIncrease = () => {
    if (count < 10) {
      setCount(count + 1);
      update(product.price);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="CartItem_container">
      <div className="Item_image">
        <img src={product.image} alt={product.title} className="Image_tag" />
      </div>

      <div className="Item_details">
        <p className="Item-title">{product.title}</p>

        <p className="item_price">
          <p className="item_cart_price_title">Unit Price:</p>
          <p className="item_cart_old_price">{product.price * 1.5 /* Example old price markup */}</p>
          <p className="item_cart_new_price">{product.price}</p>
        </p>

        <p className="item_quantity">
          <p className="quantity_title">Quantity:</p>
          <p className="quantity_number">{count}</p>
          <div className="button_for_increase_decrease">
            <p className="decrease_button" onClick={handleDecrease}>
              <IoIosArrowDropleftCircle />
            </p>
            <p className="increase_button" onClick={handleIncrease}>
              <IoIosArrowDroprightCircle />
            </p>
          </div>
        </p>
      </div>
      <div className="delete_cart_item">
        <MdDeleteForever />
      </div>
    </div>
  );
}

export default CartItem;
