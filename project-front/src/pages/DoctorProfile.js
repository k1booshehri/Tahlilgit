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
      image : "",
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
    this.state.gender = information.gender;
    this.state.activetime = information.activetime;
    this.state.username = information.username;
    this.state.password = information.password;
    this.state.code = information.code;
    this.state.birth = information.birth;
    this.state.phone = information.phone;
    this.state.image = information.pp;
    if (information.edu === "phd") {
      this.state.edu = "دکتری";
    }
    if (information.edu === "masters") {
      this.state.edu = "کارشناسی ارشد";
    }
    let split = this.state.activetime.split("-"); //spliting activetime date for getting the year
    this.state.startYear = split[0];
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

          {this.state.image !== null ? (
           
           <img src={ this.state.image } className="avatar"/>
           
         ) : (
           <img src= {avatar} className="avatar"/>
         )} 
          <div className="nameDisplay"></div>

          <div className="nameInfoTable">
            <div className="nameTableRow">
              <div className="nameCompleteTableCell">
                {this.state.f_name + " " + this.state.l_name}
              </div>
            </div>
          </div>

          <div className="infoTable1">
            <div className="tableRow1">
              <div className="leftTableCell">{this.state.field}</div>
              <div className="rightTableCell">تخصص</div>
            </div>
            <div className="tableRow1">
              <div className="leftTableCell">{this.state.edu}</div>
              <div className="rightTableCell">تحصیلات</div>
            </div>
            <div className="tableRow1">
              <div className="leftTableCell">{this.state.startYear}</div>
              <div className="rightTableCell">شروع فعالیت</div>
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
