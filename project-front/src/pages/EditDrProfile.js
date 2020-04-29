import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import FileBase64 from 'react-file-base64';
import avatar from './avatarpic.png';
import {
  HashRouter as Router,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";


export default class EditDrProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //object is used for saving get responses
      drInfo: {},
      //variables used for saving new informations

      f_name: "",
      l_name: "",

      birth: "",
      gender: "",

      field: "",
      edu: "",

      phone: "",
      email: "",

      code: "",
      activetime: "",

      newPassword: "",
      confirmNewPassword: "",
      username: "",

      dateType: "text",

      
      file: null,
      isStateSet: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    this.getItems();
  }

  //get request for getting current profile informations
  getItems() {
    fetch("http://localhost:8000/api/auth/doctor-user", {
      method: "GET",
      headers: {
        Authorization: "token " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.parsingInformation(res);
        this.setState({ isStateSet: true });
      })
      .catch((error) => console.error("Error:", error));
  }

  //function for parsing get response and add them to drInfo{}
  parsingInformation(res) {
    let information = res;

    //conditions for education value
    let persianEdu0 = "";
    if (information.edu === "phd") {
      persianEdu0 = "دکتری";
    } else if (information.edu === "masters") {
      persianEdu0 = "کارشناسی ارشد";
    }
    //initializng drInfo
    this.state.drInfo = {
      l_name: information.l_name,
      f_name: information.f_name,
      email: information.email,
      field: information.field,
      gender: information.gender,
      username: information.username,
      code: information.code,
      birth: information.birth,
      phone: information.phone,
      activetime: information.activetime,
      persianEdu: persianEdu0,
      image : information.pp,
      
    };

   
  }
  getFiles(files){
    this.setState({ file: files.base64 })

    
 }

  //function for initializing informations that user want them changed
  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  //function for handling edit button
  handleEdit(e) {
    e.persist();

    //object that is passed in put request
    let changedDrInfo = {};

    //if a state has been changed it is added to changedDrInfo
    if(this.state.file !== null){
      changedDrInfo.pp = this.state.file;
    }

    if (this.state.l_name !== "") {
      changedDrInfo.l_name = this.state.l_name;
    }
    if (this.state.f_name !== "") {
      changedDrInfo.f_name = this.state.f_name;
    }
    if (this.state.email !== "") {
      changedDrInfo.email = this.state.email;
    }
    if (this.state.phone !== "") {
      changedDrInfo.phone = this.state.phone;
    }
    if (this.state.field !== "") {
      changedDrInfo.field = this.state.field;
    }
    if (this.state.edu !== "") {
      changedDrInfo.edu = this.state.edu;
    }
    if (this.state.birth !== "") {
      changedDrInfo.birth = this.state.birth;
    }
    if (this.state.gender !== "") {
      changedDrInfo.gender = this.state.gender;
    }
    if (this.state.code !== "") {
      changedDrInfo.code = this.state.code;
    }
    if (this.state.activetime !== "") {
      changedDrInfo.activetime = this.state.activetime;
    }
    if (this.state.username !== "") {
      changedDrInfo.username = this.state.username;
    }
    if (this.state.edu !== "") {
      changedDrInfo.edu = this.state.edu;
    }
    //if password confirming is correct put request happens
    if (
      this.state.confirmNewPassword !== "" &&
      this.state.confirmNewPassword === this.state.newPassword
    ) {
      changedDrInfo.password = this.state.confirmNewPassword;

      axios
        .put(
          "http://localhost:8000/api/auth/update-user",

          changedDrInfo,

          {
            headers: {
              "content-type": "application/json",
              Authorization: "token " + sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            //update eventKey at DrDashboard.js and render DoctorProfile.js
            this.props.updateState(e);
            alert("موفقیت آمیز بود");
          }
        })
        .catch(function (error) {
          if (error.response) {
            alert("موفقیت آمیز نبود . دوباره امتحان کنید");
          }
        });
    } else if (this.state.confirmNewPassword !== this.state.newPassword) {
      alert("تکرار رمز ورود اشتباه است");
      this.setState({ newPassword: "", confirmNewPassword: "" });
    } else if (this.state.confirmNewPassword === "") {
      axios
        .put(
          "http://localhost:8000/api/auth/update-user",

          changedDrInfo,

          {
            headers: {
              "content-type": "application/json",
              Authorization: "token " + sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            //update eventKey at DrDashboard.js and render DoctorProfile.js
            this.props.updateState(e);
            alert("موفقیت آمیز بود");
          }
        })
        .catch(function (error) {
          if (error.response) {
            alert("موفقیت آمیز نبود . دوباره امتحان کنید");
          }
        });
    }
  }

  render() {

    return (
      <div className="DrProfileForm">

         {this.state.drInfo.image !== null ? (
           
            <img src={ this.state.drInfo.image } className="avatar"/>
            
          ) : (
            <img src= {avatar} className="avatar"/>
          )} 
            <div>
             <FileBase64  onDone={ this.getFiles.bind(this) } />
           
          </div>
        <div className="DrProfileInfoTable">
          {" "}
          <div className="DrProfileTableRow">
            {" "}
            <div className="DrProfileLeftTableCell">
              {" "}
              <div className="DrProfileFormField">

                <label htmlFor="l_name" className="DrProfileFormField__Label">
                  نام خانوداگی
                </label>
                <input
                  type="text"
                  className="DrProfileFormField__Input"
                  id="l_name"
                  name="l_name"
                  value={this.state.l_name}
                  placeholder={this.state.drInfo.l_name}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="DrProfileRightTableCell">
              {" "}
              <div className="DrProfileFormField">
                <label className="DrProfileFormField__Label" htmlFor="f_name">
                  نام
                </label>
                <input
                  type="text"
                  className="DrProfileFormField__Input"
                  id="f_name"
                  name="f_name"
                  value={this.state.f_name}
                  placeholder={this.state.drInfo.f_name}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="DrProfileTableRow">
            <div className="DrProfileLeftTableCell">
              <div className="DrProfileFormField">
                <label className="DrProfileFormField__Label" htmlFor="birth">
                  تاریخ تولد
                </label>
                <input
                  type={this.state.dateType}
                  className="DrProfileFormField__Input"
                  id="birth"
                  name="birth"
                  value={this.state.birth}
                  onFocus={(e) => this.setState({ dateType: "date" })}
                  onBlur={(e) => this.setState({ dateType: "text" })}
                  placeholder={this.state.drInfo.birth}
                  onChange={this.handleChange}
                />
              </div>
            </div>{" "}
            <div className="DrProfileRightTableCell">
              {" "}
              <div className="DrProfileFormField">
                <label htmlFor="gender" className="DrProfileFormField__Label">
                  جنسیت
                </label>

                <select
                  className="FormField__Input"
                  name="gender"
                  id="gender"
                  value={this.state.gender}
                  onChange={this.handleChange}
                >
                  <option value="" selected disabled hidden>
                    {this.state.drInfo.gender}
                  </option>
                  <option value="زن">زن</option>
                  <option value="مرد">مرد</option>
                  <option value="سایر">سایر</option>
                </select>
              </div>
            </div>
          </div>
          <div className="DrProfileTableRow">
            <div className="DrProfileLeftTableCell">
              <div className="DrProfileFormField">
                <label className="DrProfileFormField__Label" htmlFor="email">
                  آدرس ایمیل
                </label>
                <input
                  type="email"
                  className="DrProfileFormField__Input"
                  id="email"
                  name="email"
                  value={this.state.email}
                  placeholder={this.state.drInfo.email}
                  onChange={this.handleChange}
                />
              </div>
            </div>{" "}
            <div className="DrProfileRightTableCell">
              {" "}
              <div className="DrProfileFormField">
                <label className="DrProfileFormField__Label" htmlFor="phone">
                  شماره ی موبایل
                </label>
                <input
                  type="tel"
                  className="DrProfileFormField__Input"
                  id="phone"
                  name="phone"
                  pattern="[0][9]\d{9}$"
                  value={this.state.phone}
                  placeholder={this.state.drInfo.phone}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="DrProfileTableRow">
            <div className="DrProfileLeftTableCell">
              {" "}
              <div className="DrProfileFormField">
                <label htmlFor="field" className="DrProfileFormField__Label">
                  تخصص
                </label>
                <select
                  name="field"
                  id="field"
                  className="FormField__Input"
                  value={this.state.field}
                  onChange={this.handleChange}
                >
                  <option value="" selected disabled hidden>
                    {this.state.drInfo.field}
                  </option>
                  <option value="روان شناسی بالینی">روان شناسی بالینی</option>
                  <option value="روان شناسی مشاوره">روان شناسی مشاوره </option>
                  <option value="روان شناسی خانواده">
                    روان شناسی خانواده{" "}
                  </option>
                  <option value="روان شناسی تحصیلی">روان شناسی تحصیلی </option>
                  <option value="روان شناسی تربیتی">روان شناسی تربیتی </option>
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
            </div>{" "}
            <div className="DrProfileRightTableCell">
              {" "}
              <div className="DrProfileFormField">
                <label htmlFor="edu" className="DrProfileFormField__Label">
                  تحصیلات
                </label>
                <select
                  className="FormField__Input"
                  name="edu"
                  id="edu"
                  value={this.state.edu}
                  onChange={this.handleChange}
                >
                  <option value="" selected disabled hidden>
                    {this.state.drInfo.persianEdu}
                  </option>
                  <option value="masters">کارشناسی ارشد</option>
                  <option value="phd">دکتری</option>
                </select>
              </div>
            </div>
          </div>
          <div className="DrProfileTableRow">
            <div className="DrProfileLeftTableCell">
              <div className="DrProfileFormField">
                <label className="DrProfileFormField__Label" htmlFor="code">
                  کد نظام پزشکی
                </label>
                <input
                  type="text"
                  className="DrProfileFormField__Input"
                  id="code"
                  name="code"
                  value={this.state.code}
                  placeholder={this.state.drInfo.code}
                  onChange={this.handleChange}
                />
              </div>
            </div>{" "}
            <div className="DrProfileRightTableCell">
              {" "}
              <div className="DrProfileFormField">
                <label
                  className="DrProfileFormField__Label"
                  htmlFor="activetime"
                >
                  تاریخ شروع فعالیت پزشکی
                </label>
                <input
                  type={this.state.dateType}
                  className="DrProfileFormField__Input"
                  id="activetime"
                  name="activetime"
                  value={this.state.activetime}
                  onFocus={(e) => this.setState({ dateType: "date" })}
                  onBlur={(e) => this.setState({ dateType: "text" })}
                  placeholder={this.state.drInfo.activetime}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="DrProfileTableRow">
            <div className="DrProfileLeftTableCell">
              {" "}
              <div className="DrProfileFormField">
                <label
                  className="DrProfileFormField__Label"
                  htmlFor="newPassword"
                >
                  رمز ورود جدید
                </label>
                <input
                  type="password"
                  className="DrProfileFormField__Input"
                  id="newPassword"
                  name="newPassword"
                  value={this.state.newPassword}
                  placeholder="رمز ورود جدید را وارد کنید"
                  onChange={this.handleChange}
                />
              </div>
            </div>{" "}
            <div className="DrProfileRightTableCell">
              {" "}
              <div className="DrProfileFormField">
                <label className="DrProfileFormField__Label" htmlFor="username">
                  نام کاربری
                </label>
                <input
                  type="text"
                  className="DrProfileFormField__Input"
                  id="username"
                  name="username"
                  value={this.state.username}
                  placeholder={this.state.drInfo.username}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="DrProfileTableRow">
            <div className="DrProfileLeftTableCell">
              {" "}
              <div className="DrProfileFormField">
                <label
                  className="DrProfileFormField__Label"
                  htmlFor="confirmNewPassword"
                >
                  تکرار رمز عبور جدید
                </label>
                <input
                  type="password"
                  className="DrProfileFormField__Input"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  value={this.state.confirmNewPassword}
                  placeholder="رمز ورود جدید را تکرار کنید"
                  onChange={this.handleChange}
                />
              </div>
            </div>{" "}
          </div>
        </div>
        <button
          className="editProfileButton"
          id="3"
          /* if edit profile button is clicked ProfileButtonOnClick is called */
          onClick={this.handleEdit}
          variant="primary"
        >
          ثبت تغییرات
        </button>
      </div>
    );
  }
}
