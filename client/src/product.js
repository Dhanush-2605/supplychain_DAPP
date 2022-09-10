import React from "react";
import classes from "./product.module.css";
import Web3 from "web3";
const Product = ({ products,buyProduct }) => {
  console.log(products);
  return (
    <div className={classes.container}>
      {products.map((product, index) => (
        <div className={classes.wrapper} key={index}>
          <div className={classes.content}>{product[3]}</div>
          <div>
            {Web3.utils.fromWei(product[4], 'ether')} <span className={classes.span}>ETH</span>
          </div>
          <div className={classes.address}>
            <p>{product[2]}</p>
          </div>
          <div>
            <button onClick={()=>buyProduct(product[2],product[4])}>buy</button>
          </div>
        </div>
      ))}
    </div>
  );
};


export default Product;
