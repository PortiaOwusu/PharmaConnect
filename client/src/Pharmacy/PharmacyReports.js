import React from "react";
import { useState } from "react";
// import { report } from "../../../route/productRoute";
import "./PharmacyReports.css";

const ExpiredProduct = () => {
  const initValue = {
    subject: "",
    reportMessage: "",
  };

  const [report, setReport] = useState(initValue);
  const handleChange = async (e) => {
    e.preventDefault();
    setReport({ ...report, [e.target.name]: e.target.value });
  };
  return (
    <div className="report  pharmacycontent">
      <h1>Make Your Reports</h1>
      <form className="report1">
        <input
          className="report2"
          type="text"
          placeholder="Subject of report"
          name="subject"
          value={report.subject}
          onChange={handleChange}
        />
        <textarea
          className="report3"
          type="text"
          placeholder="Message"
          name="title"
          value={report.reportMessage}
          onChange={handleChange}
        />
        <input className="reportbtn" type="button" value="SEND" onClick="" />
      </form>
    </div>
  );
};

export default ExpiredProduct;
