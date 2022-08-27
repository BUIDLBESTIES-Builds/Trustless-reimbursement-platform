// import logo from "./logo.svg";
import "./App.css";
import Admin from "./components/admin";
import Reimbursement from "./components/reimbursement";
import User from "./components/user";
import GetPrices from "./components/price";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User2 from "./components/user2";

function App() {
  return (
    <div className="App">
      {/* <Admin /> */}
      {/* <Reimbursement/> */}
      
      {/* <User /> */}
      {/* <Reimbursement /> */}
      {/* <GetPrices /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/user" element={<User2/>}/>
          <Route path="/price" element={<GetPrices/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
