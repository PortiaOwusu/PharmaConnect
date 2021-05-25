import React, { useEffect, useState } from "react";
import Carousel from "../Components/Carousel";
import "../pages/Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Product from "../Components/Product";

function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:4000/products");
      const { products } = await res.json();
      setProducts(products);
    };
    fetchData();
  });
  return (
    <div className="home">
      <div className="home_container">
        {/* <img className="home_image" src="picture6.jpg" alt="medicine" /> */}
        <Carousel classc="home_image" />

        <div className="home_row">
          {products?.map((product) => (
            <Product
              id={product._id}
              title={product.title}
              genericName={product.genericName}
              price={product.price}
              image={product.image}
              // rating={5}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
