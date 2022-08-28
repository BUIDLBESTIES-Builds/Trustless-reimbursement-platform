import React, { useState, useEffect } from "react";
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

export default function Admin2() {
    const [Users, fetchUsers] = useState([])
    const [error, setError] = useState();
    const [txs, setTxs] = useState([]);
    const [reimburse, fetchReimbursement] = useState([])
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

    const getReimbursement = () => {
      fetch('https://trpapi.herokuapp.com/api/reimbursement/')
        .then((res) => res.json())
        .then((res) => {
          fetchReimbursement(res)
        })
    }
    useEffect(() => {
      getReimbursement()
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
    
    const date = new Date().toLocaleDateString()
    console.log(date)
  return (
    <div className="flex items-stretch bg-grey-lighter min-h-screen">
      <div className="flex-1 text-grey-darker text-center bg-orange-50 flex-none w-60">
        <h1 className="pt-8 font-sans text-2xl">Fundly</h1>
        <div className="profile mx-auto rounded-full w-16 pt-28"> 
                <img src="https://www.disneyplusinformer.com/wp-content/uploads/2021/09/The-Simpsons-Profile-Icons-8.png" alt="profile" />
                <h2 className="pt-1.5 font-sans text-base">Admin: {users[0]?.fullname}</h2>
            </div>
      </div>
      <div className="text-grey-darker bg-slate-50 bg-white w-2/5">
        <p>
        <p className="text-2xl px-12 pt-6 font-bold text-cyan-900"> Hello, Admin</p>
        <p className="text-sm px-12 pt-4  text-slate-500">Today is: {date}</p>
        <p className="text-2xl px-4 pt-6 font-bold text-cyan-900">Request</p>
          <div class="grid grid-cols-4 gap-2 text-sm pt-4 px-4">
            <button class="bg-orange-50 text-cyan-900  py-2 px-4 rounded-full w-28 border-solid border-2 border-slate-500">All</button>
            <button class="bg-orange-50 text-cyan-900  py-2 px-4 rounded-full w-28 border-solid border-2 border-slate-500">Pending</button>
            <button class="bg-orange-50 text-cyan-900  py-2 px-4 rounded-full w-28 border-solid border-2 border-slate-500">Denied</button>
            <button class="bg-orange-50 text-cyan-900   py-2 px-4 rounded-full w-28 border-solid border-2 border-slate-500">Approved</button>
          </div>
                  {reimburse.map(object => (
                 <div class="pt-6 bg-white w-full h-4/6 px-4">
                 <div class="block  rounded-lg shadow-2xl border-solid border-2 border-gray-400  bg-white w-full">
                   <p className="float-right text-cyan-900 px-6">Amount 0.1</p>
                   <p class="text-gray-900  leading-tight text-xs mb-4 ">User: {object.user_fullname} </p>
                   <p class="text-gray-700 text-base text-xs mb-4"> 
                   Wallet: {object.wallets}
                   </p>
                   {/* <button type="button" onClick={handleSubmit} className="rounded-full bg-blue-600  text-sm h-2 w-16 float-right ml-36 w-24">Approve</button> */}
                   <p class="text-gray-700 text-base text-xs mb-4">
                   Request: {object.status}
                   </p>
                   <button class="bg-orange-50 text-cyan-900 py-2 px-6 rounded-full w-20 text-sm border-solid border-2 border-slate-500 h-8 ml-96 inset-y-4.5 mb-2">Pay</button>
                   {/* <p className="text-gray-700 text-base text-xs mb-4">Amount: {object.amount}</p>  */}
                   {/* <p className="text-gray-700 text-base text-xs mb-4">Category: {object.category}</p>
                   <p className="text-gray-700 text-base text-xs mb-4">Description: {object.description}</p>  */}
                   {/* <button type="button" onClick={handleSubmit} 
                  className=" px-6  bg-blue-600 text-white  text-xs leading-tight  active:bg-blue-800 w-1 ml-100 float-right top-full">Pay</button>  */}
                 </div>
              </div>
             ))}
        </p>
        </div>

      <div className="flex-1 text-grey-darker text-center bg-slate-50">
      <h2 className="text-2xl px-12 pt-6">Statistics</h2>
      <div className="grid grid-cols-3 gap-4 pl-6">
      <div class="bg-gray-300 pl-2">
          <div class="grid grid-cols-2 divide-x">
            <div>
              <p>Total Spent in</p>
              <p>Education: 0.8</p>
              </div>
            <div className='pl-4 bg-white'>
              <img src="/Education.png " class="h-64 w-96 top-px object-cover"/>
            </div>
        </div> 
      </div>
        <div className="pl-12 w-60">
        <div class="bg-gray-300 pl-2">
          <div class="grid grid-cols-2 divide-x">
            <div>
              <p>Education: 0.8</p>
              </div>
            <div className='bg-white'>
              <img src="/Education.png " class="h-64 w-96 top-px object-cover"/>
            </div>
        </div> 
      </div>
        </div> 
        </div>

      <div class="grid grid-cols-3 gap-4 pt-12 pr-12">
      <div class="bg-gray-300 pl-2">
          <div class="grid grid-cols-2 divide-x">
            <div>
              <p>Education: 0.8</p>
              </div>
            <div className='pl-4 bg-white'>
              <img src="/Education.png " class="h-64 w-96 top-px object-cover"/>
            </div>
        </div> 
      </div>

      <div className="pl-12 w-60">
        <div class="bg-gray-300 pl-2">
          <div class="grid grid-cols-2 divide-x">
            <div>
              <p>Education: 0.8</p>
              </div>
            <div className='bg-white'>
              <img src="/Education.png " class="h-64 w-96 top-px object-cover"/>
            </div>
        </div> 
      </div>
        </div> 
      </div> 
      </div>
    </div>
  );
}
