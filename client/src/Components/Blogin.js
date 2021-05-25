import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import logosvg from "./logosvg.svg";
import { Link } from "react-router-dom";
import MyUserContext from "../context/MyUserContext";

import "./Pstyles.scss";

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

const Blogin = () => {
  const initValue = { fullName: "", password: "" };
  const [user, setUser] = useState(initValue);
  const [users, setUsers] = useState();
  const history = useHistory();
  const { /* authedUser,*/ setAuthedUser } = useContext(MyUserContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchQuery({
        uri: "http://localhost:4000/buyer",
      });
      console.log(data);
      setUsers(data.buyer);
    };
    fetchData();
  }, [users]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (user.fullName && user.password) {
      await fetchQuery({
        uri: "http://localhost:4000/buyer/login",
        method: "POST",
        body: user,
      });

      setUser(initValue);

      setAuthedUser(true);

      history.push("/");
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
              value={user.fullName}
              name="fullName"
              placeholder="username"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={user.password}
              name="password"
              placeholder="Password"
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
export default Blogin;
