import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NewPortraitPage from "./components/new_portrait_form";
import Nav from './components/nav';
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/new">
          <NewPortraitPage />
        </Route>
        <Route path="/explore">
          <h1>explore</h1>
        </Route>
        <Route exact path="/">
          <h1>All</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
