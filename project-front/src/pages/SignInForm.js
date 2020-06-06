import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  HashRouter as Router,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";

class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      isLogedIn: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    axios
      .post(
        "http://myravanyar.ir/api/auth/login",
        {
          username: this.state.username,

          password: this.state.password,
        },
        { headers: { "content-type": "application/json" } }
      )
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem("token", res.data.token);
          localStorage.setItem("eventKey", "2");

          this.setState({ isLogedIn: true });
        }
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          alert("موفقیت آمیز نبود . دوباره امتحان کنید");
        }
      });
  }

  render() {
    if (this.state.isLogedIn) {
      // redirect to dashboard if signed up
      return <Redirect to={{ pathname: "/PatientDashboard" }} />;
    }
    if (!this.state.isLogedIn) {
      return (
        <div className="App">
          <div className="App__Form">
            <div className="PageSwitcher">
              <NavLink
                to="/sign-in"
                activeClassName="PageSwitcher__Item--Active"
                className="PageSwitcher__Item"
              >
                ورود
              </NavLink>
              <NavLink
                exact
                to="/sign-up"
                activeClassName="PageSwitcher__Item--Active"
                className="PageSwitcher__Item"
              >
                ثبت نام
              </NavLink>
            </div>

            <div className="FormCenter">
              <form
                onSubmit={this.handleSubmit}
                className="FormFields"
                onSubmit={this.handleSubmit}
              >
                {/* <div className="FormTitle">
           <a to="" activeclassname="FormTitle__Link--Active" className="FormTitle__Link">ورود</a>
           </div> */}
                <div className="FormField">
                  <label className="FormField__Label" htmlFor="username">
                    نام کاربری
                  </label>
                  <input
                    type="text"
                    className="FormField__Input"
                    id="username"
                    name="username"
                    placeholder=" نام کاربری خود را وارد کنید"
                    value={this.state.username}
                    onChange={this.handleChange}
                    required
                    onInvalid={(e) =>
                      e.target.setCustomValidity("وارد کردن اطلاعات الزامی است")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                  />
                </div>

                <div className="FormField">
                  <label className="FormField__Label" htmlFor="password">
                    رمز ورود
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="FormField__Input"
                    placeholder="رمز خود را وارد کنید"
                    password={this.state.password}
                    onChange={this.handleChange}
                    required
                    onInvalid={(e) =>
                      e.target.setCustomValidity("وارد کردن اطلاعات الزامی است")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                  />
                </div>

                <div className="FormField1">
                  <button className="FormField__Button mr-20">ورود</button>{" "}
                  {/* <Link to="/" className="FormField__Link">
                  ساخت حساب کاربری
                </Link> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SignInForm;
