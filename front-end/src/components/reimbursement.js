import { useState } from "react";
// import "./App.css";



// {
//     "user": 1,
//     "wallets": "0xcD1cAca6d0773B428AD968c01A54148c757c3312",
//     "crypto": "ETH",
//     "upload": null,
//     "status": "PENDING"
// }



export default function Reimbursement() {
    const [wallets, setWallets] = useState("");
    const [crypto, setCrypto] = useState("");
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");
    const[user, setUser] = useState("");

    let handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let res = await fetch("https://trpapi.herokuapp.com/api/reimbursement/", {
          method: "POST",
          body: JSON.stringify({
            wallets: wallets,
            crypto: crypto,
            status: status,
            user: 1,
          }),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
        });
        let resJson = await res.json();
        if (res.status === 200) {
          setWallets("");
          setCrypto("");
          setStatus("");
          setUser("");
          setMessage("User created successfully");
        } else {
          setMessage("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }
    };
    return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={wallets}
          placeholder="wallets"
          onChange={(e) => setWallets(e.target.value)}
        />
        <input
          type="text"
          value={crypto}
          placeholder="crypto"
          onChange={(e) => setCrypto(e.target.value)}
        />
        <input
          type="text"
          value={status}
          placeholder="link to receipt"
          onChange={(e) => setStatus(e.target.value)}
        />

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
    );
}
