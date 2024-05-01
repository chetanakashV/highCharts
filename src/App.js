import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard1 from "./Pages/Dashboard1";
import Dashboard2 from "./Pages/Dashboard2";
import Landing from "./Pages/Landing";


function App() {

  return (
    <Router>
      <Routes>
          <Route exact path = "/" element = {<Landing/>}/>
          <Route exact path = "/qualityInspection" element = {<Dashboard1/>}/>
          <Route exact path = "/jobPerformance" element = {<Dashboard2/>}/>
      </Routes>
    </Router>
  );
}

export default App;
