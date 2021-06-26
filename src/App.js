import React from 'react';
import './App.css';
import * as ROUTES from "./constants/routes"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import Landing from './pages/Landing';

function App() {

  return (
    <div className="app">
   


      <Router>
        <Switch>

          <Route exact path ={ROUTES.LANDING} component = {Landing} />

        </Switch>
      </Router>
   
    </div>
  );
}

export default App;
