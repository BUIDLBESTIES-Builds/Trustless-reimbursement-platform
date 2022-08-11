import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";


function Admin() {
    const [storedPrice, setStoredPrice] = useState('');
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contractAddress='0x8cDE3FC3Bcb767820a59111D46c93Af3983739F3';

    const ABI = 
    '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getLatestPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"storeLatestPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"}]'
      const contract = new ethers.Contract(contractAddress, ABI, signer);
    


    const getStoredPrice = async () => {
        try {
          const contractPrice = await contract.storedPrice();
          setStoredPrice(parseInt(contractPrice) / 100000000);
        } catch (error) {
          console.log("getStoredPrice Error: ", error);
        }
      }
    
    async function updateNewPrice() {
        try {
          const transaction = await contract.storeLatestPrice();
          await transaction.wait();
          await getStoredPrice();
        } catch (error) {
          console.log("updateNewPrice Error: ", error);
        }
    
      }
    
    getStoredPrice()
    .catch(console.error)


    return (
        <div className="container">
          <div className="row mt-5">
    
            <div className="col">
             <h1>This is the Admin Panel</h1>
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

export default Admin;