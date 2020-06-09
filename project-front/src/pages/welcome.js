import React, { Component } from "react";
import { Link } from "react-router-dom";

class welcome extends Component {
  constructor() {
    super();
    this.state = {
      firstP:
        ".روان یار، یک سامانه ی تحت وب برای ایجاد ارتباط بهتر میان روانشناسان و کاربران می باشد",
      secondP:
        "از ویژگی های این سامانه می توان به تعیین وقت برای کاربران، مدیریت مطب ها برای روانشناسان، امکان گفت و گو بین طرفین و مدیریت اعلان ها اشاره کرد",
    };
  }
  render() {
    return (
      <div className="App">
        <div className="App__Form">
          <div className="FormCenter__welcome">
            <h3
             className="landing"
            >
          <p dir="rtl" className="landing_txt">روان یار , یک سامانه ی تحت وب برای ایجاد ارتباط بهتر میان روانشناسان و کاربران می باشد.</p>
          <p dir="rtl"  className="landing_txt"> از ویژگی های این سامانه می توان به تعیین وقت برای کاربران، مدیریت مطب ها برای روانشناسان، امکان گفت و گو بین طرفین و مدیریت اعلان ها اشاره کرد.
</p>
        
              </h3>
          
          
            <div className="FormField__welcome">
              <Link
                className="links"
                style={{
                  width: "50%",
                  textDecoration: "none",
                  justifyContent: "left",
                  textAlign: "center",
                }}
                to="/sign-in"
              >
                <button
                  className="FormField__Button "
                  style={{ marginLeft: "1.4em" }}
                >
                  کاربر
                </button>
              </Link>

              <Link
                style={{
                  width: "50%",
                  textDecoration: "none",
                  justifyContent: "right",
                  textAlign: "center",
                }}
                to="/Dr_Sign_In"
              >
                <button
                  className="FormField__Button "
                  style={{ marginRight: "1.4em" }}
                >
                  روانشناس
                </button>
              </Link>
            </div>
          </div>
          <div className="formcenter-part2"></div>
        </div>
      </div>
    );
  }
}

export default welcome;
