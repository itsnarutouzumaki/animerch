import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../style/ProductPage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProductPage = () => {
  const { productid } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  
  const randomRating = (Math.random() * (5 - 1) + 1).toFixed(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/v1/items/getitem/${productid}`);
        response.data.data.rating = randomRating;
        console.log(response.data.data);
        setProduct(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productid]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    product && (
      <>
        <Navbar />
        <div className="product_page_container">
          <div className="product_page_main">
            <div className="product_page_left">
              <img
                className="product_page_image"
                src={product.Image[0]}
                alt={product.Name}
                onMouseMove={handleMouseMove}
                style={{
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
              />
            </div>
            <div className="product_page_right">
              <h1 className="product_page_title">{product.Name}</h1>
              <p className="product_page_price">₹ {product.Price}</p>
              <div className="product_page_ratings">
                <span>⭐ {product.rating}/5</span>
                <p>{product.Stock} in stock</p>
              </div>
              <div className="product_page_offers">
                <h3>Available Offers</h3>
                <ul></ul>
              </div>
              <div className="product_page_description">
                <h3>Product Description</h3>
                <ul>
                  {product.Description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
              <button className="product_page_buy_now">Buy Now</button>
              <button className="product_page_add_to_cart">Add to Cart</button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  );
};

export default ProductPage;
