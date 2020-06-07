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
import Avatar from "@material-ui/core/Avatar";
import avatar from "./avatarpic.png";
import StarRatingComponent from "react-star-rating-component";
import Rating from "@material-ui/lab/Rating";

export default class DoctorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drInfo: [],
      email: null,
      f_name: null,
      l_name: null,
      edu: null,
      gender: null,
      field: null,
      birth: null,
      phone: null,
      password: null,
      activetime: null,
      username: null,
      code: null,
      startYear: null,
      image: null,
      isStateSet: false,
      nullString: "ثبت نشده است",
    };
    this.EditProfileButtonOnClick = this.EditProfileButtonOnClick.bind(this);
  }
  EditProfileButtonOnClick(e) {
    this.props.updateState(e);
  }
  parsingInformation(res) {
    let information = res;
    // initializing this states with responses
    this.state.f_name = information.f_name;
    this.state.l_name = information.l_name;
    this.state.email = information.email;
    this.state.field = information.field;
    this.state.gender = information.gender;
    this.state.activetime = information.activetime;
    this.state.username = information.username;
    this.state.password = information.password;
    this.state.code = information.code;
    this.state.birth = information.birth;
    this.state.phone = information.phone;
    this.state.image = information.pp;
    if (information.edu !== null) {
      if (information.edu === "phd") {
        this.state.edu = "دکتری";
      }
      if (information.edu === "masters") {
        this.state.edu = "کارشناسی ارشد";
      }
    }
    if (this.state.activetime !== null) {
      let split = this.state.activetime.split("-"); //spliting activetime date for getting the year
      this.state.startYear = split[0];
    }
  }
  componentDidMount() {
    this.getItems();
  }
  getItems() {
    fetch("http://myravanyar.ir/api/auth/doctor-user", {
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
  render() {
    return (
      <div className="DrProfileView">
        <div>
          {/* showing doctor info  */}
          <div className="nameInfoTable">
            <div class="nameTableRow ">
              <div class="nameleftTableCell ">
                <div className="nameDisplay">
                  {this.state.f_name + " " + this.state.l_name}
                  <div style={{ fontSize: 25, fontFamily: "Katibeh" }}>
                    {this.state.username}
                  </div>
                </div>
              </div>
              <div class="namerightTableCell ">
                {this.state.image !== null ? (
                  <img
                    alt="none"
                    src={this.state.image}
                    className="ProfileViewAvatar"
                  />
                ) : (
                  <img src={avatar} className="ProfileViewAvatar" />
                )}
              </div>
            </div>
          </div>
          <hr class="divider__EditProfile"></hr>{" "}
          <div className="DrProfileInfoTable ">
            <div className="DrProfileTableRow_base">
              <div className="DrProfileLeftTableCell_base">
                {" "}
                <div class="DrProfileTableRow">
                  <div class="DrProfileLeftTableCell">
                    <div className="DrProfileFormField">
                      {" "}
                      {this.state.code !== null ? (
                        <input
                          className="DrProfileFormField__Input__Right"
                          readOnly
                          placeholder={this.state.code}
                        />
                      ) : (
                        <input
                          className="DrProfileFormField__Input__Right"
                          readOnly
                          placeholder={this.state.nullString}
                        />
                      )}
                    </div>
                  </div>
                  <div class="DrProfileRightTableCell">
                    <label className="DrProfileFormField__Label">
                      کد نظام پزشکی
                    </label>
                  </div>
                </div>
                <div class="DrProfileTableRow">
                  <div class="DrProfileLeftTableCell">
                    <div className="DrProfileFormField">
                      <input
                        className="DrProfileFormField__Input__Right"
                        readOnly
                        style={{ fontFamily: "Katibeh" }}
                        placeholder={this.state.email}
                      />
                    </div>
                  </div>
                  <div class="DrProfileRightTableCell">
                    <label className="DrProfileFormField__Label">
                      آدرس ایمیل
                    </label>
                  </div>
                </div>
                <div class="DrProfileTableRow">
                  <div class="DrProfileLeftTableCell">
                    <div className="DrProfileFormField">
                      {" "}
                      <button
                        className="editProfileButton1"
                        id="3-1"
                        /* if edit profile button is clicked ProfileButtonOnClick is called */
                        onClick={this.EditProfileButtonOnClick}
                        variant="primary"
                      >
                        ویرایش
                      </button>
                    </div>
                  </div>
                  <div class="DrProfileRightTableCell"></div>
                </div>
              </div>
              <div className="DrProfileRightTableCell_base">
                {" "}
                <div class="DrProfileTableRow">
                  <div class="DrProfileLeftTableCell">
                    <div className="DrProfileFormField">
                      {" "}
                      {this.state.field !== null ? (
                        <input
                          className="DrProfileFormField__Input__Right"
                          readOnly
                          placeholder={this.state.field}
                        />
                      ) : (
                        <input
                          className="DrProfileFormField__Input__Right"
                          readOnly
                          placeholder={this.state.nullString}
                        />
                      )}
                    </div>
                  </div>
                  <div class="DrProfileRightTableCell">
                    <label className="DrProfileFormField__Label">تخصص</label>
                  </div>
                </div>
                <div class="DrProfileTableRow">
                  <div class="DrProfileLeftTableCell">
                    <div className="DrProfileFormField">
                      {" "}
                      {this.state.edu !== null ? (
                        <input
                          className="DrProfileFormField__Input__Right"
                          readOnly
                          placeholder={this.state.edu}
                        />
                      ) : (
                        <input
                          className="DrProfileFormField__Input__Right"
                          readOnly
                          placeholder={this.state.nullString}
                        />
                      )}
                    </div>
                  </div>
                  <div class="DrProfileRightTableCell">
                    <label className="DrProfileFormField__Label">تحصیلات</label>
                  </div>
                </div>
                <div class="DrProfileTableRow">
                  <div class="DrProfileLeftTableCell">
                    <div className="DrProfileFormField">
                      {" "}
                      {this.state.startYear !== null ? (
                        <input
                          className="DrProfileFormField__Input__Right"
                          readOnly
                          placeholder={this.state.startYear}
                        />
                      ) : (
                        <input
                          className="DrProfileFormField__Input__Right"
                          readOnly
                          placeholder={this.state.nullString}
                        />
                      )}
                    </div>
                  </div>
                  <div class="DrProfileRightTableCell">
                    <label className="DrProfileFormField__Label">
                      شروع فعالیت
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
