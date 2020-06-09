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
import PatientProfile from "./PatientProfile";
import EditPaProfile from "./EditPaProfile";
import PaProfileView from "./PaProfileView";

class PatientDashboard extends Component {
  constructor() {
    super();
    this.state = { eventKeyChanged: false, modalOpen: false, update: 0 };
    this.navOnClick = this.navOnClick.bind(this);
    this.ChatComponentOnCLick = this.ChatComponentOnCLick.bind(this);
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
      .then((res) => {
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
      
      
      
      
          <div className="nav  fixed-top  up-nav-style ">
      
           
            <a
              className="nav-link active  nav-txt "
              onClick={this.navOnClick}
              id="7"
            >
              <PersonIcon></PersonIcon>
              <span className="sr-only">(current)</span>
            </a>
            <a
                className="nav-link active  nav-txt "
                type="button"
                data-toggle="modal"
                data-target="#exampleModal"
                
              >
              {(this.state.update !== 0 ?(
                <span class="notifbadge">{this.state.update}</span>) :(<div></div>))}
                <Notif ></Notif>
              </a>
            
            <div className="bell-exit-upnav" >
          
            <a className="nav-link active " onClick={this.logout}>
              خروج
            </a>
            </div>
            </div>






            <div class="sidenav">
        
            <div className="logo-sidnav ">روان یار</div>
            <div className="sidnav-components">
            { /************************************************/}  
            <div className="text-icon-sidenav">
              <WorkIcon className="icon"></WorkIcon>
            <a
              className="sidnav-txt "
              onClick={this.navOnClick}
              id="0"
            >
              میزکار 
              <span className="sr-only">(current)</span>
            </a>
            </div>
            { /************************************************/}  
            <div className="text-icon-sidenav">
            <LocalHospitalIcon className="icon"></LocalHospitalIcon>
            <a
              className="sidnav-txt "
              onClick={this.navOnClick}
              id="2"
            >
              پزشکان 
            </a>
            </div>
            { /************************************************/}  
            <div className="text-icon-sidenav">
            <PagesIcon  className="icon"></PagesIcon>
            <a
              className="sidnav-txt "
              onClick={this.navOnClick}
              id="0"
            >
              مقاله ها 
            </a>
            </div>
            { /************************************************/}  
            <div className="text-icon-sidenav">
            <ChatBubble  className="icon"></ChatBubble>
            <a
              className=" sidnav-txt "
              onClick={this.ChatComponentOnCLick}
              id="5"
              
            >
              گفتگو ها 
            </a>
            </div>
            </div>
            {/*************************************************/}
            <div className= "down-sidenav">
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
              <span className="nav-txt">
                {" "}
                 درباره ی ما
              </span>
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
          {localStorage.getItem("eventKey") === "7" ? (
            <PatientProfile updateState={this.navOnClick} />
          ) : (
            <p> </p>
          )}
          {localStorage.getItem("eventKey") === "7-1" ? (
            <EditPaProfile updateState={this.navOnClick} />
          ) : (
            <p> </p>
          )}
           {localStorage.getItem("eventKey") === "0" ? (
           <div className="nomassage">...به زودی</div>
          ) : (
          <p></p>
          )}

          {localStorage.getItem("eventKey") === "6" ? <ClinicRes /> : <p> </p>}
          {/* conditions ends */}
          {/* down navbar starts */}
         
          {/* down navbar ends */}
        </div>
      </div>
    );
  }
}

export default PatientDashboard;
