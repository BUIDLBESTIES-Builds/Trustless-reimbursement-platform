import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import {
 
    Link
  } from "react-router-dom";
  

function Home() {



  return (
    <div class="flex items-stretch bg-grey-lighter bg-red-50 min-h-screen">
    <div class="flex-1 text-grey-darker text-center bg-grey-light px-4 py-60 m-2">
        <h2 class="mr-24 text-3xl text-cyan-800">Unleash your 
        full potential 
        with Fundly.</h2>
            <h3 class="text-xl text-cyan-800 mr-24 mt-2">We help your company reimburse you in a 
        descentralized way.</h3>
            

        <div class="p-2 flex ml-8">
            
            <div class="w-1/2 flex pl-2">
         <Link to="/user">
         <button type="submit" class="bg-rose-300 text-white p-4 rounded text-sm ml-2 ">
                    User Login
                </button>
            </Link>
            <Link to="/admin">
            <button type="submit" class="bg-rose-300 text-white p-2 ml-20 rounded text-lg">
                    Admin Login
                </button>
            </Link>
                
                
            </div>
        </div>
    </div>
    
    <div class="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2">
    <img src={process.env.PUBLIC_URL + '/images/home.png'} class=" mt-2 mb-2 mr-4"/>

    </div>
  
</div>
  );
}

export default Home;
