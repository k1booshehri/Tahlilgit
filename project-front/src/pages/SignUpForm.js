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

class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      confirmNewPassword: "",

      f_name: "",
      l_name: "",
      username: "",
      birth: "",
      city: "",
      gender: "",
      phone: "",
      insurance: "",
      isSignedUp: false,
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

    if (
      this.state.confirmNewPassword !== "" &&
      this.state.confirmNewPassword === this.state.password
    ) {
      axios
        .post(
          "http://myravanyar.ir/api/auth/patient-register",
          {
            password: this.state.password,
            f_name: this.state.f_name,
            l_name: this.state.l_name,
            username: this.state.username,
            // birth: this.state.birth,
            // gender: this.state.gender,
            // phone: this.state.phone,
            // insurance: this.state.insurance,
            // city: this.state.city,
            email: this.state.email,
          },
          { headers: { "content-type": "application/json" } }
        )
        .then((res) => {
          if (res.status === 200) {
            sessionStorage.setItem("token", res.data.token);
            localStorage.setItem("eventKey", "2");

            this.setState({ isSignedUp: true });
          }
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            alert("موفقیت آمیز نبود . دوباره امتحان کنید");
          }
        });
    } else if (this.state.confirmNewPassword !== this.state.password) {
      alert("تکرار رمز ورود اشتباه است");
      this.setState({ password: "", confirmNewPassword: "" });
    }
  }

  render() {
    if (this.state.isSignedUp) {
      // redirect to dashboard if signed up
      return <Redirect to={{ pathname: "/PatientDashboard" }} />;
    }
    if (!this.state.isSignedUp) {
      return (
        <div className="App">
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
          <div className="App__Form">
            <div className="FormCenter">
              <form onSubmit={this.handleSubmit} className="FormFields">
                {/*            
            <div className="FormTitle">
            <a exact to="/" activeclassname="FormTitle__Link--Active" className="FormTitle__Link"> ثبت نام </a></div> */}

                <div className="FormField">
                  <label className="FormField__Label" htmlFor="f_name">
                    نام
                  </label>
                  <input
                    type="text"
                    id="f_name"
                    className="FormField__Input"
                    placeholder="نام خود را وارد کنید"
                    name="f_name"
                    value={this.state.f_name}
                    onChange={this.handleChange}
                    required
                    onInvalid={(e) =>
                      e.target.setCustomValidity("وارد کردن اطلاعات الزامی است")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                  />
                </div>

                <div className="FormField">
                  <label className="FormField__Label" htmlFor="l_name">
                    نام خانوادگی
                  </label>
                  <input
                    type="text"
                    id="l_name"
                    className="FormField__Input"
                    placeholder="نام خانوادگی خود را وارد کنید"
                    name="l_name"
                    value={this.state.lastname}
                    onChange={this.handleChange}
                    required
                    onInvalid={(e) =>
                      e.target.setCustomValidity("وارد کردن اطلاعات الزامی است")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                  />
                </div>

                <div className="FormField">
                  <label className="FormField__Label" htmlFor="username">
                    نام کاربری{" "}
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="FormField__Input"
                    placeholder="نام کاربری خود را وارد کنید"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    onInvalid={(e) =>
                      e.target.setCustomValidity("وارد کردن اطلاعات الزامی است")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    required
                  />
                </div>

                <div className="FormField">
                  <label className="FormField__Label" htmlFor="email">
                    آدرس ایمیل
                  </label>
                  <input
                    type="email"
                    className="FormField__Input"
                    style={{ fontFamily: "Katibeh" }}
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    value={this.state.email}
                    onChange={this.handleChange}
                    onInvalid={(e) =>
                      e.target.setCustomValidity("وارد کردن اطلاعات الزامی است")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    required
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
                    placeholder="رمز خود را انتخاب کنید"
                    value={this.state.password}
                    onChange={this.handleChange}
                    onInvalid={(e) =>
                      e.target.setCustomValidity("وارد کردن اطلاعات الزامی است")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    required
                  />
                </div>
                <div className="FormField">
                  <label
                    className="FormField__Label"
                    htmlFor="confirmNewPassword"
                  >
                    تکرار رمز ورود
                  </label>
                  <input
                    type="password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    className="FormField__Input"
                    placeholder="رمز خود را تکرار کنید"
                    value={this.state.confirmNewPassword}
                    onChange={this.handleChange}
                    onInvalid={(e) =>
                      e.target.setCustomValidity("وارد کردن اطلاعات الزامی است")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    required
                  />
                </div>

                {/* <div className="FormField1">
                <label className="FormField__CheckboxLabel">
                  <input
                    className="FormField__Checkbox"
                    type="checkbox"
                    name="hasAgreed"
                    value={this.state.hasAgreed}
                    onChange={this.handleChange}
                  />{" "}
                  I agree all statements in{" "}
                  <a href="" className="FormField__TermsLink">
                    terms of service
                  </a>
                </label>
              </div> */}

                <div className="FormField1">
                  <button className="FormField__Button2">ثبت نام</button>
                  {/* <Link to="/sign-in" className="FormField__Link">
                  قبلا ثبت نام کرده ام
                </Link> */}
                </div>
              </form>
            </div>
            <div className="formcenter-part2"></div>
          </div>
        </div>
      );
    }
  }
}

export default SignUpForm;
