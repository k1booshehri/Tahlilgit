import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import Drlist from "./Drlists";
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import MailIcon from '@material-ui/icons/Mail';
import PagesIcon from '@material-ui/icons/Pages';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import WorkIcon from '@material-ui/icons/Work';
import PersonIcon from '@material-ui/icons/Person';

class PatientDashboard extends Component {
  constructor() {
    super();
    this.state = { eventKey: "", eventKeyChanged: false };
    this.navOnClick = this.navOnClick.bind(this);
  }
  dropdownClick() {
    document.getElementById("dropdownID").classList.toggle("show");
  }

  navOnClick(e) {
    let target = e.target.id;
    this.state.eventKey = target;

    this.setState({ eventKeyChanged: true });
  }
  render() {
    return (
      <div >
        <div className="dashboard">
         
            {/* up navbar starts */}
            <nav className="nav  fixed-top up-navbar up-nav-style ">
              <li className="nav-item dropdown ">
                <a
                  className="nav-link dropdown-toggle active"
                  onClick={this.dropdownClick}
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <PersonIcon></PersonIcon>
                </a>
                <div
                  id="dropdownID"
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a className="dropdown-item" onClick={this.navOnClick} id="0">
                    تنظیمات
                  </a>
                  <a className="dropdown-item" onClick={this.navOnClick} id="0">
                    خروج
                  </a>
                </div>
              </li>
              <a
                className="nav-link active  nav-txt "
                onClick={this.navOnClick}
                id="0"
              >
                میزکار<WorkIcon></WorkIcon><span className="sr-only">(current)</span>
              </a>
              <a
                className="nav-link active nav-txt"
                onClick={this.navOnClick}
                id="1"
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
            {this.state.eventKey === "1" ? < Drlist /> : <p>  </p>}
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
                <span className="nav-txt"> <EmojiObjectsIcon></EmojiObjectsIcon> درباره ی ما</span>
              </a>
            </nav>
            {/* down navbar ends */}
          </div>
        </div>
      
    );
  }
}

export default PatientDashboard;
