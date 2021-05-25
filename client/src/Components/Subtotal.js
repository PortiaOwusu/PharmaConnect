import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../context/StateProvider";
import { getCartTotal } from "../reducer/reducer";
import { useHistory } from "react-router";

function Subtotal() {
  const history = useHistory();
  const [{ cart } /*dispatch*/] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({cart?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getCartTotal(cart)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"GH₵"}
      />

      <button onClick={(e) => history.push("/payment")}>
        Preceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
