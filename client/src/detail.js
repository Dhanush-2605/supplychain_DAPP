import React, { useEffect, useState } from "react";
import classes from "./detail.module.css";
import { useParams } from "react-router-dom";
import getWeb3 from "./getWeb3";
import Web3 from "web3";
import ItemManager from "../src/contracts/ItemManager.json";
const Detail = ({ contract }) => {
  console.log(contract.methods);
  const [stats, setStats] = useState([]);
  const [web3, seteb3] = useState();

  const params = useParams();
  const ind = params.ind;
  console.log(ind);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await contract.methods.getProduct(params.ind).call();
        setStats(res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, []);
  let etherValue;
  if (stats.length != 0) {
    let val = stats[1];
    etherValue = Web3.utils.fromWei(val, "ether");
    console.log(etherValue);
  }

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <div>
          {" "}
          <h2>Stats</h2>
        </div>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <h3>{params.name}</h3>
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
          <div className={classes.insidequantity}>
            {" "}
            <h3>Quantity</h3>
          </div>
          <div>
            <p>{stats[0]}</p>
          </div>
        </div>
        <div className={classes.content}>
          <div className={classes.insideprice}>
            <h3>Total Amount</h3>
          </div>
          <div>
            <p>
              {etherValue} <span>ETH</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
