import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import axios from "axios";
import FileBase64 from "react-file-base64";
import avatar from "./avatarpic.png";
import {
  HashRouter as Router,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";

export default class EditPaProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //object is used for saving get responses
      drInfo: {},
      //variables used for saving new informations

      email: "",
      f_name: "",
      l_name: "",
      gender: "",
      birth: "",
      phone: "",
      password: "",
      insurance: "",
      newPassword: "",
      confirmNewPassword: "",
      username: "",
      nullString: "ثبت نشده است",

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
    fetch("http://myravanyar.ir/api/auth/patient-user", {
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

    //initializng drInfo
    this.state.drInfo = {
      l_name: information.l_name,
      f_name: information.f_name,
      email: information.email,
      city: information.city,
      gender: information.gender,
      username: information.username,
      insurance: information.insurance,
      birth: information.birth,
      phone: information.phone,

      image: information.pp,
    };
  }
  getFiles(files) {
    this.setState({ file: files.base64 });
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
    if (this.state.file !== null) {
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
    if (this.state.city !== "") {
      changedDrInfo.city = this.state.city;
    }
    if (this.state.insurance !== "") {
      changedDrInfo.insurance = this.state.insurance;
    }
    if (this.state.birth !== "") {
      changedDrInfo.birth = this.state.birth;
    }
    if (this.state.gender !== "") {
      changedDrInfo.gender = this.state.gender;
    }

    if (this.state.username !== "") {
      changedDrInfo.username = this.state.username;
    }

    //if password confirming is correct put request happens
    if (
      this.state.confirmNewPassword !== "" &&
      this.state.confirmNewPassword === this.state.newPassword
    ) {
      changedDrInfo.password = this.state.confirmNewPassword;

      axios
        .put(
          "http://myravanyar.ir/api/auth/update-user2",

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
          "http://myravanyar.ir/api/auth/update-user2",

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
            <alert></alert>;
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
        <div className="nameInfoTable">
          <div class="nameTableRow ">
            <div class="nameleftTableCell ">
              <div className="nameDisplay">
                {this.state.drInfo.f_name + " " + this.state.drInfo.l_name}
              </div>
              <div style={{ fontSize: 30 }}>{this.state.drInfo.username}</div>
            </div>
            <div class="namerightTableCell">
              {this.state.drInfo.image !== null ? (
                <img
                  src={this.state.drInfo.image}
                  className="ProfileViewAvatar"
                />
              ) : (
                <img src={avatar} className="ProfileViewAvatar" />
              )}
              <div className="ChosePicture">
                <FileBase64
                  className="ChosePictureButton"
                  onDone={this.getFiles.bind(this)}
                ></FileBase64>
              </div>
            </div>
          </div>
        </div>

        <div className="DrProfileInfoTable__Tiltle">
          {" "}
          <div className="DrProfileTableRow__Tiltle">
            {" "}
            <div className="DrProfileLeftTableCell__Tiltle">
              {" "}
              <p></p>
            </div>
            <div className="DrProfileRightTableCell__Tiltle">
              <label
                className="DrProfileFormField__Tiltle"
                style={{ fontSize: 35 }}
                htmlFor="f_name"
              >
                ویرایش اطلاعات حساب کاربری
              </label>
            </div>
          </div>
        </div>
        <hr class="divider__EditProfile"></hr>
        <div className="DrProfileInfoTable">
          <div className="DrProfileTableRow_base">
            <div className="DrProfileLeftTableCell_base">
              {" "}
              <div className="DrProfileTableRow">
                {" "}
                <div className="DrProfileLeftTableCell">
                  {" "}
                  <div className="DrProfileFormField">
                    <input
                      type="text"
                      className="DrProfileFormField__Input__Right"
                      id="l_name"
                      name="l_name"
                      value={this.state.l_name}
                      placeholder={this.state.drInfo.l_name}
                      onChange={this.handleChange}
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div className="DrProfileRightTableCell">
                  {" "}
                  <div className="DrProfileFormField">
                    <label
                      htmlFor="l_name"
                      className="DrProfileFormField__Label"
                    >
                      نام خانوداگی
                    </label>
                  </div>
                </div>
              </div>
              <div className="DrProfileTableRow">
                <div className="DrProfileLeftTableCell">
                  <div className="DrProfileFormField">
                    {this.state.drInfo.birth !== null ? (
                      <input
                        type={this.state.dateType}
                        className="DrProfileFormField__Input__Left"
                        id="birth"
                        name="birth"
                        value={this.state.birth}
                        onFocus={(e) => this.setState({ dateType: "date" })}
                        onBlur={(e) => this.setState({ dateType: "text" })}
                        placeholder={this.state.drInfo.birth}
                        onChange={this.handleChange}
                      />
                    ) : (
                      <input
                        type={this.state.dateType}
                        className="DrProfileFormField__Input__Left"
                        id="birth"
                        name="birth"
                        value={this.state.birth}
                        onFocus={(e) => this.setState({ dateType: "date" })}
                        onBlur={(e) => this.setState({ dateType: "text" })}
                        placeholder={this.state.nullString}
                        onChange={this.handleChange}
                      />
                    )}
                  </div>
                </div>{" "}
                <div className="DrProfileRightTableCell">
                  {" "}
                  <label className="DrProfileFormField__Label" htmlFor="birth">
                    تاریخ تولد
                  </label>
                </div>
              </div>
              <div className="DrProfileTableRow">
                <div className="DrProfileLeftTableCell">
                  <div className="DrProfileFormField">
                    <input
                      type="email"
                      className="DrProfileFormField__Input__Left"
                      id="email"
                      name="email"
                      value={this.state.email}
                      placeholder={this.state.drInfo.email}
                      onChange={this.handleChange}
                      autocomplete="off"
                    />
                  </div>
                </div>{" "}
                <div className="DrProfileRightTableCell">
                  {" "}
                  <label className="DrProfileFormField__Label" htmlFor="email">
                    آدرس ایمیل
                  </label>
                </div>
              </div>
              <div className="DrProfileTableRow">
                <div className="DrProfileLeftTableCell">
                  {" "}
                  <div className="DrProfileFormField">
                    <select
                      className="DrProfileFormField__Input__Left"
                      name="city"
                      id="city"
                      value={this.state.city}
                      onChange={this.handleChange}
                    >
                      {this.state.drInfo.city !== null ? (
                        <option value="" selected disabled hidden>
                          {this.state.drInfo.city}
                        </option>
                      ) : (
                        <option value="" selected disabled hidden>
                          {this.state.nullString}
                        </option>
                      )}
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
                      <option value="سیستان و بلوچستان">
                        سیستان و بلوچستان
                      </option>
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
                </div>{" "}
                <div className="DrProfileRightTableCell">
                  {" "}
                  <label htmlFor="city" className="DrProfileFormField__Label">
                    شهر
                  </label>
                </div>
              </div>
            </div>
            <div className="DrProfileRightTableCell_base">
              {" "}
              <div className="DrProfileTableRow">
                {" "}
                <div className="DrProfileLeftTableCell">
                  {" "}
                  <div className="DrProfileFormField">
                    <input
                      type="text"
                      className="DrProfileFormField__Input__Right"
                      id="f_name"
                      name="f_name"
                      value={this.state.f_name}
                      placeholder={this.state.drInfo.f_name}
                      onChange={this.handleChange}
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div className="DrProfileRightTableCell">
                  <label className="DrProfileFormField__Label" htmlFor="f_name">
                    نام
                  </label>
                </div>
              </div>
              <div className="DrProfileTableRow">
                <div className="DrProfileLeftTableCell">
                  <div className="DrProfileFormField">
                    <div className="DrProfileFormField">
                      {this.state.drInfo.gender !== null ? (
                        <select
                          className="DrProfileFormField__Input__Left"
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
                      ) : (
                        <select
                          className="DrProfileFormField__Input__Left"
                          name="gender"
                          id="gender"
                          value={this.state.gender}
                          onChange={this.handleChange}
                        >
                          <option value="" selected disabled hidden>
                            {this.state.nullString}
                          </option>
                          <option value="زن">زن</option>
                          <option value="مرد">مرد</option>
                          <option value="سایر">سایر</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>{" "}
                <div className="DrProfileRightTableCell">
                  {" "}
                  <label htmlFor="gender" className="DrProfileFormField__Label">
                    جنسیت
                  </label>
                </div>
              </div>
              <div className="DrProfileTableRow">
                <div className="DrProfileLeftTableCell">
                  <div className="DrProfileFormField">
                    {this.state.drInfo.phone !== null ? (
                      <input
                        type="tel"
                        className="DrProfileFormField__Input__Left"
                        id="phone"
                        name="phone"
                        pattern="[0][9]\d{9}$"
                        value={this.state.phone}
                        placeholder={this.state.drInfo.phone}
                        onChange={this.handleChange}
                        autocomplete="off"
                      />
                    ) : (
                      <input
                        type="tel"
                        className="DrProfileFormField__Input__Left"
                        id="phone"
                        name="phone"
                        pattern="[0][9]\d{9}$"
                        value={this.state.phone}
                        placeholder={this.state.nullString}
                        onChange={this.handleChange}
                        autocomplete="off"
                      />
                    )}
                  </div>
                </div>{" "}
                <div className="DrProfileRightTableCell">
                  {" "}
                  <label className="DrProfileFormField__Label" htmlFor="phone">
                    شماره ی موبایل
                  </label>
                </div>
              </div>
              <div className="DrProfileTableRow">
                <div className="DrProfileLeftTableCell">
                  {" "}
                  <div className="DrProfileFormField">
                    <select
                      name="insurance"
                      id="insurance"
                      className="DrProfileFormField__Input__Left"
                      value={this.state.insurance}
                      onChange={this.handleChange}
                    >
                      {this.state.drInfo.insurance !== null ? (
                        <option value="" selected disabled hidden>
                          {this.state.drInfo.insurance}
                        </option>
                      ) : (
                        <option value="" selected disabled hidden>
                          {this.state.nullString}
                        </option>
                      )}

                      <option value="تأمین اجتماعی"> تأمین اجتماعی</option>
                      <option value="خدمات درمانی">خدمات درمانی</option>
                      <option value="نیروهای مسلح">نیروهای مسلح</option>
                      <option value="سایر">سایر</option>
                    </select>
                  </div>
                </div>{" "}
                <div className="DrProfileRightTableCell">
                  {" "}
                  <label
                    htmlFor="insurance"
                    className="DrProfileFormField__Label"
                  >
                    بیمه درمانی
                  </label>
                </div>
              </div>
              <div className="DrProfileTableRow">
                <div className="DrProfileLeftTableCell">
                  {" "}
                  <div className="DrProfileFormField">
                    <input
                      type="text"
                      className="DrProfileFormField__Input__Left"
                      id="username"
                      name="username"
                      value={this.state.username}
                      placeholder={this.state.drInfo.username}
                      onChange={this.handleChange}
                      autocomplete="off"
                    />
                  </div>
                </div>{" "}
                <div className="DrProfileRightTableCell">
                  {" "}
                  <label
                    className="DrProfileFormField__Label"
                    htmlFor="username"
                  >
                    نام کاربری
                  </label>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
        <div className="DrProfileInfoTable__Tiltle">
          {" "}
          <div className="DrProfileTableRow__Tiltle">
            {" "}
            <div className="DrProfileLeftTableCell__Tiltle">
              {" "}
              <p></p>
            </div>
            <div className="DrProfileRightTableCell__Tiltle">
              <label
                className="DrProfileFormField__Tiltle"
                style={{ fontSize: 35 }}
                htmlFor="f_name"
              >
                تغییر رمز عبور
              </label>
            </div>
          </div>
        </div>
        <hr class="divider__EditProfile"></hr>
        <div className="DrProfileInfoTable">
          <div className="DrProfileTableRow_base">
            {" "}
            <div className="DrProfileLeftTableCell_base">
              {" "}
              <div className="DrProfileTableRow">
                <div className="DrProfileLeftTableCell">
                  {" "}
                  <div className="DrProfileFormField">
                    <input
                      type="password"
                      className="DrProfileFormField__Input__Right"
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      value={this.state.confirmNewPassword}
                      placeholder="رمز ورود جدید را تکرار کنید"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>{" "}
                <div className="DrProfileRightTableCell">
                  {" "}
                  <label
                    className="DrProfileFormField__Label"
                    htmlFor="confirmNewPassword"
                  >
                    تکرار رمز ورود جدید
                  </label>
                </div>
              </div>
              <div class="DrProfileTableRow">
                <div class="DrProfileLeftTableCell">
                  <div className="DrProfileFormField">
                    {" "}
                    <button
                      className="editProfileButton1"
                      id="7"
                      //  if edit profile button is clicked ProfileButtonOnClick is called

                      onClick={this.handleEdit}
                      variant="primary"
                    >
                      ثبت تغییرات
                    </button>
                  </div>
                </div>
                <div class="DrProfileRightTableCell"></div>
              </div>
            </div>
            <div className="DrProfileRightTableCell_base">
              {" "}
              <div className="DrProfileTableRow">
                <div className="DrProfileLeftTableCell">
                  {" "}
                  <div className="DrProfileFormField">
                    <input
                      type="password"
                      className="DrProfileFormField__Input__Right"
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
                  <label
                    className="DrProfileFormField__Label"
                    htmlFor="newPassword"
                  >
                    رمز ورود جدید
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
