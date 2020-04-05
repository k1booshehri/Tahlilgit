import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";

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

      hasAgreed: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // const data = {
    //   email: this.state.email,
    //   password: this.state.password,
    //   f_name: this.state.f_name,
    //   l_name: this.state.l_name,
    //   username: this.state.username,
    //   birth: this.state.birth,
    //   gender: this.state.gender,
    //   phone: this.state.phone,
    //   insurance: this.state.insurance,
    //   city: this.state.city
    // };

    axios
      .post(
        "http://localhost:8000/api/auth/patient-register",
        {
          password: this.state.password,
          f_name: this.state.f_name,
          l_name: this.state.l_name,
          username: this.state.username,
          birth: this.state.birth,
          gender: this.state.gender,
          phone: this.state.phone,
          insurance: this.state.insurance,
          city: this.state.city
        },
        { headers: { "content-type": "application/json" } }
      )
      .then(function(res) {
        //  console.log(res);
        // let path = "/SignUpResponse";
        // this.props.history.push(path);
        // window.open("/SignUpResponse");
        alert("ثبت نام موفقیت آمیز بود");
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          alert("موفقیت آمیز نبود . دوباره امتحان کنید");
          // console.log(error.response.status);
        }
      });
    // .then(res => {
    //   if (res.status === "404") {
    //     alert("موفقیت آمیز نبود . دوباره امتحان کنید");
    //   }
    //   if (res.status === "200") {
    //     let path = "/SignUpResponse";
    //     this.props.history.push(path);
    //   }
    // });
  }

  render() {
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
                  required
                />
              </div>

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
                  <option value="east-azarbijan">آذربایجان شرقی</option>
                  <option value="west-azarbijan">آذربایجان غربی</option>
                  <option value="ardebil">اردبیل</option>
                  <option value="isfahan">اصفهان</option>
                  <option value="alborz">البرز</option>
                  <option value="ilam">ایلام</option>
                  <option value="boushehr">بوشهر</option>
                  <option value="tehran">تهران</option>
                  <option value="chaharmahal">چهارمحال و بختیاری</option>
                  <option value="south-khorasan">خراسان جنوبی</option>
                  <option value="razavi">خراسان رضوی</option>
                  <option value="north-khorasan">خراسان شمالی</option>
                  <option value="khozestan">خوزستان</option>
                  <option value="zanjan">زنجان</option>
                  <option value="semnan">سمنان</option>
                  <option value="sistan">سیستان و بلوچستان</option>
                  <option value="fars">فارس</option>
                  <option value="ghazvin">قزوین</option>
                  <option value="qom">قم</option>
                  <option value="kordestan">کردستان</option>
                  <option value="kerman">کرمان</option>
                  <option value="kermanshah">کرمانشاه</option>
                  <option value="kohkelouyeh">کهگیلویه و بویراحمد</option>
                  <option value="golestan">گلستان</option>
                  <option value="gilan">گیلان</option>
                  <option value="lorestan">لرستان</option>
                  <option value="mazandaran">مازندران</option>
                  <option value="markazi">مرکزی</option>
                  <option value="hormozgan">هرمزگان</option>
                  <option value="hamedan">همدان</option>
                  <option value="yazd">یزد</option>
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
                  <option value="female">زن</option>
                  <option value="male">مرد</option>
                  <option value="other">سایر</option>
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
                  <option value="ejtemaei"> تأمین اجتماعی</option>
                  <option value="darmani">خدمات درمانی</option>
                  <option value="nirou">نیروهای مسلح</option>
                  <option value="other">سایر</option>
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
              </div>

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

export default SignUpForm;
