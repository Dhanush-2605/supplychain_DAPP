import React, { useState, useEffect } from "react";

import ItemManager from "../src/contracts/ItemManager.json";
import Ownable from "../src/contracts/Ownable.json";
import getWeb3 from "./getWeb3";
import Web3 from "web3";
// import {ethers} from "ethers";
import { Route, Routes } from "react-router-dom";

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
  // const [product, setNe] = useState();

  const [address, setAddress] = useState("");

  const loadWeb3Account = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    if (accounts) {
      setAccount(accounts[0]);
    }
  };
  console.log(ItemManager);

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
  // const networkId =  web3.eth.net.getId();
  // console.log(networkId);

  console.log(Ownable);
  console.log(contract);

  const getOwner = async (contract) => {
    let n = await contract.methods.getOwner().call();
    setOwner(n);
    console.log(n);
  };

  // useEffect(()=>{
  const getProduct = async (contract) => {
    try {
      const res = await contract.methods.getIndic().call();
      setProducts(res);
      console.log(res);

      // const res = await contract.methods.getProducts(check).call();

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  // const prod = products.map((product) => product[2]);
  // console.log(prod);

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

  useEffect(async () => {
    const web3 = await getWeb3();
    await loadWeb3Account(web3);
    const contract = await loadWeb3Contract(web3);
    const ownerContract = await loadOwnerContract(web3);
    await getProduct(contract);
    await getOwner(ownerContract);
  }, []);

  const Purchase = async (address, cost) => {
    //   const web3 = await getWeb3();
    // const amount = Web3.utils.fromWei(cost, 'ether')

    // console.log(amount);


    // console.log(address);
    // if (window.ethereum) {
      // window.ethereum.pop
      // let params=[{
      
      //   "from":account,
      //   "to": address,
   
      //   "value":"0x38D7EA4C68000",
      // }];
   const res=await window.ethereum.request({ method: 'eth_requestAccounts' })
   console.log(res);
        

      // method: "eth_requestAccounts"
      //   window.ethereum
      //     .request({ method: "eth_accounts" })
      //     .then((res) => console.log(res));
      //   console.log("detected");
      // } else {
      //   console.log("not detefddas");
      // }
      //   ItemManager.events.SupplyChainStep().on("data",async )
      //   console.log("worked");
    // }
  };

  // "gasPrice": "0x09184e72a000",

  const sendBalance = () => {};

  return (
    <div className={classes.main}>
      <div className={classes.navbar}>
        <div>
          {" "}
          <h2>Dhanush</h2>
        </div>
        <div>
          {" "}
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

      {/* <div className={classes.products}>
        {products.map((product, index) => (
          <Product
            key={index}
            address={product[2]}
            name={product[3]}
            cost={product[4]}
            buyProduct={Purchase}
          />
        ))}
      </div> */}
      <Routes>
        <Route
          path="/products"
          element={<Product products={products} buyProduct={Purchase} />}
        />
      </Routes>
    </div>
  );
};

export default App;


    //  "gasPrice": "0x1e",

        
    //     "gas": "0xc350",