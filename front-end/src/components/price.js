import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";

function GetPrices() {
    const [Users, fetchUsers] = useState([])
    const [storedPrice, setStoredPrice] = useState('');
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner("0xcD1cAca6d0773B428AD968c01A54148c757c3312")
    // const signer = provider.getSigner("0xcD1cAca6d0773B428AD968c01A54148c757c3312")
    const contractAddress = '0xAFA7782250D7bDB25b93dF64D60C98496cDaAeb9';
    // const contractAddress = '0x46e3B25f64aFbf85E2a078761DFCFb2ac2ff4530';
    // const contractAddress = '0x9e26D42e820025D701ac64df0Cc2e5BF24bd45AB';
    // const contractAddress ='0xEF4BAa838310368510cF912cB9D55512bC143991';
    
    const ABI = 
  '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getLatestPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"storeLatestPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"}]'
    const contract = new ethers.Contract(
      contractAddress,
      ABI,
      signer
      );
  
    const getStoredPrice = async () => {
      try {
        const contractPrice = await contract.storedPrice();
        setStoredPrice(parseInt(contractPrice) / 100000000);
        
      } catch (error) {
        console.log(error)
        console.log("getStoredPrice Error: ", error);
      }
    }
    
    const getData = () => {
      fetch('https://trpapi.herokuapp.com/api/user/')
        .then((res) => res.json())
        .then((res) => {
          fetchUsers(res)
        })
    }
    useEffect(() => {
      getData()
    }, [])

    async function updateNewPrice() {
      try {
        const transaction = await contract.storeLatestPrice();
        console.log(transaction)
        await transaction.wait();
        await getStoredPrice();
      } catch (error) {
        console.log("updateNewPrice Error: ", error);
      }
  
    }
  
    getStoredPrice()
    .catch(console.error)
    
    const users = Users.filter(user => {
      return user.is_admin === true;
    });
  
     
    const new_amount = users[0]?.amounts / storedPrice

   

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col">
          <h3>Stored Price</h3>
          <p>Stored ETH/USD Price: {storedPrice}</p>
          <p>ETH: {new_amount}</p>
          <p>USD: </p>
        </div>
        <div className="col">
          <h3>Update Price</h3>
          <button type="submit" className="btn btn-dark" 
          onClick={updateNewPrice}>Update</button>
        </div>
      </div>
    </div>
  );
}

export default GetPrices;
