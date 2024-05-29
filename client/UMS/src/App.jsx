import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from './Components/LandingPage/Container'

import './index.css'
import SignIn from './Components/LogInPage/LogIn'
import "./Components/LogInPage/LogIn.css"
import './Components/UserPage/UserNav'
import UserNav from "./Components/UserPage/UserNav";

import LandingPage from "./Components/LandingPage/Landing";

function App() {
  return (
    <>
      <Router>
      <LandingPage/>

          <Routes>
            <Route path="/login" exact element={<SignIn />} />
          </Routes>

          <Routes>
            <Route path="/add user" exact element={<UserNav />} />
          </Routes>
      </Router>
    </>
  )
}

export default App;
