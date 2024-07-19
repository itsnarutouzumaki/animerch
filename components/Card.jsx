import React from "react";
import "../style/Card.css";
import { MdOutlineStarPurple500 } from "react-icons/md";
function Card() {
  return (
    <>
      <div className="card">
        <div>
          <img src="https://m.media-amazon.com/images/I/61bZVc7J21L._AC_UY1100_.jpg"></img>
        </div>
        <div className="title">
          <p>Lorem ipsum dolor...</p>
        </div>

        <div className="price">
          <div className="price_container">
            <div className="price_title">Price :</div>

            <div className="cost">
              <div className="old_price">₹ 1800</div>
              <div className="new_price">₹ 1200</div>
            </div>
          </div>

          <div className="rating">
            <div>
              <MdOutlineStarPurple500 />
            </div>

            <div>4.8/5</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
