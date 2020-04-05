import React, { Component } from "react";
import { Link } from "react-router-dom";

class welcome extends Component {
  render() {
    return (
      <div className="App">
        <div className="App__Form">
          <div className="FormField2">
            <Link to="/sign-in">
              <button className="FormField__Button mr-20">بیمار</button>
            </Link>
            <Link to="/Dr_Sign_In">
              <button className="FormField__Button mr-20">روانشناس</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default welcome;
