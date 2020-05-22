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
import ChatBubble from "@material-ui/icons/ChatBubble";
import DrProfileView from "./DrProfileView";
import Chat from "./Chat";
import Notif from "@material-ui/icons/Notifications";
import Notifications from "./Notif";
import Popup from "reactjs-popup";

import ClinicRes from "./ClinicRes";

class PatientDashboard extends Component {
  constructor() {
    super();
    this.state = { eventKeyChanged: false, modalOpen: false, update: 0 };
    this.navOnClick = this.navOnClick.bind(this);
    this.ChatComponentOnCLick = this.ChatComponentOnCLick.bind(this);
    localStorage.setItem("eventKey", "");
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
  ChatComponentOnCLick(e) {
    let target = e.target.id;
    localStorage.setItem("eventKey", target);
    localStorage.setItem("DrOnChatUsername", "null");
    this.setState({ eventKeyChanged: true });
  }

  handleModalOpen = () => {
    this.setState((prevState) => {
      return {
        modalOpen: !prevState.modalOpen,
      };
    });
  };

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
              میزکار <WorkIcon></WorkIcon>
              <span className="sr-only">(current)</span>
            </a>
            <a
              className="nav-link active nav-txt"
              onClick={this.navOnClick}
              id="2"
            >
              پزشکان <LocalHospitalIcon></LocalHospitalIcon>
            </a>
            <a
              className=" nav-link active nav-txt"
              onClick={this.navOnClick}
              id="0"
            >
              مقاله ها <PagesIcon></PagesIcon>
            </a>
            <a
              className=" nav-link active nav-txt"
              onClick={this.ChatComponentOnCLick}
              id="5"
            >
              گفتگو ها <ChatBubble></ChatBubble>
            </a>
            {/*************************************************/}
            <div>
              <button
                className="notifbutton "
                type="button"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                <span class="notifbadge">{this.state.update}</span>
                <Notif></Notif>
              </button>
            </div>
          </nav>
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
            <Chat updateState={this.ChatComponentOnCLick} />
          ) : (
            <p> </p>
          )}

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
          {localStorage.getItem("eventKey") === "2-2" ? (
            <Chat onClick={this.navOnClick} />
          ) : (
            <p> </p>
          )}
          {localStorage.getItem("eventKey") === "6" ? <ClinicRes /> : <p> </p>}
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
