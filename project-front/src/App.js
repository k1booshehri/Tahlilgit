import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect,
} from "react-router-dom";
import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";
import welcome from "./pages/welcome";

import DoctorSignUpForm from "./pages/DoctorSignUpForm";
import DoctorSignInForm from "./pages/DoctorSignInForm";
import Drlist from "./pages/Drlists";

import "./App.css";
/*import DrDashboard from "./pages/DrDashboard";*/
/*import PatientDashboard from "./pages/PatientDashboard";*/
class App extends Component {
  render() {
    return (
      <Router>
        <div >
          <Route exact path="/" component={welcome}></Route>

          <Route exact path="/sign-up" component={SignUpForm}></Route>
          <Route exact path="/sign-in" component={SignInForm}></Route>

          <Route exact path="/Dr_Sign_Up" component={DoctorSignUpForm}></Route>
          <Route path="/Dr_Sign_In" component={DoctorSignInForm}></Route>
          <Route path="/Dr_list" component={Drlist}></Route>
         
        </div>
      </Router>
    );
  }
}

export default App;
