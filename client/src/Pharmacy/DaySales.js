import React from "react";
import "./DaySales.css";

const DaySales = () => {
  return (
    <div className="daysales  pharmacycontent">
      <div>
        <h1>Daily Sales</h1>
        <table className="tablebox" border="2px">
          <tr>
            <th>Brand Name</th>
            <th>Price GH₵</th>
            <th>Customer</th>
            <th>Quantity Bought</th>
            <th>Delivery Details</th>
            <th>Action</th>
          </tr>
          {/* {stock ? (
            stock.map((item) => ( */}
          <tr>
            <td>Name</td>
            <td>
              GH₵<h3>Price</h3>
            </td>
            <td>
              <h3>Customer fullName</h3>
            </td>
            <td>
              <h3>Quantity Bought</h3>
            </td>
            <td className="">
              <h3>Delivery Details</h3>
            </td>

            <td className="">
              <div>
                <button onClick>Delivered</button>
              </div>
            </td>
          </tr>
          {/* )) ) : (<h2>No Product.</h2>) */}
        </table>
      </div>
    </div>
  );
};

export default DaySales;
