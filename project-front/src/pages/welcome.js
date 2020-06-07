import React, { Component } from "react";
import { Link } from "react-router-dom";

class welcome extends Component {
  constructor() {
    super();
    this.state = {
      firstP:
        "روان یار، یک سامانه ی تحت وب برای ایجاد ارتباط بهتر میان روانشناسان و کاربران می باشد",
      secondP:
        "از ویژگی های این سامانه می توان به تعیین وقت برای کاربران، مدیریت مطب ها برای روانشناسان، امکان گفت و گو بین طرفین و مدیریت اعلان ها اشاره کرد",
    };
  }
  render() {
    return (
      <div className="App">
        <div className="App__Form">
          <div className="FormCenter__welcome">
            <div>{this.state.firstP}</div>
            <div>{this.state.secondP}</div>
            <div className="FormField__welcome">
              <Link to="/sign-in">
                <button className="FormField__Button mr-20">بیمار</button>
              </Link>

              <Link to="/Dr_Sign_In">
                <button className="FormField__Button mr-20">روانشناس</button>
              </Link>
            </div>
          </div>
          <div className="formcenter-part2">روان یار</div>
        </div>
      </div>
    );
  }
}

export default welcome;
