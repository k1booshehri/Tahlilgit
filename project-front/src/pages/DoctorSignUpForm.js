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
      confirmNewPassword: "",
      activetime: "",
      username: "",
      code: "",
      isSignedUp: false,
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
          "http://myravanyar.ir/api/auth/doctor-register",
          {
            email: this.state.email,
            f_name: this.state.f_name,
            l_name: this.state.l_name,
            // edu: this.state.edu,
            // gender: this.state.gender,
            // field: this.state.field,
            // birth: this.state.birth,
            // phone: this.state.phone,
            password: this.state.password,
            // activetime: this.state.activetime,
            username: this.state.username,
            // code: this.state.code,
          },
          { headers: { "content-type": "application/json" } }
        )
        .then((res) => {
          if (res.status === 200) {
            sessionStorage.setItem("token", res.data.token);
            localStorage.setItem("eventKey", "1");

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
      return <Redirect to={{ pathname: "/DrDashboard" }} />;
    }
    if (!this.state.isSignedUp) {
      return (
        <div className="App">
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
          <div className="App__Form">
           

            <div className="FormCenter">
              <form onSubmit={this.handleSubmit} className="FormFields">
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
                    onInvalid={(e) =>
                      e.target.setCustomValidity("وارد کردن اطلاعات الزامی است")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                  />
                   <label className="FormField__Label" htmlFor="l_name">
                    نام خانوادگی
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
                    onInvalid={(e) =>
                      e.target.setCustomValidity("وارد کردن اطلاعات الزامی است")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                  />
             
                {/* <div className="FormField">
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
                </div> */}

<label className="FormField__Label" htmlFor="email">
                    آدرس ایمیل 
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
                    onInvalid={(e) =>
                      e.target.setCustomValidity("وارد کردن اطلاعات الزامی است")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                  />
              
               <label className="FormField__Label" htmlFor="username">
                    نام کاربری{" "}
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
                    onInvalid={(e) =>
                      e.target.setCustomValidity("وارد کردن اطلاعات الزامی است")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                  />
             
                {/* <div className="FormField">
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
                    <option value="phd">دکتری</option>
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
                    <option value="روان شناسی بالینی">روان شناسی بالینی</option>
                    <option value="روان شناسی مشاوره">
                      روان شناسی مشاوره{" "}
                    </option>
                    <option value="روان شناسی خانواده">
                      روان شناسی خانواده{" "}
                    </option>
                    <option value="روان شناسی تحصیلی">
                      روان شناسی تحصیلی{" "}
                    </option>
                    <option value="روان شناسی تربیتی">
                      روان شناسی تربیتی{" "}
                    </option>
                    <option value="روان شناسی شخصیت">روان شناسی شخصیت </option>
                    <option value="روان شناسی اجتماعی">
                      روان شناسی اجتماعی{" "}
                    </option>
                    <option value="روان شناسی صنعتی و سازمانی">
                      روان شناسی صنعتی و سازمانی{" "}
                    </option>
                    <option value="روان شناسی مصرف">روان شناسی مصرف </option>
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
                </div> */}
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
                    required
                    onInvalid={(e) =>
                      e.target.setCustomValidity("وارد کردن اطلاعات الزامی است")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
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
            <div className="formcenter-part2">روان یار</div>
          </div>
        </div>
      );
    }
  }
}

export default DoctorSignUpForm;
