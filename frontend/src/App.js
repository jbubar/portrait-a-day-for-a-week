import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NewPortraitPage from "./components/new_portrait_page";
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/new">
          <NewPortraitPage />
        </Route>
        <Route exact path="/">
          <h1>Home!!</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
