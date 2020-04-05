import React, { Component } from "react";
import { HashRouter as Router, Route, Link, NavLink } from "react-router-dom";
import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";
import welcome from "./pages/welcome";
import SignInResponse from "./pages/SignInResponse";
import SignUpResponse from "./pages/SignUpResponse";
import DoctorSignUpForm from "./pages/DoctorSignUpForm";
import DoctorSignInForm from "./pages/DoctorSignInForm";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App1">
          <Route exact path="/" component={welcome}></Route>

          <Route exact path="/sign-up" component={SignUpForm}></Route>
          <Route exact path="/sign-in" component={SignInForm}></Route>
          <Route
            exact
            path="/SignInResponse"
            component={SignInResponse}
          ></Route>
          <Route
            exact
            path="/SignUpResponse"
            component={SignUpResponse}
          ></Route>
          <Route exact path="/Dr_Sign_Up" component={DoctorSignUpForm}></Route>
          <Route path="/Dr_Sign_In" component={DoctorSignInForm}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
