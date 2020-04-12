import React, { Component } from "react";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";
//import Card from 'react-bootstrap/Card'
import { HashRouter as Router, Route, NavLink } from "react-router-dom";

class Drlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Drlist: [],
    };
  }
  componentDidMount() {
    this.getItems();
  }
  getItems() {
    fetch("http://localhost:8000/doctors/edu=phd/")
      .then((results) => results.json())
      .then((results) => this.setState({ Drlist: results }));
  }
  render() {
    return (
      <div className="Drpage">
        <div>
          {this.state.Drlist.map((postdetail, index) => {
            return (
              <h1>
                <div className="Drlistcard">
                  {/* <img>hii</img> */}
                  <div>
                    <div>
                      {" "}
                      {postdetail.f_name} {postdetail.l_name}
                    </div>
                  </div>
                  <div>
                    <div className="title">{postdetail.edu}</div>
                    <div className="title">{postdetail.field}</div>
                  </div>
                  <button className="Drbutton" variant="primary">
                    profile
                  </button>
                </div>
              </h1>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Drlist;
