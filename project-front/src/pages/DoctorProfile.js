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

export default class DoctorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drInfo: [],
      email: "",
      f_name: "",
      l_name: "",
      edu: "",
      gender: "",
      field: "",
      birth: "",
      phone: "",
      password: "",
      activetime: "",
      username: "",
      code: "",
      startYear: "",
      isStateSet: false,
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
    this.state.edu = information.edu;
    this.state.gender = information.gender;
    this.state.activetime = information.activetime;
    this.state.username = information.username;
    this.state.password = information.password;
    this.state.code = information.code;
    this.state.birth = information.birth;
    this.state.phone = information.phone;

    let split = this.state.activetime.split("-"); //spliting activetime date for getting the year
    this.state.startYear = split[0];
    console.log(this.state.startYear);
  }
  componentDidMount() {
    this.getItems();
  }
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
  render() {
    return (
      <div className="DrProfileView">
        <div className="infoWrap">
          {/* showing doctor info  */}

          <img src={avatar} className="avatar" />
          <div className="nameDisplay"></div>

          <div className="nameInfoTable">
            <div class="nameTableRow">
              <div class="nameCompleteTableCell">
                {this.state.f_name + " " + this.state.l_name}
              </div>
            </div>
          </div>

          <div className="infoTable1">
            <div class="tableRow1">
              <div class="leftTableCell">{this.state.field}</div>
              <div class="rightTableCell">تخصص</div>
            </div>
            <div class="tableRow1">
              <div class="leftTableCell">{this.state.edu}</div>
              <div class="rightTableCell">تحصیلات</div>
            </div>
            <div class="tableRow1">
              <div class="leftTableCell">{this.state.startYear}</div>
              <div class="rightTableCell">شروع فعالیت</div>
            </div>
          </div>

          <button
            className="editProfileButton"
            id="3-1"
            /* if edit profile button is clicked ProfileButtonOnClick is called */
            onClick={this.EditProfileButtonOnClick}
            variant="primary"
          >
            ویرایش
          </button>
        </div>
      </div>
    );
  }
}
