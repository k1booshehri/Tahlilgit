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
                <div class="namerightTableCell">
                  <div className="nameDisplay">
                    {this.state.f_name + " " + this.state.l_name}
                  </div>
                </div>
              </div>
            </div>

            <div className="infoTable1">
              <div class="tableRow1">
                <div class="leftTableCell">
                  {" "}
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
            </div>
          </div>
        </div>
      );
    }
  }
}
