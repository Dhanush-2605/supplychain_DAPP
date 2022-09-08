import React from "react";
import classes from "./product.module.css";
const Product = ({ name, cost, getAddress, address }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>{name}</div>
      <div>
        {cost} <span className={classes.span}>wei</span>
      </div>
      <div className={classes.address}>
        <p>{address}</p>
      </div>
      <div>
        <button onClick={getAddress}>buy</button>
      </div>
    </div>
  );
};

export default Product;
