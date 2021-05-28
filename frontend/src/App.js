import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NewPortraitPage from "./components/new_portrait_form";
import Nav from './components/nav';
import ExplorePage from './pages/explore';
// import logo from './logo.svg';
import './assets/styles/main.scss';

function App() {
  return (
    <Router>
      <Nav />
      <div className="page-contain">
        <Switch>
          <Route path="/new">
            <NewPortraitPage />
          </Route>
          <Route path="/explore">
            <ExplorePage />
          </Route>
          <Route exact path="/">
            <h1>All</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
