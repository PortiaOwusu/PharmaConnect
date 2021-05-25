import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import logosvg from "./logosvg.svg";
import { Link } from "react-router-dom";
import "./Pstyles.scss";
import { useContext } from "react";
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

const Bregister = () => {
  const initValue = { fullName: "", email: "", password: "" };
  const [user, setUser] = useState(initValue);
  const [users, setUsers] = useState([]);
  const { /* authedUser,*/ setAuthedUser } = useContext(MyUserContext);

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchQuery({
        uri: "http://localhost:4000/buyer",
      });
      console.log(data.buyers);
      setUsers(data.buyer);
    };
    fetchData();
  }, [users]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (user.email && user.fullName && user.password) {
      await fetchQuery({
        uri: "http://localhost:4000/buyer/registeruser",
        method: "POST",
        body: user,
      });

      setUser(initValue);
      history.push("/login");
    } else {
      alert("Please enter all fields");
    }
  };
  const handleLoginaAuth = () => {
    setAuthedUser(false);
  };
  return (
    <div className="base-container">
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
            <label htmlFor="fullname">username</label>
            <input
              type="text"
              name="fullName"
              value={user.fullName}
              placeholder="username"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              placeholder="email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <div className="footer">
            <button type="button" className="btn" onClick={handleRegister}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Bregister;
