import React, { Component } from "react";
import { Link } from "react-router-dom";

import { HashRouter as Router, Route, NavLink } from "react-router-dom";

export default class Notif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Notifs: [],
    };
    this.notifonclick = this.notifonclick.bind(this);
    this.redirectnotif = this.redirectnotif.bind(this);
  }
  notifonclick() {
    this.state.Notifs = [];
    this.props.data.updatenotif(0);
  }
  redirectnotif(e) {
    this.props.updateState(e);
    localStorage.setItem("DrOnChatUsername", "null");
    localStorage.setItem("PatientOnChatUsername", "null");
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.getItems();
    }, 1000);

    localStorage.setItem("notificatians", null);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getItems() {
    fetch("http://myravanyar.ir/api/notifget", {
      method: "GET",
      headers: {
        Authorization: "token " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.parsingInformation(res);
      })

      .catch((error) => console.error("Error:", error));
  }

  parsingInformation(res) {
    var information = res;
    console.log(information.notifs);

    if (Object.entries(information.notifs).length !== 0) {
      this.state.Notifs.push(information.notifs);
      console.log(this.state.Notifs);
      this.props.data.updatenotif(Object.entries(information.notifs).length);
      console.log(Object.entries(information.notifs).length);
    }
  }

  render() {
    return (
      <div className="notifs">
        {Object.keys(this.state.Notifs).map((key) => {
          return this.state.Notifs[key].map((val, index) => {
            return (
              <div>
                {val.notiftype === "1" ? (
                  <div className="notif1" onClick={this.redirectnotif} id="1">
                    {val.notifmessage}
                  </div>
                ) : val.notiftype === "2" ? (
                  <div className="notif2" onClick={this.redirectnotif} id="1">
                    {val.notifmessage}
                  </div>
                ) : val.notiftype === "3" ? (
                  <div className="notif3" onClick={this.redirectnotif} id="5">
                    {val.notifmessage}
                  </div>
                ) : (
                  <div className="notif4" onClick={this.redirectnotif} id="1">
                    {val.notifmessage}
                  </div>
                )}
              </div>
            );
          });
        })}
        <button
          type="button"
          class="btn btn-secondary clearbutton"
          onClick={this.notifonclick}
        >
          Clear
        </button>
      </div>
    );
  }
}
