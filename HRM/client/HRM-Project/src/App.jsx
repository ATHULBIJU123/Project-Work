import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from './Components/LandingPage/Navigation'
import Container from './Components/LandingPage/Container'
import SignIn from './Components/LogInPage/LogIn'
import "./Components/LogInPage/LogIn.css"
import './Components/UserPage/UserNav'
import UserNav from "./Components/UserPage/UserNav";

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Container />
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
