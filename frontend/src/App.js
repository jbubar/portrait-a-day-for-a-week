import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import UploadPage from "./pages/upload";
import Nav from './components/nav';
import ExplorePage from './pages/explore';
import UpdatePage from './pages/update';
import ListPage from './pages/list-page';
import ShowPage from './pages/show';
import './assets/styles/main.scss';

function App() {
  const [portraits, setPortraits] = useState([])
  const getPortraits = () => {
    axios.get('/api/portraits/').then(portraits => setPortraits(portraits.data))
  }
  const addPortrait = (portrait) => {
    setPortraits([...portraits, portrait])
  }
  const updatePortrait = (portrait) => {
    let newP = portraits.map((p) => p._id === portrait._id ? portrait : p)
    setPortraits([...newP]);
  };
  useEffect(() => {
    getPortraits();
  }, [])
  return (
    <Router>
      <Nav />
      <div className="page-contain">
        <Switch>
          <Route path="/new">
            <UploadPage addPortrait={addPortrait}/>
          </Route>
          <Route path="/explore">
            <ExplorePage portraits={portraits} />
          </Route>
          <Route path="/portraits/:portraitId">
            <ShowPage portraits={portraits} />
          </Route>
          <Route path="/update/:portraitId">
            <UpdatePage updatePortrait={updatePortrait} />
          </Route>
          <Route exact path="/">
            <ListPage portraits={portraits} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
