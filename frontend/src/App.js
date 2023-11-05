import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import './login/login.css'
import "./users/users.css"
import './createUser/createUser.css'
import './personalPage/personalPage.css'
import './addVisit/addVisit.css'
import './statistics/statistics.css'
import "./sidebar/sideBar.css"
import "./schedule/schedule.css"
import Login from './login/login';
import Users from "./users/users"
import CreateUser from './createUser/createUser';
import PersonalPage from './personalPage/personalPage';
import AddVisit from './addVisit/addVisit';
import Statistics from './statistics/statistics';
import Schedule from "./schedule/schedule";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path='/create' element={<CreateUser />} />
          <Route path='/personalPage/:personalCode' element={<PersonalPage />} />
          <Route path='/addVisit/:personalCode' element={<AddVisit />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
