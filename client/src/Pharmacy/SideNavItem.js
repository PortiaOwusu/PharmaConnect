import React from "react";
import "./SideNavItem.css";
import { Link } from "react-router-dom";

const SideNavItem = ({ item, color, path, itemclass, onClick }) => {
  return (
    <Link to={path}>
      <li
        className={itemclass}
        style={{ backgroundColor: `${color}` }}
        onClick={onClick}
      >
        {item}
      </li>
    </Link>
  );
};

export default SideNavItem;
