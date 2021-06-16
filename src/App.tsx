import React from "react";
import MainContainer from "./main/MainContainer/MainContainer";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={"/"} component={MainContainer} />
      </Switch>
    </Router>
  );
}

export default App;
