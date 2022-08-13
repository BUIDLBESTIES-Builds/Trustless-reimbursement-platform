// import "./App.css";
import { useState } from "react";

function User() {
  const [fullname, setFullname] = useState("");
  const [category, setCategory] = useState("");
  const [amounts, setAmounts] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://trpapi.herokuapp.com/api/user/", {
        method: "POST",
        body: JSON.stringify({
          fullname: fullname,
          category: category,
          amounts: amounts,
          description: description,
          status: status,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      console.log(res);
      let resJson = await res.json();
      if (res.status === 200) {
        setFullname("");
        setCategory("");
        setAmounts("");
        setDescription("");
        setStatus("");
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
          value={fullname}
          placeholder="Full Name"
          onChange={(e) => setFullname(e.target.value)}
        />
        <select name="dropdown">
          <option defaultValue="Category">Category</option>
          <option value="pre-paid">pre-paid</option>
          <option value="Miscellaneous">Miscellaneous</option>
          onChange={(e) => setCategory(e.target.value)}
        </select>

        <input
          type="text"
          value={amounts}
          placeholder="Amount"
          onChange={(e) => setAmounts(e.target.value)}
        />
        <input
          type="text"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <select name="dropdown">
          <option defaultValue="Status">Status</option>
          <option value="PENDING">PENDING</option>
          <option value="APPROVED">APPROVED</option>
          onChange={(e) => setStatus(e.target.value)}
        </select>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default User;
