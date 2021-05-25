import React from "react";
import "../pages/Checkout.css";
import CheckoutProduct from "../Components/CheckoutProduct";
import { useStateValue } from "../context/StateProvider";
import Subtotal from "../Components/Subtotal";

function Checkout() {
  const [{ cart, user } /*, dispatch*/] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img className="checkout_ad" src="picture16.jpg" alt="" />
        {/* <Carousel classc="home_image" /> */}
        <div>
          <h3>Hello {user?.email}</h3>
          <h1 className="checkout_title">Your Cart</h1>

          {cart.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
