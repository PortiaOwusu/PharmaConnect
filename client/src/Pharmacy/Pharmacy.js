import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DaySales from "./DaySales";
import PharmacyReports from "./PharmacyReports";
import { Medicine } from "./Medicine";
import MonthSales from "./MonthSales";
import NearExpiry from "./NearExpiry";
import "./Pharmacy.css";
import SideNav from "./SideNav";
import Stock from "./Stock";

const Pharmacy = () => {
  const [toggle, setToggle] = useState();

  const handleNavToggle = () => {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <div className={`pharmacy ${toggle ? "fullPharma" : ""}`}>
          <SideNav
            hamburger={handleNavToggle}
            toggleClass={`${toggle ? "gotoggle" : ""}`}
          />
          <Route exact path="/pharmacy">
            <Stock />
          </Route>
          <Route path="/pharmacy/daysales">
            <DaySales />
          </Route>
          <Route path="/pharmacy/monthsales">
            <MonthSales />
          </Route>
          <Route path="/pharmacy/medicine">
            <Medicine />
          </Route>
          <Route path="/pharmacy/nearexpiry">
            <NearExpiry />
          </Route>
          <Route path="/pharmacy/reports">
            <PharmacyReports />
          </Route>
        </div>
      </Switch>
    </BrowserRouter>
  );
};

export default Pharmacy;
