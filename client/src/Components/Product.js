import React from "react";
import "./Product.css";
import { useStateValue } from "../context/StateProvider";

function Product({ id, title, genericName, price, image, rating }) {
  const [{ cart }, dispatch] = useStateValue();

  const addToCart = () => {
    // dispatch the item into teh data layer
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: id,
        title: title,
        genericName: genericName,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        {/* <p>{genericName}</p> */}

        <p className="product_price">
          <small> GH₵</small>
          <strong>{price}</strong>
        </p>
        {/* <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div> */}
      </div>

      <img src={image} alt="medicine" />
      <button onClick={addToCart}>Add To Cart</button>
    </div>
  );
}

export default Product;
