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

export default class PaProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drInfo: "",
      f_name: "",
      l_name: "",
      insurance: null,
      gender: null,
      city: "",
      birth: "",

      username: "",

      image: null,

      isStateSet: false,
      nullString: "ثبت نشده است",
    };
    this.parsingInformation = this.parsingInformation.bind(this);
  }
  //function parsing the information from response
  parsingInformation(res) {
    let information = res;
    // initializing this states with responses
    this.state.drInfo = information.user;

    this.state.f_name = this.state.drInfo.f_name;
    this.state.l_name = this.state.drInfo.l_name;
    this.state.insurance = this.state.drInfo.insurance;
    this.state.gender = this.state.drInfo.gender;

    this.state.image = this.state.drInfo.pp;
  }

  componentDidMount() {
    this.getItems();
  }
  // get request for doctor info
  getItems() {
    let url =
      "http://myravanyar.ir/api/user2/username=" +
      sessionStorage.getItem("PaUsername");
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.parsingInformation(res);
        this.setState({ isClicked: true });
      })
      .catch((error) => console.error("Error:", error));
  }

  render() {
    if (this.state.isStateSet === true) {
      // redirect to dashboard if signed up
      localStorage.setItem("eventKey", "2");
      return <Redirect to={{ pathname: "/PatientDashboard" }} />;
    }
    if (!this.state.isStateSet) {
      return (
        <div className="DrProfileView">
          <div>
            {/* showing doctor info  */}
            <div className="nameInfoTable">
              <div class="nameTableRow">
                <div class="nameleftTableCell">
                  <div className="nameDisplay">
                    {this.state.f_name + " " + this.state.l_name}
                    <div style={{ fontSize: 30 }}>{this.state.username}</div>
                  </div>
                </div>
                <div class="namerightTableCell">
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
            <hr class="divider__EditProfile"></hr>
            <div className="DrProfileInfoTable">
              <div class="DrProfileTableRow">
                <div class="DrProfileLeftTableCell">
                  <div className="DrProfileFormField">
                    {" "}
                    {this.state.gender !== null ? (
                      <input
                        className="DrProfileFormField__Input__Right"
                        readOnly
                        placeholder={this.state.gender}
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
                  <label className="DrProfileFormField__Label">جنسیت</label>
                </div>
              </div>
              <div class="DrProfileTableRow">
                <div class="DrProfileLeftTableCell">
                  <div className="DrProfileFormField">
                    {" "}
                    {this.state.insurance !== null ? (
                      <input
                        className="DrProfileFormField__Input__Right"
                        readOnly
                        placeholder={this.state.insurance}
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
                    بیمه درمانی
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
