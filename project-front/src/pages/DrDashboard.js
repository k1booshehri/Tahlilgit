import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PagesIcon from "@material-ui/icons/Pages";
import BusinessIcon from "@material-ui/icons/Business";
import WorkIcon from "@material-ui/icons/Work";
import PersonIcon from "@material-ui/icons/Person";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import MailIcon from "@material-ui/icons/Mail";
import DrChat from "./DrChat";
import ChatBubble from "@material-ui/icons/ChatBubble";
import Notif from "@material-ui/icons/Notifications";
import Notifications from "./Notif";
import axios from "axios";

import {
  HashRouter as Router,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import OfficeList from "./OfficeList";
import ClinicForm from "./ClinicForm";
import DoctorProfile from "./DoctorProfile";
import EditDrProfile from "./EditDrProfile";
import PaProfileView from "./PaProfileView";

class DrDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { eventKeyChanged: false, update: 0 };
    this.navOnClick = this.navOnClick.bind(this);
    this.DrChatComponentOnCLick = this.DrChatComponentOnCLick.bind(this);
    this.logout = this.logout.bind(this);
    //localStorage.setItem("eventKey", "");
  }
  dropdownClick() {
    document.getElementById("dropdownID").classList.toggle("show");
  }
  updatenotif(items) {
    this.setState({ update: items });
  }

  navOnClick(e) {
    let target = e.target.id;
    localStorage.setItem("eventKey", target);

    this.setState({ eventKeyChanged: true });
  }
  DrChatComponentOnCLick(e) {
    let target = e.target.id;
    localStorage.setItem("eventKey", target);
    this.setState({ eventKeyChanged: true });
    localStorage.setItem("PatientOnChatUsername", "null");
  }
  logout() {
    axios
      .post(
        "http://myravanyar.ir/api/auth/logout",
        {},
        {
          headers: {
            "content-type": "application/json",
            Authorization: "token " + sessionStorage.getItem("token"),
          },
        }
      )
      .then((e) => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";
      })
      .catch(function (error) {
        if (error.response) {
          console.log("hi");
        }
      });
  }

  render() {
    return (
      <div className="dashboard">
        <div>
          {/* up navbar starts */}
          <div className="nav  fixed-top up-navbar up-nav-style ">
            <a
              className="nav-link active  nav-txt "
              onClick={this.navOnClick}
              id="3"
            >
              <PersonIcon></PersonIcon>
              <span className="sr-only">(current)</span>
            </a>
            <a
              className="nav-link active  nav-txt"
              type="button"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              {this.state.update !== 0 ? (
                <span class="notifbadge">{this.state.update}</span>
              ) : (
                <div></div>
              )}
              <Notif></Notif>
            </a>

            {/*************************************************/}
            <div className="bell-exit-upnav">
              <a className="nav-link active " onClick={this.logout}>
                خروج
              </a>
            </div>
          </div>

          <div class="sidenav">
            <div className="logo-sidnav ">روان یار</div>
            <div className="sidnav-components">
              {/************************************************/}
              <div className="text-icon-sidenav">
                <WorkIcon className="icon"></WorkIcon>
                <a className="sidnav-txt " onClick={this.navOnClick} id="0">
                  میزکار
                  <span className="sr-only">(current)</span>
                </a>
              </div>
              {/************************************************/}
              <div className="text-icon-sidenav">
                <BusinessIcon className="icon"></BusinessIcon>

                <a className="sidnav-txt" onClick={this.navOnClick} id="1">
                  مطب ها
                </a>
              </div>
              {/************************************************/}
              <div className="text-icon-sidenav">
                <PagesIcon className="icon"></PagesIcon>
                <a className=" sidnav-txt" onClick={this.navOnClick} id="0">
                  مقاله ها
                </a>
              </div>
              {/************************************************/}
              <div className="text-icon-sidenav">
                <ChatBubble className="icon"></ChatBubble>
                <a
                  className="sidnav-txt"
                  onClick={this.DrChatComponentOnCLick}
                  id="5"
                >
                  گفتگو ها
                </a>
              </div>
            </div>
            {/*************************************************/}
            <div className="down-sidenav">
              <div className="sidnav-components">
                <div className="text-icon-sidenav">
                  <MailIcon className="icon"></MailIcon>
                  <a
                    className="sidnav-txt"
                    type="click"
                    onClick={this.navOnClick}
                  >
                    <span className="nav-txt" id="0">
                      {" "}
                      ارتباط با ما
                    </span>
                  </a>
                </div>
                <div className="text-icon-sidenav">
                  <EmojiObjectsIcon className="icon"></EmojiObjectsIcon>
                  <a className="sidnav-txt" id="0">
                    <span className="nav-txt"> درباره ی ما</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modalheader">
                  <button
                    type="button"
                    class="close modalheader"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <Notifications
                    data={{
                      update: this.state.update,
                      updatenotif: this.updatenotif.bind(this),
                    }}
                    updateState={this.navOnClick}
                  ></Notifications>
                </div>
              </div>
            </div>
          </div>

          {/*************************************************/}
          {/* up navbar ends */}
          {/* conditions starts */}
          {localStorage.getItem("eventKey") === "5" ? (
            <DrChat updateState={this.DrChatComponentOnCLick} />
          ) : (
            <p> </p>
          )}

          {localStorage.getItem("eventKey") === "1" ? (
            <OfficeList updateState={this.navOnClick} />
          ) : (
            <p> </p>
          )}
          {localStorage.getItem("eventKey") === "1-1" ? (
            <ClinicForm updateState={this.navOnClick} />
          ) : (
            <p> </p>
          )}
          {localStorage.getItem("eventKey") === "3" ? (
            <DoctorProfile updateState={this.navOnClick} />
          ) : (
            <p> </p>
          )}
          {localStorage.getItem("eventKey") === "3-1" ? (
            <EditDrProfile updateState={this.navOnClick} />
          ) : (
            <p> </p>
          )}
          {localStorage.getItem("eventKey") === "7-2" ? (
            <PaProfileView />
          ) : (
            <p> </p>
          )}
          {/* conditions ends */}
        </div>
      </div>
    );
  }
}

export default DrDashboard;
