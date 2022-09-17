import React from "react";
import classes from "./product.module.css";
import Web3 from "web3";
import { Link } from "react-router-dom";
const Product = ({ products,buyProduct,getStats }) => {

  console.log(products);
  return (
    <div className={classes.container}>
      {products.map((product, index) => (
        <div className={classes.wrapper} key={index}>
          <div className={classes.content}>{product[3]}</div>
          <div>
            {Web3.utils.fromWei(product[4], 'ether')} <span className={classes.span}>ETH</span>
          </div>
          <div className={classes.buttondiv}>
          <div>
          <button onClick={()=>buyProduct(product[3],product[2],product[4])}>buy</button>

          </div>
          <div className={classes.details}>
          <Link to="/productstats">
          <button>lol</button>

          </Link>
          <button  onClick={()=>getStats(product[3],product[2])}>Get Stats</button>

          </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default Product;
