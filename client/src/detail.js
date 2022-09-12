import React from "react";
import classes from "./detail.module.css";
const Detail = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <h3>car</h3>
        </div>
        <div className={classes.content}>
          <div>
            <h3>Address</h3>
          </div>
          <div>
            <p>0x23523465bsnfjkaoo9983</p>
          </div>
        </div>
        <div className={classes.content}>
        <div> <h3>Quantity</h3></div>
        <div><p>4</p></div>
         
          
        </div>
        <div className={classes.content}>
          <div>
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
