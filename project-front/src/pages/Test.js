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
export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <p className="test">successful</p>;
  }
}

// export default Test;
