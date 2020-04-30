import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import Drlist from "./Drlists";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import MailIcon from "@material-ui/icons/Mail";
import PagesIcon from "@material-ui/icons/Pages";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import WorkIcon from "@material-ui/icons/Work";
import PersonIcon from "@material-ui/icons/Person";
import DrProfileView from "./DrProfileView";

class PatientDashboard extends Component {
  constructor() {
    super();
    this.state = { eventKeyChanged: false };
    this.navOnClick = this.navOnClick.bind(this);
    localStorage.setItem("eventKey", "");
  }
  dropdownClick() {
    document.getElementById("dropdownID").classList.toggle("show");
  }

  navOnClick(e) {
    let target = e.target.id;
    localStorage.setItem("eventKey", target);

    this.setState({ eventKeyChanged: true });
  }
  render() {
    return (
      <div className="dashboard">
        <div>
          {/* up navbar starts */}
          <nav className="nav  fixed-top up-navbar up-nav-style ">
            <a
              className="nav-link active  nav-txt "
              onClick={this.navOnClick}
              id="0"
            >
              <PersonIcon></PersonIcon>
              <span className="sr-only">(current)</span>
            </a>
            <a
              className="nav-link active  nav-txt "
              onClick={this.navOnClick}
              id="0"
            >
              میزکار<WorkIcon></WorkIcon>
              <span className="sr-only">(current)</span>
            </a>
            <a
              className="nav-link active nav-txt"
              onClick={this.navOnClick}
              id="2"
            >
              پزشکان<LocalHospitalIcon></LocalHospitalIcon>
            </a>
            <a
              className=" nav-link active nav-txt"
              onClick={this.navOnClick}
              id="0"
            >
              مقاله ها<PagesIcon></PagesIcon>
            </a>
          </nav>
          {/* up navbar ends */}
          {/* conditions starts */}
          {localStorage.getItem("eventKey") === "2" ? (
            <Drlist updateState={this.navOnClick} />
          ) : (
            <p> </p>
          )}
          {localStorage.getItem("eventKey") === "2-1" ? (
            <DrProfileView />
          ) : (
            <p> </p>
          )}
          {/* conditions ends */}
          {/* down navbar starts */}
          <nav className="nav  fixed-bottom down-navbar down-nav-style">
            <a
              className="nav-link active"
              type="click"
              onClick={this.navOnClick}
            >
              <span className="nav-txt" id="0">
                {" "}
                <MailIcon></MailIcon> ارتباط با ما
              </span>
            </a>
            <a className="nav-link active" id="0">
              <span className="nav-txt">
                {" "}
                <EmojiObjectsIcon></EmojiObjectsIcon> درباره ی ما
              </span>
            </a>
          </nav>
          {/* down navbar ends */}
        </div>
      </div>
    );
  }
}

export default PatientDashboard;
