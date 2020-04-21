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

export default class DrProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drInfo: "",
      clinicInfo: [],
      isClicked: false,
    };
    this.parsingInformation = this.parsingInformation.bind(this);
  }
  //parsing the information from response
  parsingInformation(res) {
    let information = res;
    this.state.drInfo = information.user;
    this.state.clinicInfo = information.offices;
  }
  componentDidMount() {
    this.getItems();
  }
  // get request for doctor info
  getItems() {
    let url =
      "http://localhost:8000/user/username=" +
      sessionStorage.getItem("DrProfileUsername");
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
    // if (this.state.isClicked) {
    return (
      <div className="dashboard">
        <div className="clinicForm">
          {/* showing doctor info  */} <p> </p>
        </div>
      </div>
    );
  }
}
