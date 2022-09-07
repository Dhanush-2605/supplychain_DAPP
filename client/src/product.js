import React from 'react'
import classes from "./product.module.css";
const Product = ({name,cost,getAddress}) => {
  return (
    <div className={classes.wrapper}>
        <div className={classes.content}>{name}</div>
        <div >{cost} <span className={classes.span}>wei</span></div>
        <div><button onClick={getAddress}>buy</button></div>
    </div>
  )
}

export default Product;
