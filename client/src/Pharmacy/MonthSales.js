import React from "react";
import "./MonthSales.css";

const MonthSales = () => {
  return (
    <div className="monthsales  pharmacycontent">
      <div>
        <h1>Daily Sales</h1>
        <table className="tablebox" border="2px">
          <tr>
            <th>Brand Name</th>
            <th>Price GH₵</th>
            <th>Quantity Bought</th>
          </tr>
          {/* {stock ? (
            stock.map((item) => ( */}
          <tr>
            <td>Name</td>
            <td>
              GH₵<h3>Price</h3>
            </td>
            <td>
              <h3>Quantity Bought</h3>
            </td>
          </tr>
          {/* )) ) : (<h2>No Product.</h2>) */}
        </table>
      </div>
    </div>
  );
};

export default MonthSales;
