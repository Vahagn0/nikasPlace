import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import './login/login.css'
import "./users/users.css"
import './createUser/createUser.css'
import Login from './login/login';
import Users from "./users/users"
import CreateUser from './createUser/createUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path='/create' element={<CreateUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
