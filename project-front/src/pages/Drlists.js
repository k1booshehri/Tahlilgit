import React, { Component } from "react";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import Filter from "./Filtering";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import avatar from "./avatarpic.png";

import { HashRouter as Router, Route, NavLink } from "react-router-dom";

export default class Drlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Drlist: [],
    };
    this.ProfileButtonOnClick = this.ProfileButtonOnClick.bind(this);
  }
  componentDidMount() {
    this.getItems();
  }
  // if a profile button from a card is clicked
  ProfileButtonOnClick(e) {
    //the username of that card is saved in sessionStorage
    sessionStorage.setItem("DrProfileUsername", e.target.name);
    /* the parent component's state , PatientDashboard.js , is updated with a new data.
     id = "2-1" which belongs to profile  button is passed to the parent and "eventKey" (at localStorage ) is updated
     so a new component (DrProfileView.js) is rendered.*/
    this.props.updateState(e);
  }
  getItems() {
    fetch("http://localhost:8000/filter/")
      .then((results) => results.json())
      .then((results) => this.setState({ Drlist: results }));
  }
  /* state = {
    search : ""
  }
  onchange = e =>{
    this.setState({ search : e.target.value });
}*/
  updatedr(items) {
    this.setState({ Drlist: items });
  }

  render() {
    return (
      /*  <input label="Search Country" icon="search" onChange={this.onchange}
      type="search"
      id="search"
      className="Drsearch"
      placeholder="search"
      name="search"
      value={this.state.search}
  
      />*/

      <div className="backgrounddrlist">
        <Filter
          data={{
            Drlist: this.state.Drlist,
            updatedr: this.updatedr.bind(this),
          }}
        />

        <div className="Drlist">
          {this.state.Drlist.map((postdetail, index) => {
            return (
              <div className="Drlistcard">
                {/* <img>hii</img> */}
                <div>
                  {postdetail.pp !== null ? (
                    <img src={postdetail.pp} className="Drlistimg" />
                  ) : (
                    <img src={avatar} className="Drlistimg" />
                  )}
                  <div className="Drlistlable">
                    {postdetail.f_name} {postdetail.l_name}{" "}
                  </div>
                </div>
                <div className="container">
                  <div> تخصص : {postdetail.field}</div>
                </div>
                <div className="container">
                  <Box className="rate" borderColor="transparent">
                    <Rating value={postdetail.rate} readOnly></Rating>
                  </Box>
                </div>

                <button
                  className="locationbutton"
                  id="2-1"
                  name={postdetail.username}
                  /* if profile button is clicked ProfileButtonOnClick is called */
                  onClick={this.ProfileButtonOnClick}
                  variant="primary"
                >
                  اطلاعات بیشتر
                </button>
                <button
                  className="locationbutton"
                  id="6"
                  /* if profile button is clicked ProfileButtonOnClick is called */
                  onClick={this.ProfileButtonOnClick}
                  name={postdetail.username}
                  variant="primary"
                >
                  وقت گیری آنلاین
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
