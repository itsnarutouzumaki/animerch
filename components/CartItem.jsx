import React, { useState } from 'react'
import {IoIosArrowDropleftCircle , IoIosArrowDroprightCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import "../style/CartItem.css"


function CartItem() {
  const [count,setCount]=useState(1);
  return (
    <div className="CartItem_container">
      <div className="Item_image">
        <img src="https://images.bewakoof.com/t1080/men-s-black-the-king-graphic-printed-t-shirt-543363-1715258128-1.jpg" className="Image_tag" />
      </div>

      <div className="Item_details">
        <p className="Item-title">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        <p className="item_price">
          <p className="item_cart_price_title">
            Price :
          </p>
          <p className="item_cart_old_price">
          ₹ 1800
          </p>
          <p className="item_cart_new_price">
          ₹ 1200
          </p>
        </p>

        <p className="item_quantity">
          <p className="quantity_title">
            Quantity :
          </p>
          <p className="quantity_number">
            {count}
          </p>
          <div className="button_for_increase_decrease">
            <p className="increase_button" onClick={() => {if(count!=1)setCount(count - 1)}}>
            <IoIosArrowDropleftCircle/>
            </p>
            <p className="decrease_button" onClick={() => {if(count!=10)setCount(count + 1)}}>
            <IoIosArrowDroprightCircle/>
            </p>
          </div>
        </p>
      </div>
      <div className="delete_cart_item">
      <MdDeleteForever />
      </div>
    </div>
  )
}

export default CartItem
