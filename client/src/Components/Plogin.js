import React from "react";
import logosvg from "./logosvg.svg";
import { Link, useHistory } from "react-router-dom";
import "./Pstyles.scss";
import MyUserContext from "../context/MyUserContext";
import { useState, useContext } from "react";
import { usePharmacyState } from "../state/store";

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

const Plogin = (props) => {
  const initValue = { pharmacyName: "", registrationNumber: "", password: "" };
  const [pharmacy, setPharmacy] = useState(initValue);
  const history = useHistory();
  const { /*authedUser,*/ setAuthedUser } = useContext(MyUserContext);
  const setCurrentPharmacy = usePharmacyState(
    (state) => state.setCurrentPharmacy,
  );

  const handleChange = (e) => {
    setPharmacy({ ...pharmacy, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(pharmacy);

    if (
      pharmacy.pharmacyName &&
      pharmacy.registrationNumber &&
      pharmacy.password
    ) {
      const data = await fetchQuery({
        uri: "http://localhost:4000/pharmacy/login",
        method: "POST",
        body: pharmacy,
      });

      setCurrentPharmacy({ ...data });

      setPharmacy(initValue);

      setAuthedUser(true);

      history.push("/pharmacy");
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={pharmacy.password}
              placeholder="Password"
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
          <div className="footer">
            <button type="button" className="btn" onClick={handleLogin}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plogin;
