import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="main_container">
        {products.length > 0 ? (
          products.map((product) => (
            <Card
              key={product.id}
              productid={product.id}
              imgSrc={product.image}
              title={product.title}
              oldPrice={(product.price * 1.5).toFixed(2)}
              newPrice={product.price.toFixed(2)}
              rating={product.rating.rate}
            />
          ))
        ) : (
          <p className="HomePage_loading">Loading...</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Home;
