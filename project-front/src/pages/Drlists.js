import React, { Component } from "react";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import Filter from "./Filtering";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import avatar from "./avatarpic.png";
import ChatBubble from "@material-ui/icons/ChatBubble";
import Calender from "@material-ui/icons/CalendarToday";

import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import { IconButton } from "@material-ui/core";

export default class Drlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Drlist: [],
      nullString: "ثبت نشده است",
    };
    this.ProfileButtonOnClick = this.ProfileButtonOnClick.bind(this);
    this.ChatButtonOnClick = this.ChatButtonOnClick.bind(this);
  }
  componentDidMount() {
    this.getItems();
  }

  //if chat button is clicked

  ChatButtonOnClick(e) {
    localStorage.setItem("DrOnChatUsername", e.target.name);
    console.log(localStorage.getItem("DrOnChatUsername"));

    this.props.updateState(e);
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
    fetch("http://myravanyar.ir/api/filter/")
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

      <div >
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
                <div className="containerlist">
                  {postdetail.field !== null ? (
                    <div> تخصص : {postdetail.field}</div>
                  ) : (
                    <div> تخصص : {this.state.nullString}</div>
                  )}
                </div>
                <div className="containerlist">
                  <Box className="rate" borderColor="transparent">
                    <Rating value={postdetail.rate} readOnly></Rating>
                  </Box>
                </div>
                 <div className="drlistcard__buttons">
              
            <div  className="drlistcard__button">
              <a  
                  id="2-1"
                  name={postdetail.username}
                  /* if profile button is clicked ProfileButtonOnClick is called */
                  onClick={this.ProfileButtonOnClick}
                  variant="primary" class="fa fa-user-circle"></a></div>




             <div className="drlistcard__button">
              <a  id="2-2"
                  onClick={this.ChatButtonOnClick}
                  name={postdetail.id}
                   class="fa fa-comment"></a></div>
                


<div className="drlistcard__button">
               <a  
                  id="6"
                  /* if profile button is clicked ProfileButtonOnClick is called */
                  onClick={this.ProfileButtonOnClick}
                  name={postdetail.username}
                  variant="primary"class="fa fa-calendar-o" aria-hidden="true"></a> </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
