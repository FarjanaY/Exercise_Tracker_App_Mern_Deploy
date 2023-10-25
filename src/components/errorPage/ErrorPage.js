import React from "react";

//internal imports
import Footer from "../footer/Footer";
import "./ErrorPage.style.css";

const Error = () => {
  return (
    <div className="errorContainer">
      <div className="errorDiv">
        <h1>404!!! ERROR</h1>
        <h2>Page Not Found...</h2>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Error;
