import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from './Components/LandingPage/Container'

import './index.css'
// import SignIn from './Components/LogInPage/LogIn'
import LogIn from "./Components/LogInPage/LogIn";
import Admin from "./Components/Admin/Admin";
import './Components/AddUser/UserNav'
// import UserNav from "./Components/AddUser/UserNav";

import LandingPage from "./Components/LandingPage/Landing";

function App() {
  return (
    <>
      <Router>
      <LandingPage/>

          <Routes>
            <Route path="/login" exact element={<LogIn />} />
            <Route path="/admin" exact element={<Admin />}/>
            {/* <Route path="/about" exact element={<UserNav />} /> */}

          </Routes>


      </Router>
    </>
  )
}

export default App;
