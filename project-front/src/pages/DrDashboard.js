import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PagesIcon from "@material-ui/icons/Pages";
import BusinessIcon from "@material-ui/icons/Business";
import WorkIcon from "@material-ui/icons/Work";
import PersonIcon from "@material-ui/icons/Person";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import MailIcon from "@material-ui/icons/Mail";

import {
  HashRouter as Router,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import OfficeList from "./OfficeList";
import ClinicForm from "./ClinicForm";

class DrDashboard extends Component {
  constructor(props) {
    super(props);
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
              id="3"
            >
              <PersonIcon></PersonIcon>
              <span className="sr-only">(current)</span>
            </a>
            <a
              className="nav-link active  nav-txt "
              onClick={this.navOnClick}
              id="0"
            >
              میزکار
              <WorkIcon></WorkIcon>
              <span className="sr-only">(current)</span>
            </a>
            <a
              className="nav-link active nav-txt"
              onClick={this.navOnClick}
              id="1"
            >
              مطب ها
              <BusinessIcon></BusinessIcon>
            </a>
            <a
              className=" nav-link active nav-txt"
              onClick={this.navOnClick}
              id="0"
            >
              مقاله ها
              <PagesIcon></PagesIcon>
            </a>
          </nav>
          {/* up navbar ends */}
          {/* conditions starts */}
          {localStorage.getItem("eventKey") === "1" ? (
            <OfficeList updateState={this.navOnClick} />
          ) : (
            <p> </p>
          )}
          {localStorage.getItem("eventKey") === "1-1" ? (
            <ClinicForm />
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
                ارتباط با ما
                <MailIcon></MailIcon>
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

export default DrDashboard;
