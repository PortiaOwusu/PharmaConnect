import React from "react";
import SideNavItem from "./SideNavItem";
import "./SideNav.css";
import { Link, useHistory } from "react-router-dom";
// import Arrow from "@material-ui/icons/ArrowBackIos";

const SideNav = ({ hamburger, toggleClass }) => {
  const history = useHistory();
  const navItem = [
    { name: "Stock", color: "#5BBC8B", path: "/pharmacy" },
    { name: "Sales of Day", color: "#3E7DBA", path: "/pharmacy/daysales" },
    { name: "Sales of Month", color: "#94E262", path: "/pharmacy/monthsales" },
    { name: "Medicine", color: "#EA9A72", path: "/pharmacy/medicine" },
    { name: "Near Expiry", color: "#6CD9D1", path: "/pharmacy/nearexpiry" },
    { name: "Reports", color: "#A97CA8", path: "/pharmacy/reports" },
    { name: "SignOut", color: "#FF1100", onClick: "handlePharmaSignOut" },
  ];

  const handlePharmaSignOut = () => {
    history.push("/");
  };

  return (
    <div className={`sidenav ${toggleClass}`}>
      <div className="hamburger" onClick={hamburger}>
        <span className="bar"></span>
      </div>

      {navItem.map((item) => (
        <SideNavItem
          itemclass="sidenavitem"
          item={item.name}
          color={item.color}
          path={item.path}
          onClick={item.onClick}
        />
      ))}
      {/* <Link to="/">SignOut</Link> */}
    </div>
  );
};

export default SideNav;
