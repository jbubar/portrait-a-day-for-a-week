import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import UploadPage from "./pages/upload";
import Nav from './components/nav';
import ExplorePage from './pages/explore';
// import logo from './logo.svg';
import './assets/styles/main.scss';

function App() {
  const [portraits, setPortraits] = useState([])
  const getPortraits = () => {
    axios.get('/api/portraits/').then(portraits => setPortraits(portraits.data))
  }
  const addPortriat = () => {

  }
  useEffect(() => {
    getPortraits();
  }, [])
  return (
    <Router>
      {console.log(portraits)}
      <Nav />
      <div className="page-contain">
        <Switch>
          <Route path="/new">
            <UploadPage />
          </Route>
          <Route path="/explore">
            <ExplorePage portraits={portraits} />
{            console.log('portraits:', portraits)
}          </Route>
          <Route exact path="/">
            <h1>All</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
