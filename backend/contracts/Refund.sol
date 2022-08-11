
// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;


// contract Refund {

//     uint public amount = 0.1 ether;

//     function send(address payable _addr) payable public {
//         require(msg.value >= amount);
//         _addr.transfer(msg.value);
//     }
// }




pragma solidity >=0.7.0 <0.9.0;

contract Refund {

    // fallback() external payable {}

    address public owner;

     constructor() {
        //owner = msg.sender;
    }

    function sendRefund(address payable _to) public payable {
       //require(msg.value >= 0.01 ether, "Not enough ether sent");
   
        (bool sent,) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

}