import React from "react";
import classes from "./detail.module.css";
const Detail = ({name,index}) => {
  console.log(index);
  console.log(name);
  return (
    <div className={classes.container}>
    <div className={classes.heading}>
    <div>  <h2>Stats</h2></div>
    
    </div>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <h3>car</h3>
        </div>
        <div className={classes.content}>
          <div>
            <h3>Address</h3>
          </div>
          <div>
            <p>0xaaAf647085AA01941d77df2E002afDFe0740Ed03</p>
          </div>
        </div>
        <div className={classes.quantity}>
        <div className={classes.insidequantity}> <h3>Quantity</h3></div>
        <div><p>4</p></div>
         
          
        </div>
        <div className={classes.content}>
          <div className={classes.insideprice}>
              <h3>Total Amount</h3>
          </div>
          <div>
        
            <p>
              9000000<span>ETH</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
