import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";

class PatientDashboard extends Component {
  constructor() {
    super();
    this.state = {
      name: " hi",
    };
  }
  dropdownClick() {
    document.getElementById("dropdownID").classList.toggle("show");
  }
  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-display">
          <div class="container  ">
            <nav class="navbar navbar-expand-lg navbar-light fixed-top up-navbar ">
              <div
                class="collapse navbar-collapse  up-nav-style "
                id="navbarNavAltMarkup"
              >
                <div class="navbar-nav  ">
                  <a class="nav-item nav-link active" href="#">
                    مقاله ها&#128221;
                  </a>
                  <a class="nav-item nav-link active" href="#">
                    پزشکان🔍
                  </a>
                  <a class="nav-item nav-link active   " href="#">
                    میزکار&#128202;<span class="sr-only">(current)</span>
                  </a>
                  <li class="nav-item dropdown ">
                    <a
                      class="nav-link dropdown-toggle active"
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
                      class="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <a class="dropdown-item" href="#">
                        تنظیمات
                      </a>
                      <a class="dropdown-item" href="#">
                        خروج
                      </a>
                    </div>
                  </li>
                </div>
              </div>
            </nav>
            <nav class="navbar navbar-expand-lg navbar-light fixed-bottom up-navbar ">
              <div
                class="collapse navbar-collapse down-nav-style "
                id="navbarNavAltMarkup"
              >
                <div class="navbar-nav  ">
                  <a class="nav-item nav-link active" href="#">
                    📧 ارتباط با ما
                  </a>
                  <a class="nav-item nav-link active" href="#">
                    💡 درباره ی ما
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default PatientDashboard;
