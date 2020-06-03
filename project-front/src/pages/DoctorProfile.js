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
                {this.state.image !== null ? (
                  <img
                    className="tc br3"
                    alt="none"
                    src={this.state.image}
                    className="ProfileViewAvatar"
                  />
                ) : (
                  <img src={avatar} className="avatar" />
                )}
              </div>
              <div class="namerightTableCell ">
                <div className="nameDisplay">
                  {this.state.f_name + " " + this.state.l_name}
                </div>
                <div style={{ fontSize: 30 }}>{this.state.username}</div>
              </div>
            </div>
          </div>

          <div className="infoTable1 borderProfile ">
            <div class="tableRow1">
              <div class="leftTableCell">
                {this.state.field !== null ? (
                  <div>{this.state.field}</div>
                ) : (
                  <div>{this.state.nullString}</div>
                )}
              </div>
              <div class="rightTableCell">تخصص</div>
            </div>
            <div class="tableRow1">
              <div class="leftTableCell">
                {" "}
                {this.state.edu !== null ? (
                  <div>{this.state.edu}</div>
                ) : (
                  <div>{this.state.nullString}</div>
                )}
              </div>
              <div class="rightTableCell">تحصیلات</div>
            </div>
            <div class="tableRow1">
              <div class="leftTableCell">
                {" "}
                {this.state.startYear !== null ? (
                  <div>{this.state.startYear}</div>
                ) : (
                  <div>{this.state.nullString}</div>
                )}
              </div>
              <div class="rightTableCell">شروع فعالیت</div>
            </div>
            <div class="tableRow1">
              <div class="leftTableCell">
                {" "}
                {this.state.code !== null ? (
                  <div>{this.state.code}</div>
                ) : (
                  <div>{this.state.nullString}</div>
                )}
              </div>
              <div class="rightTableCell">کد نظام پزشکی</div>
            </div>
            <div class="tableRow1">
              <div class="leftTableCell">{this.state.email}</div>
              <div class="rightTableCell">آدرس ایمیل</div>
            </div>
          </div>
        </div>
        <button
          className="editProfileButton0"
          id="3-1"
          /* if edit profile button is clicked ProfileButtonOnClick is called */
          onClick={this.EditProfileButtonOnClick}
          variant="primary"
        >
          ویرایش
        </button>
      </div>
    );
  }
}
