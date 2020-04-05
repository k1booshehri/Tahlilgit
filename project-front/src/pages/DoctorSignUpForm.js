import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";

class DoctorSignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",

      f_name: "",
      l_name: "",
      edu: "",
      gender: "",
      field: "",
      birth: "",
      phone: "",
      // insurance: "",
      password: "",
      activetime: "",
      username: "",
      code: ""
      // hasAgreed: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // this.fileInput = React.createRef();
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
    const data = {
      email: this.state.email,
      f_name: this.state.f_name,
      l_name: this.state.l_name,
      edu: this.state.edu,
      gender: this.state.gender,
      field: this.state.field,
      birth: this.state.birth,
      phone: this.state.phone,
      password: this.state.password,
      activetime: this.state.activetime,
      username: this.state.username,
      code: this.state.code
    };
    // var formData = new FormData();
    // formData.append("email", this.state.email);
    // formData.append("f_name", this.state.f_name);
    // formData.append("l_name", this.state.l_name);
    // formData.append("edu", this.state.edu);
    // formData.append("gender", this.state.gender);
    // formData.append("field", this.state.field);
    // formData.append("birth", this.state.birth);
    // formData.append("phone", this.state.phone);
    // formData.append("password", this.state.password);
    // formData.append("activetime", this.state.activetime);
    // formData.append("username", this.state.username);
    // formData.append("code", this.state.code);

    axios
      .post(
        "http://localhost:8000/api/auth/doctor-register",
        {
          email: this.state.email,
          f_name: this.state.f_name,
          l_name: this.state.l_name,
          edu: this.state.edu,
          gender: this.state.gender,
          field: this.state.field,
          birth: this.state.birth,
          phone: this.state.phone,
          password: this.state.password,
          activetime: this.state.activetime,
          username: this.state.username,
          code: this.state.code
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
  }

  render() {
    return (
      <div className="App">
        <div className="App__Form">
          <div className="PageSwitcher">
            <NavLink
              to="/Dr_Sign_In"
              activeClassName="PageSwitcher__Item--Active"
              className="PageSwitcher__Item"
            >
              ورود
            </NavLink>
            <NavLink
              exact
              to="/Dr_Sign_Up"
              activeClassName="PageSwitcher__Item--Active"
              className="PageSwitcher__Item"
            >
              ثبت نام
            </NavLink>
          </div>

          <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormField">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="f_name">
                  نام
                </label>
                <input
                  type="text"
                  className="FormField__Input"
                  id="f_name"
                  name="f_name"
                  placeholder="نام خود را وارد کنید"
                  value={this.state.f_name}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="FormField">
                <label htmlFor="l_name" className="FormField__Label">
                  نام خانوداگی
                </label>
                <input
                  type="text"
                  className="FormField__Input"
                  id="l_name"
                  name="l_name"
                  placeholder="نام خانوادگی خود را وارد کنید"
                  value={this.state.l_name}
                  onChange={this.handleChange}
                  required
                />
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
                  <option value="other">other</option>
                </select>
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

              {/* <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="pictureFile"
              ref={this.fileInput}
            />
            <label className="custom-file-label" htmlFor="pictureFile">
              عکس خود را انتخاب کنید
            </label>
          </div> */}
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
                  onChange={this.handleChange}
                  required
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
                <label className="FormField__Label" htmlFor="username">
                  نام کاربری
                </label>
                <input
                  type="text"
                  className="FormField__Input"
                  id="username"
                  name="username"
                  placeholder="نام کاربری خود را وارد کنید"
                  value={this.state.username}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="FormField">
                <label htmlFor="edu" className="FormField__Label">
                  تحصیلات خود را انتخاب کنید
                </label>
                <select
                  className="FormField__Input"
                  name="edu"
                  id="edu"
                  value={this.state.edu}
                  onChange={this.handleChange}
                  required
                >
                  <option value="masters">کارشناسی ارشد</option>
                  <option value="PHD">دکتری</option>
                </select>
              </div>
              <div className="FormField">
                <label htmlFor="field" className="FormField__Label">
                  تخصص خود را انتخاب کنید
                </label>
                <select
                  name="field"
                  id="field"
                  className="FormField__Input"
                  value={this.state.field}
                  onChange={this.handleChange}
                  required
                >
                  <option value="balini">روان شناسی بالینی</option>
                  <option value="moshavere">روان شناسی مشاوره </option>
                  <option value="khanevade">روان شناسی خانواده </option>
                  <option value="tahisli">روان شناسی تحصیلی </option>
                  <option value="tarbiati">روان شناسی تربیتی </option>
                  <option value="shakhsiat">روان شناسی شخصیت </option>
                  <option value="ejtemaei">روان شناسی اجتماعی </option>
                  <option value="sazmani">روان شناسی صنعتی و سازمانی </option>
                  <option value="masraf">روان شناسی مصرف </option>
                </select>
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="activetime">
                  تاریخ شروع فعالیت پزشکی خود را انتخاب کنید
                </label>
                <input
                  className="FormField__Input__Date"
                  type="date"
                  id="activetime"
                  name="activetime"
                  value={this.state.activetime}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="code">
                  کد نظام پزشکی
                </label>
                <input
                  type="text"
                  className="FormField__Input"
                  id="code"
                  name="code"
                  placeholder="کد نظام پزشکی خود را وارد کنید"
                  value={this.state.code}
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
              {/* <div className="FormField">
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
                <button className="FormField__Button mr-20">ثبت نام</button>{" "}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default DoctorSignUpForm;
