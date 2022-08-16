import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";

function GetPrices() {
    const [storedPrice, setStoredPrice] = useState('');
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contractAddress = <REPLACE_WITH_DEPLOYED_CONTRACT_ADDRESS>’';
    const ABI = 
  '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getLatestPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"storeLatestPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"}]'
    const contract = new ethers.Contract(contractAddress, ABI, signer);

}

export default GetPrices;
