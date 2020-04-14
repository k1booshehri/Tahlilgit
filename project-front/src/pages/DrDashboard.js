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
import OfficeList from "./OfficeList";

class DrDashboard extends Component {
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
      <div className="dashboard">
        
          <div >
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
                  👤
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
                میزکار&#128202;<span className="sr-only">(current)</span>
              </a>
              <a
                className="nav-link active nav-txt"
                onClick={this.navOnClick}
                id="1"
              >
                مطب ها&#128193;
              </a>
              <a
                className=" nav-link active nav-txt"
                onClick={this.navOnClick}
                id="0"
              >
                مقاله ها&#128221;
              </a>
            </nav>
            {/* up navbar ends */}
            {/* conditions starts */}
            {this.state.eventKey === "1" ? <OfficeList /> : <p> </p>}
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
                  📧 ارتباط با ما
                </span>
              </a>
              <a className="nav-link active" id="0">
                <span className="nav-txt"> 💡 درباره ی ما</span>
              </a>
            </nav>
            {/* down navbar ends */}
          </div>
        </div>
     
    );
  }
}

export default DrDashboard;
