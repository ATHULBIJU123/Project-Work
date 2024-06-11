import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './index.css'
// import SignIn from './Components/LogInPage/LogIn'
import LogIn from "./Components/LogInPage/LogIn";
import Admin from "./Components/Admin/Admin";
import './Components/AddUser/UserNav'
import AddUser from "./Components/AddUser/AddUser";

import LandingPage from "./Components/LandingPage/Landing";
import Getuser from "./Components/GetUser/GetUser";

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" exact element = {<LandingPage />} />
            <Route path="/login" exact element={<LogIn />} />
            <Route path="/adduser" exact element={<AddUser />}/>
            <Route path="/admin" exact element={<Admin />}/>
            <Route path="/getUser" exact element={<Getuser />}/>

          </Routes>


      </Router>
    </>
  )
}

export default App;
