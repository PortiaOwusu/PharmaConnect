import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
import CheckoutProduct from "../Components/CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "../context/StateProvider";
import { getCartTotal } from "../reducer/reducer";

function Payment() {
  const [{ cart }, user /*, dispatch*/] = useStateValue();
  const [succeeded /*setSucceeded*/] = useState(false);
  const [processing /*setProcessing*/] = useState("");
  const [disabled /*setDisabled*/] = useState(true);

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<Link to="/checkout">{cart?.length} items</Link>)
        </h1>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Adress</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>OLA Estate</p>
            <p>Cape Coast, Ghana</p>
            <p>+233550698123</p>
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
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

        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            {/* stripe details */}

            <form>
              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        Subtotal ({cart?.length} items):{" "}
                        <strong>{value}</strong>
                      </p>
                    </>
                  )}
                  decimalScale={2}
                  value={getCartTotal(cart)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"GH₵"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* {error && <div>{error}</div>} */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
