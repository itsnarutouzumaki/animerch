import React from "react";
import "../style/Card.css";
import { MdOutlineStarPurple500 } from "react-icons/md";

function Card({ imgSrc = "", title = "", oldPrice = "", newPrice = "", rating = "" }) {
  const slicedTitle = title.length > 20 ? `${title.slice(0, 20)}...` : title;

  return (
    <div className="card">
      <div>
        <img src={imgSrc} alt={title}></img>
      </div>
      <div className="title">
        <p>{slicedTitle}</p>
      </div>

      <div className="price">
        <div className="price_container">
          <div className="price_title">Price :</div>

          <div className="cost">
            <div className="old_price">₹ {oldPrice}</div>
            <div className="new_price">₹ {newPrice}</div>
          </div>
        </div>

        <div className="rating">
          <div>
            <MdOutlineStarPurple500 />
          </div>

          <div>{rating}/5</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
