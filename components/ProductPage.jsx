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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productid}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productid]);

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
              <img className="product_page_image" src={product.image} alt={product.title} />
            </div>
            <div className="product_page_right">
              <h1 className="product_page_title">{product.title}</h1>
              <p className="product_page_price">₹ {product.price}</p>
              <div className="product_page_ratings">
                <span>⭐ {product.rating?.rate}</span> | {product.rating?.count} reviews
              </div>
              <div className="product_page_offers">
                <h3>Available Offers</h3>
                <ul></ul>
              </div>
              <div className="product_page_description">
                <h3>Product Description</h3>
                <p>{product.description}</p>
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
