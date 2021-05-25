import React from "react";
import logosvg from "./logosvg.svg";
import { Link, useHistory } from "react-router-dom";
import "./Pstyles.scss";
import { useState, useContext } from "react";
import MyUserContext from "../context/MyUserContext";

const fetchQuery = async ({ uri, method = "GET", body = null }) => {
  const response = await fetch(uri, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body !== null ? JSON.stringify(body) : null,
  });
  const data = await response.json();
  return data;
};

const Pregister = (props) => {
  const initValue = {
    pharmacyName: "",
    email: "",
    password: "",
    registrationNumber: "",
    location: "",
  };
  const [pharmacy, setPharmacy] = useState(initValue);
  const { /*authedUser,*/ setAuthedUser } = useContext(MyUserContext);

  const history = useHistory();

  const handleChange = (e) => {
    setPharmacy({ ...pharmacy, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    console.log(pharmacy);
    e.preventDefault();
    if (
      pharmacy.pharmacyName &&
      pharmacy.email &&
      pharmacy.password &&
      pharmacy.registrationNumber &&
      pharmacy.location
    ) {
      await fetchQuery({
        uri: "http://localhost:4000/pharmacy/register",
        method: "POST",
        body: pharmacy,
      });

      setPharmacy(initValue);
      history.push("/pharmacy-login");
    } else {
      alert("Please enter all fields");
    }
  };
  const handleLoginaAuth = () => {
    setAuthedUser(false);
  };

  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">
        <Link to="/" onClick={handleLoginaAuth}>
          <img src="logo1.jpg" alt="" />
        </Link>
      </div>
      <div className="content">
        <div className="Image">
          <img src={logosvg} alt="" />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="pharmacyname">Pharmacy Name</label>
            <input
              type="text"
              name="pharmacyName"
              value={pharmacy.pharmacyName}
              placeholder="Pharmacy Name"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={pharmacy.email}
              placeholder="email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={pharmacy.password}
              placeholder="password"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="registrationnumber">Registration Number</label>
            <input
              type="text"
              name="registrationNumber"
              value={pharmacy.registrationNumber}
              placeholder="Registration Number"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Pharmacy location</label>
            <input
              type="text"
              name="location"
              value={pharmacy.location}
              placeholder="Pharmacy location"
              onChange={handleChange}
            />
          </div>
          <div className="footer">
            <button type="button" className="btn" onClick={handleRegister}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pregister;
