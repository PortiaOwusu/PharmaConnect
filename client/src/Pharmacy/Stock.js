import React, { useState, useEffect } from "react";
import { usePharmacyState } from "../state/store";
import "./Stock.css";

const Stock = () => {
  const [stock, setStock] = useState([]);
  const token = usePharmacyState((state) => state.token);

  const fetchData = async () => {
    const res = await fetch(
      "http://localhost:4000/products/get-product-by-pharmacy",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    const { products } = await res.json();
    setStock(products);
  };

  useEffect(() => {
    fetchData();
  }, [stock]);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/products/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    fetchData();
    alert("Deleted Successfully");
  };

  return (
    <div className="stock  pharmacycontent">
      <div>
        <h1>STOCK</h1>
        <div className="tablecontainer">
          <header className="stocklabel itemdetails">
            <p>Image</p>
            <p>Brand Name</p>
            <p>Generic Name</p>
            <p>Description</p>
            <p>Price GH₵</p>
            <p>Quantity</p>
            <p>Manufacture Date</p>
            <p>Expiry Date</p>
            <p>Prescription</p>
            <p>Action</p>
          </header>
          {stock ? (
            stock.map((item) => (
              <div className="itemdetails">
                <div className="itemImage  ">
                  <img src={item.image} alt="" />
                </div>

                <div className="itemdetail">
                  <h3>{item.title}</h3>
                </div>
                <div>
                  <h3>{item.genericName}</h3>
                </div>
                <div className="itemdetail">
                  <h3>{item.description}</h3>
                </div>
                <div className="itemdetail">
                  <p>{`GH₵ ${item.price}`}</p>
                </div>
                <div className="itemdetail">
                  <h3>{item.quantity}</h3>
                </div>
                <div className="itemdetail">
                  <h4>{item.manufactureDate}</h4>
                </div>
                <div className="itemdetail">
                  <h4>{item.expiryDate}</h4>
                </div>
                <div className="itemdetail">
                  <h4>
                    {item.prescription ? (
                      <p>Prescription</p>
                    ) : (
                      <p>No Prescription</p>
                    )}
                  </h4>
                </div>
                <div className="itemdetail tnum3">
                  <div>
                    <button>Update</button>
                    <button onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2>No Product.</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stock;
