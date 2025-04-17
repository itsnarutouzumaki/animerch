import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("Fetching products...");
      try {
        const response = await axios.get("/api/v1/items/getitems");
        if (response.status === 200) {
          setProducts(response.data.data);
          console.log(response);
        }
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="main_container">
        {products.length > 0 ? (
          products.map((product) => (
            <Card
              key={product._id}
              productid={product._id}
              imgSrc={product.Image[0]}
              title={product.Name}
              oldPrice={(product.Price * 1.5).toFixed(2)}
              newPrice={product.Price.toFixed(2)}
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
