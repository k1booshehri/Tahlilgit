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
  }

  render() {
    if (this.state.isSignedUp) {
      // redirect to dashboard if signed up
      return <Redirect to={{ pathname: "/PatientDashboard" }} />;
    }
    if (!this.state.isSignedUp) {
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
                {/* 
                <div className="FormField">
                  <label className="FormField__Label" htmlFor="birth">
                    تاریخ تولد خود را انتخاب کنید
                  </label>
                  <input
                    className="FormField__Input__Date"
                    type="date"
                    id="birth"
                    name="birth"
                    value={this.state.birth}
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="FormField">
                  <label className="FormField__Label" htmlFor="city">
                    استان محل سکونت خود را انتخاب کنید
                  </label>
                  <select
                    value={this.state.city}
                    onChange={this.handleChange}
                    required
                    className="FormField__Input"
                    id="city"
                    placeholder=""
                    name="city"
                  >
                    <option value="آذربایجان شرقی">آذربایجان شرقی</option>
                    <option value="آذربایجان غربی">آذربایجان غربی</option>
                    <option value="آردبیل">اردبیل</option>
                    <option value="اصفهان">اصفهان</option>
                    <option value="البرز">البرز</option>
                    <option value="ایلام">ایلام</option>
                    <option value="بوشهر">بوشهر</option>
                    <option value="تهران">تهران</option>
                    <option value="چهارمحال و بختیاری">
                      چهارمحال و بختیاری
                    </option>
                    <option value="خراسان جنوبی">خراسان جنوبی</option>
                    <option value="خراسان رضوی">خراسان رضوی</option>
                    <option value="خراسان شمالی">خراسان شمالی</option>
                    <option value="خوزستان">خوزستان</option>
                    <option value="زنجان">زنجان</option>
                    <option value="سمنان">سمنان</option>
                    <option value="سیستان و بلوچستان">سیستان و بلوچستان</option>
                    <option value="فارس">فارس</option>
                    <option value="قزوین">قزوین</option>
                    <option value="قم">قم</option>
                    <option value="کردستان">کردستان</option>
                    <option value="کرمان">کرمان</option>
                    <option value="کرمانشاه">کرمانشاه</option>
                    <option value="کهگیلویه و بویراحمد">
                      کهگیلویه و بویراحمد
                    </option>
                    <option value="گلستان">گلستان</option>
                    <option value="گیلان">گیلان</option>
                    <option value="لرستان">لرستان</option>
                    <option value="مازندران">مازندران</option>
                    <option value="مرکزی">مرکزی</option>
                    <option value="هرمزگان">هرمزگان</option>
                    <option value="همدان">همدان</option>
                    <option value="یزد">یزد</option>
                  </select>
                </div>

                <div className="FormField">
                  <label htmlFor="gender" className="FormField__Label">
                    جنسیت خود را وارد کنید
                  </label>
                  <select
                    className="FormField__Input"
                    name="gender"
                    id="gender"
                    value={this.state.gender}
                    onChange={this.handleChange}
                    required
                  >
                    <option value="زن">زن</option>
                    <option value="مرد">مرد</option>
                    <option value="سایر">سایر</option>
                  </select>
                </div>

                <div className="FormField">
                  <label htmlFor="insurance" className="FormField__Label">
                    نوع بیمه ی پزشکی خود را وارد کنید
                  </label>
                  <select
                    className="FormField__Input"
                    name="insurance"
                    id="insurance"
                    value={this.state.insurance}
                    onChange={this.handleChange}
                    required
                  >
                    <option value="تأمین اجتماعی"> تأمین اجتماعی</option>
                    <option value="خدمات درمانی">خدمات درمانی</option>
                    <option value="نیروهای مسلح">نیروهای مسلح</option>
                    <option value="سایر">سایر</option>
                  </select>
                </div>

                <div className="FormField">
                  <label className="FormField__Label" htmlFor="phone">
                    شماره ی موبایل خود را وارد کنید
                  </label>
                  <input
                    className="FormField__Input"
                    placeholder="09*********"
                    type="tel"
                    id="phone"
                    name="phone"
                    pattern="[0][9]\d{9}$"
                    value={this.state.phone}
                    required
                    onChange={this.handleChange}
                  />
                </div> */}

                <div className="FormField">
                  <label className="FormField__Label" htmlFor="email">
                    آدرس ایمیل خود را وارد کنید
                  </label>
                  <input
                    type="email"
                    className="FormField__Input"
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
                    password={this.state.password}
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
                  <button className="FormField__Button mr-20">ثبت نام</button>
                  {/* <Link to="/sign-in" className="FormField__Link">
                  قبلا ثبت نام کرده ام
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

export default SignUpForm;
