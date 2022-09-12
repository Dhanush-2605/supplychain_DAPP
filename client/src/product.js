import React from "react";
import classes from "./product.module.css";
import Web3 from "web3";
const Product = ({ products,buyProduct }) => {
  const getStats=()=>{

  }
  console.log(products);
  return (
    <div className={classes.container}>
      {products.map((product, index) => (
        <div className={classes.wrapper} key={index}>
          <div className={classes.content}>{product[4]}</div>
          <div>
            {Web3.utils.fromWei(product[5], 'ether')} <span className={classes.span}>ETH</span>
          </div>
          <div className={classes.address}>
            <p>{product[3]}</p>
          </div>
          <div>
            <button onClick={()=>buyProduct(product[2],product[3],product[5])}>buy</button>
            {/* <button onClick={()=>getStats(product[4],product[3])}>Get Stats</button> */}
          </div>
        </div>
      ))}
    </div>
  );
};


export default Product;
