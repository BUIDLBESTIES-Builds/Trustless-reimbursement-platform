import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const makeRefund = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please Install it");
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether),
    });

    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

export default function Admin() {
  const [Users, fetchUsers] = useState([]);
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const addr = "0xf1d440bBA4525A4E43d251F1251d031Eca9DdCdc";
  const ether = "0.1";

  const getData = () => {
    fetch("https://trpapi.herokuapp.com/api/user/")
      .then((res) => res.json())
      .then((res) => {
        fetchUsers(res);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    await makeRefund({
      setError,
      setTxs,
      ether: ether,
      addr: addr,
    });
  };
  const users = Users.filter((user) => {
    return user.is_admin === true;
  });
  return (
    <div className="flex items-stretch bg-grey-lighter min-h-screen">
      <div className="flex-1 text-grey-darker text-center bg-orange-100 flex-none w-64">
        <h1 className="pt-8 font-sans font-semibold text-3xl">Fundly</h1>
        <div className="profile mx-auto rounded-full w-24 pt-28">
          <img
            src="https://www.disneyplusinformer.com/wp-content/uploads/2021/09/The-Simpsons-Profile-Icons-8.png"
            alt="profile"
          />
          <h2 className="pt-2 font-sans text-base font-medium text-xl">
            Admin
          </h2>
          <h3 className="font-sans text-base font-normal">
            {users[0]?.fullname}
          </h3>
          <div class="grid grid-cols-2 text-sm pt-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <h2 className=" font-sans text-base  text-lg">Dashboard</h2>
          </div>

          <div class="grid grid-cols-2 text-sm pt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="font-sans text-base text-lg">Settings</h2>
          </div>
        </div>
      </div>
      <div className="flex-1 text-grey-darker bg-slate-50">
        <h1 className="pt-8 pl-8 font-sans font-semibold text-3xl">
          Hello, User
        </h1>
        <p className=" pl-8 font-sans text-gray-500">
          Today is Wednesday, 03 August 2022
        </p>
        <p className="text-2xl px-12 pt-6 font-semibold">
          Reimbusment history
          <div class="grid grid-cols-4 gap-2 text-sm pt-6">
            <button class="bg-orange-100  hover:bg-blue-700 text-black  py-2 px-4 rounded-full w-24">
              All
            </button>
            <button class="bg-orange-100  hover:bg-blue-700 text-black py-2 px-4 rounded-full w-24">
              Approved
            </button>
            <button class="bg-orange-100  hover:bg-blue-700 text-black  py-2 px-4 rounded-full w-24">
              Pending
            </button>
            <button class="bg-orange-100  hover:bg-blue-700 text-black  py-2 px-4 rounded-full w-24">
              Denied
            </button>
          </div>
          <div class="grid grid-rows-4 gap-2 pt-4 ">
            <div class="flex flex-cols justify-between text-sm p-4 pb-4 border-2 border-solid border-orange-100	 rounded-md ">
              <div class="flex flex-row">
                {/* <div class="p-2">image</div> */}
                <img
                  src="images/education_icon.png"
                  class="w-12 h-12 mt-2 mr-4"
                />
                <div class="grid grid-rows-2">
                  <p className="font-sans font-normal text-lg">Figma Course</p>
                  <button class=" text-sm bg-orange-100 hover:bg-blue-700 text-black  py-2 px-2 rounded-full w-20">
                    Approved
                  </button>
                </div>
              </div>

              <div className="font-sans font-semibold text-2xl p-4">
                $180.00
              </div>
            </div>
            <div class="flex flex-cols justify-between text-sm p-4 pb-4 border-2 border-solid border-orange-100	 rounded-md ">
              <div class="flex flex-row">
                <img src="images/gym_icon.png" class="w-12 h-12 mt-2 mr-4" />
                <div class="grid grid-rows-2">
                  <p className="font-sans font-normal text-lg">Gym - August</p>
                  <button class=" text-sm bg-orange-100 hover:bg-blue-700 text-black  py-2 px-2 rounded-full w-20">
                    Denied
                  </button>
                </div>
              </div>

              <div className="font-sans font-semibold text-2xl p-4">$54.00</div>
            </div>
            <div class="flex flex-cols justify-between text-sm p-4 pb-4 border-2 border-solid border-orange-100	 rounded-md ">
              <div class="flex flex-row">
                <img src="images/travel_icon.png" class="w-12 h-12 mt-2 mr-4" />
                <div class="grid grid-rows-2">
                  <p className="font-sans font-normal text-lg">
                    Travel Expenses
                  </p>
                  <button class=" text-sm bg-orange-100 hover:bg-blue-700 text-black  py-2 px-2 rounded-full w-20">
                    Pending
                  </button>
                </div>
              </div>

              <div className="font-sans font-semibold text-2xl p-4">
                $800.00
              </div>
            </div>
            <div class="flex flex-cols justify-between text-sm p-4 pb-4 border-2 border-solid border-orange-100	 rounded-md ">
              <div class="flex flex-row">
                <img src="images/tech_icon.png" class="w-12 h-12 mt-2 mr-4" />
                <div class="grid grid-rows-2">
                  <p className="font-sans font-normal text-lg">Macbook</p>
                  <button class=" text-sm bg-orange-100 hover:bg-blue-700 text-black  py-2 px-2 rounded-full w-20">
                    Approved
                  </button>
                </div>
              </div>

              <div className="font-sans font-semibold text-2xl p-4">
                $1299.00
              </div>
            </div>
          </div>
          <div class="flex justify-center pt-4">
            <div class="block p-6 rounded-lg shadow-lg bg-white max-w-md">
              <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">
                User:{" "}
              </h5>
              <p class="text-gray-700 text-base mb-4">
                Wallet: 0xf1d440bBA4525A4E43d251F1251d031Eca9DdCdc
              </p>
              <p class="text-gray-700 text-base mb-4">Request: Pending</p>
              <p className="text-gray-700 text-base mb-4">Amount: 0.1 Eth</p>
              <p className="text-gray-700 text-base mb-4">
                Category: Education
              </p>
              <p className="text-gray-700 text-base mb-4">
                Description: short course on data structures and algorithms
              </p>
              <button
                type="button"
                onClick={handleSubmit}
                className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Pay
              </button>
            </div>
          </div>
        </p>
      </div>
      <div className="flex-1 text-grey-darker  bg-slate-50">
        <h2 className="text-2xl px-12 pt-28 font-semibold">Statistics</h2>
        <div class="grid grid-cols-3 gap-4 pt-10 pl-10">
          <div class="...">
            <div class="flex justify-center">
              <div class="rounded-lg shadow-lg bg-red-200 max-w-sm w-80 h-60">
                <a
                  href="#!"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                ></a>
                <div>
                  <div class="text-left pl-4">
                    <img
                      src="images/education_icon.png"
                      class="w-10 h-10 mt-20 mb-2 mr-4"
                    />
                    <p class="text-gray-700 text-base ">Total Spent in</p>
                    <h5 class="text-gray-900 text-2xl font-medium mb-2">
                      Education
                    </h5>
                  </div>

                  <h1 class="text-white bg-red-400 text-left text-4xl font-bold p-4 mb-2 m-0 rounded-b-lg">
                    $5k
                  </h1>
                </div>
              </div>
            </div>
          </div>
          {/* <div class="">
            <div class="flex justify-center">
              <div class="rounded-lg shadow-lg bg-fuchsia-100 max-w-sm w-80 h-60 ">
                <a
                  href="#!"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                ></a>
                <div class="pr-6">
                  <h5 class="text-gray-900 text-xl font-medium mb-2">
                    Education
                  </h5>
                  <p class="text-gray-700 text-base mb-4">Total Spent: $0</p>
                  <p class="text-gray-700 text-base mb-4">Total Users: 0</p>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div class="pl-14">
            <div class="flex justify-center">
              <div class="rounded-lg shadow-lg bg-orange-300 max-w-sm w-80 h-60">
                <a
                  href="#!"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                ></a>
                <div class="p-6">
                  <h5 class="text-gray-900 text-xl font-medium mb-2">
                    Education
                  </h5>
                  <p class="text-gray-700 text-base mb-4">Total Spent: $0;</p>
                  <p class="text-gray-700 text-base mb-4">Total Users: 0</p>
                </div>
              </div>
            </div>
          </div> */}
          <div class="...">
            <div class="flex justify-center">
              <div class="rounded-lg shadow-lg bg-cyan-200 max-w-sm w-80 h-60">
                <a
                  href="#!"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                ></a>
                <div>
                  <div class="text-left pl-4">
                    <img
                      src="images/travel_icon.png"
                      class="w-10 h-10 mt-20 mb-2 mr-4"
                    />
                    <p class="text-gray-700 text-base ">Total Spent in</p>
                    <h5 class="text-gray-900 text-2xl font-medium mb-2">
                      Travel
                    </h5>
                  </div>

                  <h1 class="text-white bg-cyan-500 text-left text-4xl font-bold p-4 mb-2 m-0 rounded-b-lg">
                    $3k
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4 pt-12 pl-10">
          <div class="...">
            <div class="flex justify-center">
              <div class="rounded-lg shadow-lg bg-amber-200 max-w-sm w-80 h-60">
                <a
                  href="#!"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                ></a>
                <div>
                  <div class="text-left pl-4">
                    <img
                      src="images/gym_icon.png"
                      class="w-10 h-10 mt-20 mb-2 mr-4"
                    />
                    <p class="text-gray-700 text-base ">Total Spent in</p>
                    <h5 class="text-gray-900 text-2xl font-medium mb-2">Gym</h5>
                  </div>

                  <h1 class="text-white bg-amber-400 text-left text-4xl font-bold p-4 mb-2 m-0 rounded-b-lg">
                    $2k
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div class="...">
            <div class="flex justify-center">
              <div class="rounded-lg shadow-lg bg-indigo-200 max-w-sm w-80 h-60">
                <a
                  href="#!"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                ></a>
                <div>
                  <div class="text-left pl-4">
                    <img
                      src="images/tech_icon.png"
                      class="w-10 h-10 mt-20 mb-2 mr-4"
                    />
                    <p class="text-gray-700 text-base ">Total Spent in</p>
                    <h5 class="text-gray-900 text-2xl font-medium mb-2">
                      Tech
                    </h5>
                  </div>

                  <h1 class="text-white bg-indigo-800 text-left text-4xl font-bold p-4 mb-2 m-0 rounded-b-lg">
                    $1k
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* <div class="pl-14">
            <div class="flex justify-center">
              <div class="rounded-lg shadow-lg bg-violet-300 max-w-sm w-80 h-60">
                <a
                  href="#!"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                ></a>
                <div class="p-6">
                  <h5 class="text-gray-900 text-xl font-medium mb-2">
                    Education
                  </h5>
                  <p class="text-gray-700 text-base mb-4">Total spent: $0</p>
                  <p class="text-gray-700 text-base mb-4">Total Users: 0</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
