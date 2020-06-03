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

export default class PatientProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      f_name: null,
      l_name: null,
      gender: null,
      birth: null,
      phone: null,
      password: null,
      insurance: null,
      username: null,
      city: null,
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
    this.state.gender = information.gender;
    this.state.insurance = information.insurance;
    this.state.username = information.username;
    this.state.password = information.password;
    this.state.city = information.city;
    this.state.birth = information.birth;
    this.state.phone = information.phone;
    this.state.image = information.pp;
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
                {this.state.gender !== null ? (
                  <div>{this.state.gender}</div>
                ) : (
                  <div>{this.state.nullString}</div>
                )}
              </div>
              <div class="rightTableCell">جنسیت</div>
            </div>
            <div class="tableRow1">
              <div class="leftTableCell">
                {" "}
                {this.state.insurance !== null ? (
                  <div>{this.state.insurance}</div>
                ) : (
                  <div>{this.state.nullString}</div>
                )}
              </div>
              <div class="rightTableCell">بیمه درمانی</div>
            </div>

            <div class="tableRow1">
              <div class="leftTableCell">{this.state.email}</div>
              <div class="rightTableCell">آدرس ایمیل</div>
            </div>
          </div>
        </div>
        <button
          className="editProfileButton0"
          id="7-1"
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
