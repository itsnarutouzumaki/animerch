import React from 'react'
import "../style/Card.css"
function Card() {
  return (
    <>
    <div className="container">
      <img src="../assets/logo_img.png" alt="" className="images"/>
      <div className="nameContainer">
      <p className="productName">Naruto Jacket</p>
      </div>
      <div>
      <span className="cost">$800</span>
      <span className="rating">3.5/5</span>
      </div>
    </div>
    </>
  )
}

export default Card
