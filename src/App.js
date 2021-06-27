import React from 'react';
import './App.css';
import * as ROUTES from "./constants/routes"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Landing from './pages/Landing';
import About from './pages/About';
import Donation from './pages/Donation';

function App() {

  return (
    <div className="app">
   


      <Router>
        <Switch>

          <Route exact path ={ROUTES.LANDING} component = {Landing} />
          <Route exact path ={ROUTES.ABOUT} component = {About} />
          <Route exact path ={ROUTES.DONATION} component = {Donation} />

        </Switch>
      </Router>
   
    </div>
  );
}

export default App;
