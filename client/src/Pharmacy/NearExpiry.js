import React from "react";
import "./NearExpiry.css";

const NearExpiry = () => {
  return (
    <div className="nearexpiry  pharmacycontent">
      <div>
        <h1>Near Expiry</h1>
        <table className="tablebox" border="2px">
          <tr>
            <th>Brand Name</th>
            <th>Expiry Date</th>
          </tr>
          {/* {stock ? (
            stock.map((item) => ( */}
          <tr>
            <td>Name</td>
            <td>
              <h3>expiryDate</h3>
            </td>
          </tr>
          {/* )) ) : (<h2>No Product.</h2>) */}
        </table>
      </div>
    </div>
  );
};

export default NearExpiry;
