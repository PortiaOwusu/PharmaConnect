import "../pages/Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import React, { useContext, useState } from "react";
import MyUserContext from "../context/MyUserContext";
import { useHistory } from "react-router-dom";
import { usePharmacyState } from "../state/store";

function Header(props) {
  const [{ cart }, user /*, dispatch*/] = useStateValue();
  const { authedUser, setAuthedUser } = useContext(MyUserContext);
  const [checkLink, setCheckLink] = useState();
  const [active, setActive] = useState();
  const history = useHistory();
  const pharmacy = usePharmacyState((state) => state.pharmacy);

  // const handleSignout = () => {
  //   setAuthedUser(false);
  // };

  const handleCheckout = () => {
    if (authedUser) {
      setCheckLink("/checkout");
    } else {
      setCheckLink(`${alert("Please Sign In to checkout")}`);
      history.push("/login");
    }
  };

  const handleActive = () => {
    if (active) {
      setActive(false);
    } else {
      setActive(true);
    }

    if (authedUser) {
      setActive(false);
      setAuthedUser(false);
    }
  };

  return (
    <div className="header">
      <Link exact to="/">
        <img className="header__pic" src="logo1.jpg" alt="logo" />
      </Link>

      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>

      <div className="header_nav">
        <div className="header_option">
          <span className="hearder_L1"> Hello {props.username}</span>

          <span
            className={`hearder_L2 dropdown ${active ? "active" : ""}`}
            onClick={handleActive}
          >
            {props.signStatus}

            <ul>
              <Link to={user && "/login"}>
                <li>Customer</li>
              </Link>

              <Link to="/pharmacy-login">
                <li>Pharmacy</li>
              </Link>
            </ul>
          </span>
        </div>

        <div className="header_option">
          <span className="hearder_L1"> Favorite </span>
          <span className="hearder_L2"> Categories </span>
        </div>

        {authedUser && pharmacy?.registrationNumber && (
          <Link to="/pharmacy">
            <div className="header_option">
              <span className="hearder_L1"> Your </span>
              <span className="hearder_L2"> Pharmacy </span>
            </div>
          </Link>
        )}

        <Link to={checkLink} onClick={handleCheckout}>
          <div className="header_basket">
            <ShoppingCartIcon />
            <span className="hearder_L2  header_count">{cart?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
