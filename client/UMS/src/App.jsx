import React from "react";
import Navigation from "./Components/LandingPage/Navigation";
import { BrowserRouter as Router,  Route, Routes} from "react-router-dom";


function App(){
  return (
    <>
    <Router>
    <Navigation />
    </Router>
    </>
  )
}


export default App;
