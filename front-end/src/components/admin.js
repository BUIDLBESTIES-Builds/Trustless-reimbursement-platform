import React, { useState, useEffect } from 'react'
import { ethers } from "ethers";



const makeRefund = async ({ setError, setTxs, ether, addr}) => {
    try {
      if(!window.ethereum)
        throw new Error("No crypto wallet found. Please Install it");
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(addr);
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether)
      });

      setTxs([tx])
    } catch (err) {
      setError(err.message);
    }
};


export default function Admin() {
    const [Users, fetchUsers] = useState([])
    const [error, setError] = useState();
    const [txs, setTxs] = useState([]);
    const addr = "0xf1d440bBA4525A4E43d251F1251d031Eca9DdCdc";
    const ether = "0.1"

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

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        setError();
        await makeRefund({
          setError,
          setTxs,
          ether: ether,
          addr: addr
        });
        };
    const users = Users.filter(user => {
          return user.is_admin === true;
        });
  return (
    <div className="flex items-stretch bg-grey-lighter min-h-screen">
      
      <div className="flex-1 text-grey-darker text-center bg-fuchsia-100 flex-none w-80">
        <h1 className="pt-8 font-sans text-2xl">Fundly</h1>
        <div className="profile mx-auto rounded-full w-16 pt-28"> 
                <img src="https://www.disneyplusinformer.com/wp-content/uploads/2021/09/The-Simpsons-Profile-Icons-8.png" alt="profile" />
                <h2 className="pt-1.5 font-sans text-base">Admin: {users[0]?.fullname}</h2>
            </div>
      </div>
      <div className="flex-1 text-grey-darker bg-slate-50">
        <p className="text-2xl px-12 pt-6">
          Reimbusment history
          <div class="grid grid-cols-3 gap-2 text-sm pt-20">
            <button class="bg-teal-200 hover:bg-blue-700 text-white  py-2 px-4 rounded-full w-24">Approved</button>
            <button class="bg-orange-300 hover:bg-blue-700 text-white  py-2 px-4 rounded-full w-24">Pending</button>
            <button class="bg-red-200 hover:bg-blue-700 text-white  py-2 px-4 rounded-full w-24">Denied</button>
           
          </div>
          <div class="flex justify-center pt-4">
            <div class="block p-6 rounded-lg shadow-lg bg-white max-w-md">
              <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">User:  </h5>
              <p class="text-gray-700 text-base mb-4">
              Wallet: 0xf1d440bBA4525A4E43d251F1251d031Eca9DdCdc
              </p>
              <p class="text-gray-700 text-base mb-4">
              Request: Pending
              </p>
              <p className="text-gray-700 text-base mb-4">Amount: 0.1 Eth</p>
              <p className="text-gray-700 text-base mb-4">Category: Education</p>
              <p className="text-gray-700 text-base mb-4">Description: short course on data structures and algorithms</p>
              <button type="button" onClick={handleSubmit} className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Pay</button>
              
            </div>
          </div>
        </p>
        </div>
      <div className="flex-1 text-grey-darker text-center bg-slate-50">
      <h2 className="text-2xl px-12 pt-6">Statistics</h2>
      <div class="grid grid-cols-3 gap-4 pt-16 pl-10">
        <div class="">
          <div class="flex justify-center">
            <div class="rounded-lg shadow-lg bg-fuchsia-100 max-w-sm w-80 h-60 ">
              <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                
              </a>
              <div class="pr-6">
                <h5 class="text-gray-900 text-xl font-medium mb-2">Education</h5>
                <p class="text-gray-700 text-base mb-4">
                  Total Spent: $0
                </p>
                <p class="text-gray-700 text-base mb-4">
                  Total Users: 0
                </p>
              </div>
            </div>
            </div>
          </div>
          <div class="pl-14">
        <div class="flex justify-center">
            <div class="rounded-lg shadow-lg bg-orange-300 max-w-sm w-80 h-60">
              <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
              </a>
              <div class="p-6">
                <h5 class="text-gray-900 text-xl font-medium mb-2">Education</h5>
                <p class="text-gray-700 text-base mb-4">
                  Total Spent: $0;
                </p>
                <p class="text-gray-700 text-base mb-4">
                  Total Users: 0
                </p>
                
              </div>
            </div>
            </div>
        </div>
        </div>


      <div class="grid grid-cols-3 gap-4 pt-12 pl-10">
        <div class="...">
        <div class="flex justify-center">
            <div class="rounded-lg shadow-lg bg-teal-200 max-w-sm w-80 h-60">
              <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
              </a>
              <div class="p-6">
                <h5 class="text-gray-900 text-xl font-medium mb-2">Education</h5>
                <p class="text-gray-700 text-base mb-4">
                  Total Spent: $0;
                </p>
                <p class="text-gray-700 text-base mb-4">
                  Total Users: 0
                </p>
                
              </div>
            </div>
            </div>
        </div>
        <div class="pl-14">
        <div class="flex justify-center">
            <div class="rounded-lg shadow-lg bg-violet-300 max-w-sm w-80 h-60">
              <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
              </a>
              <div class="p-6">
                <h5 class="text-gray-900 text-xl font-medium mb-2">Education</h5>
                <p class="text-gray-700 text-base mb-4">
                  Total spent: $0
                </p>
                <p class="text-gray-700 text-base mb-4">
                  Total Users: 0
                </p>
                
              </div>
            </div>
            </div>
        </div>
      </div>
      </div>



    </div>
    );
}