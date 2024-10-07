import React from "react";
import "../style/Card.css";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Card({ productid = "", imgSrc = "", title = "", oldPrice = "", newPrice = "", rating = "" }) {
  const navigate = useNavigate();
  const slicedTitle = title.length > 20 ? `${title.slice(0, 20)}...` : title;

  return (
    <button className="card" onClick={() => navigate(`/product/${productid}`)}>
      <div>
        <img src={imgSrc} alt={title} />
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
    </button>
  );
}

export default Card;
