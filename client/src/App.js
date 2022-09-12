import React, { useState, useEffect } from "react";

import ItemManager from "../src/contracts/ItemManager.json";
import Ownable from "../src/contracts/Ownable.json";
import getWeb3 from "./getWeb3";
import Web3 from "web3";
// import {ethers} from "ethers";
import { Route, Routes } from "react-router-dom";
import Detail from "./detail";
import classes from "./App.module.css";
import Product from "./product";
const App = () => {
  const [account, setAccount] = useState("");
  const [owner, setOwner] = useState("");
  const [contract, setContract] = useState("");
  const [ownerContract, setOwnerContract] = useState("");
  const [check, setCheck] = useState();
  const [product, setProduct] = useState("");
  const [products, setProducts] = useState([]);
  const [price, serPrice] = useState(0);
  const [amount, setAmount] = useState(0);

  const [address, setAddress] = useState("");

  const loadWeb3Account = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    if (accounts) {
      setAccount(accounts[0]);
    }
  };

  const loadWeb3Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = ItemManager.networks[networkId];
    const address = networkData.address;
    console.log(address);
    const abi = ItemManager.abi;
    const contract = new web3.eth.Contract(abi, address);
    setContract(contract);
    return contract;
  };

  const loadOwnerContract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    console.log(networkId);

    const networkData = Ownable.networks[networkId];
    console.log(networkData);
    const address = networkData.address;
    console.log(address);
    const abi = Ownable.abi;
    const contract = new web3.eth.Contract(abi, address);
    console.log(contract);
    setOwnerContract(contract);
    return contract;
  };

  const getOwner = async (contract) => {
    let n = await contract.methods.getOwner().call();
    setOwner(n);
    console.log(n);
  };
const productDetails= async()=>{
  const res=await contract.methods.getProduct("0xa4469c0765FD6a305cEe1D519c95CD7119d5547E").call();
  console.log(res);
}
  const getProduct = async (contract) => {
    try {
      const res = await contract.methods.getIndic().call();
      setProducts(res);
      console.log(res);

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const addproduct = async () => {
    const res = await contract.methods
      .createItem(product, amount)
      .send({ from: account }, (error) => {
        if (!error) {
          console.log("Successful");
        } else {
          console.log(error);
        }
      });
    console.log(res);
  };

  console.log(products);
const getIndex=async()=>{
  const res=await contract.methods.getIndex().call();
  console.log(res);

}

  useEffect(async () => {
    const web3 = await getWeb3();
    await loadWeb3Account(web3);
    const contract = await loadWeb3Contract(web3);
    const ownerContract = await loadOwnerContract(web3);
    await getProduct(contract);
    await getOwner(ownerContract);
  }, []);

  const Purchase = async (ind, address, cost) => {
    console.log(ind);
    console.log(cost);
    console.log(address);
    // const gasPrice = await Web3.eth.getGasPrice();
    // const fee=
    const res = await contract.methods
      .triggerPayment(ind,address)
      .send({ to: address, from: account, value: cost, gas: 995700,gasPrice: 12345 });
    console.log(res);

    if (res.transactionHash) {
      alert("Transaction Sucessfull");
    } else {
      alert("Tranaction Failed");
    }

  };

  // "gasPrice": "0x09184e72a000",

  const sendBalance = () => {};

  return (
    <div className={classes.main}>
      <div className={classes.navbar}>
        <div>
      
          <h2>Dhanush</h2>
        </div>
        <div>

          <h3>{owner}</h3>
        </div>
      </div>
      <div className={classes.title}>
        <h1>Supply Chain</h1>
      </div>

      <div className={classes.wrapper}>
        <div className={classes.product}>
          <div>
            <input
              type="text"
              placeholder="product name"
              onChange={(event) => {
                setProduct(event.target.value);
              }}
            ></input>
          </div>
          <div>
            <input
              placeholder="amount"
              onChange={(event) => {
                setAmount(event.target.value);
              }}
            ></input>
          </div>
          <div>
            <button onClick={addproduct} className={classes.submitButton}>
              create product
            </button>
          </div>
        </div>


        <div>
        <input placeholder="address"></input>
        <button onClick={productDetails}>get data</button>

          {/* <div>
            <input
              placeholder="ind"
              onChange={(event) => {
                setCheck(event.target.value);
              }}
            ></input>
            <button>get amount</button>
          </div> */}
        </div>
      </div>
      <div>
        <a href="/products">
          <button className={classes.button}>Products</button>
        </a>
      </div>

      <Routes>
        <Route
          path="/products"
          element={<Product products={products} buyProduct={Purchase} />}
        />
        <Route path="/productstats" element={<Detail />}/>
      </Routes>
      <Detail />
    </div>
  );
};

export default App;

//  "gasPrice": "0x1e",

//     "gas": "0xc350",
