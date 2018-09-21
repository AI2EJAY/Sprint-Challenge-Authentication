import React, { Component } from "react";
import { Route } from "react-router-dom";

import Signup from "./components/Auth/Signup";
import Signin from "./components/Auth/Signin";
import Jokes from "./components/Jokes/Jokes";
import Home from "./components/Home";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/jokes" component={Jokes} />
      </div>
    );
  }
}

export default App;
