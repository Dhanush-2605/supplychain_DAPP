import React from "react";
import "./header.css";
const Header = ({ account }) => {
  return (
    <div className="Div">
      <div className="left">
        <h1>Crypto Coders</h1>
      </div>
      <div className="right">
      <div>
        <span>{account}</span>
        </div>
      </div>

     
    </div>
  );
};

export default Header;
