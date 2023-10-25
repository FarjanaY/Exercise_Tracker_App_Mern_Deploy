//External imports
import React from "react";

//internal imports
import "./Title.style.css";

const Title = ({ title }) => {
  return (
    <div className="titleContainer">
      <h1 className="titleText">{title}</h1>
    </div>
  );
};

export default Title;
