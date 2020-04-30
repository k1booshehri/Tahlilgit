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
import Avatar from "@material-ui/core/Avatar";
import avatar from "./avatarpic.png";
import StarRatingComponent from "react-star-rating-component";
import Rating from "@material-ui/lab/Rating";

export default class DrProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drInfo: "",
      clinicInfo: [],
      email: "",
      f_name: "",
      l_name: "",
      edu: "",
      gender: "",
      field: "",
      birth: "",
      phone: "",
      password: "",
      activetime: "",
      startYear: "",
      username: "",
      code: "",
      transportResultString: "",
      parkResultString: "",
      rate: "",
      image: "",
      rating: 0,
    };
    this.onStarClick = this.onStarClick.bind(this);
    this.parsingInformation = this.parsingInformation.bind(this);
    this.extraClinicInfo = this.extraClinicInfo.bind(this);
  }
  //function parsing the information from response
  parsingInformation(res) {
    let information = res;
    // initializing this states with responses
    this.state.drInfo = information.user;
    this.state.clinicInfo = information.offices;
    //conditions for education value
    let persianEdu = "";
    if (this.state.drInfo.edu === "phd") {
      persianEdu = "دکتری";
    } else if (this.state.drInfo.edu === "masters") {
      persianEdu = "کارشناسی ارشد";
    }
    this.state.f_name = this.state.drInfo.f_name;
    this.state.l_name = this.state.drInfo.l_name;
    this.state.email = this.state.drInfo.email;
    this.state.field = this.state.drInfo.field;
    this.state.edu = persianEdu;
    this.state.gender = this.state.drInfo.gender;
    this.state.activetime = this.state.drInfo.activetime;
    this.state.rate = this.state.drInfo.rate;
    this.state.image = this.state.drInfo.pp;

    let split = this.state.activetime.split("-"); //spliting activetime date for getting the year
    this.state.startYear = split[0];
  }
  //function for creating strings for extra informations about clinics
  extraClinicInfo(transport, park) {
    this.state.transportResultString =
      " امکان دسترسی آسان به مطب با " + transport + "  وجود دارد ";
    this.state.parkResultString =
      " پارک خودروی شخصی در اطراف مطب به زمان زیادی احتیاج " + park;
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
  onStarClick(currentValue, oldValue, name) {
    axios
      .post(
        "http://localhost:8000/api/auth/setrate/",
        {
          Value: currentValue,
          doctorusername: sessionStorage.getItem("DrProfileUsername"),
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: "token " + sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          this.setState({ rating: currentValue });
        }
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          alert("موفقیت آمیز نبود . دوباره امتحان کنید");
        }
      });
  }

  render() {
    return (
      <div className="DrProfileView">
        <div>
          {/* showing doctor info  */}

          {/* <img className='tc br3' alt='none' src={ this.state.image }className="ProfileViewAvatar" /> */}
          {/* <Rating value={this.state.rate} readOnly></Rating> */}

          <div className="nameInfoTable">
            <div class="nameTableRow">
              <div class="nameleftTableCell">
                <img
                  className="tc br3"
                  alt="none"
                  src={this.state.image}
                  className="ProfileViewAvatar"
                />
              </div>
              <div class="namerightTableCell">
                <div className="nameDisplay">
                  {this.state.f_name + " " + this.state.l_name}
                </div>
                <div>
                  <Rating
                    className="DrProfileViewStar"
                    value={this.state.rate}
                    size="small"
                    readOnly
                  ></Rating>
                </div>
              </div>
            </div>
          </div>
          {/* <hr class="divider__ViewProfile"></hr> */}
          <div className="infoTable1">
            <div class="tableRow1">
              <div class="leftTableCell">{this.state.field}</div>
              <div class="rightTableCell">تخصص</div>
            </div>
            <div class="tableRow1">
              <div class="leftTableCell">{this.state.edu}</div>
              <div class="rightTableCell">تحصیلات</div>
            </div>
            <div class="tableRow1">
              <div class="leftTableCell">{this.state.startYear}</div>
              <div class="rightTableCell">شروع فعالیت</div>
            </div>
          </div>
        </div>

        {this.state.clinicInfo.map((postdetail, index) => {
          return (
            <div className="infoWrap">
              <div className="infoTable0">
                {" "}
                <div className="tableRow0">
                  <div class="completeTableCell0">اطلاعات مطب</div>
                </div>
              </div>
              <div className="infoTable1">
                <div className="tableRow1">
                  <div class="leftTableCell">{postdetail.city}</div>
                  <div class="rightTableCell">استان</div>
                </div>
                <div className="tableRow1">
                  <div class="leftTableCell">{postdetail.address}</div>
                  <div class="rightTableCell">آدرس</div>
                </div>
                <div className="tableRow1">
                  <div class="leftTableCell">{postdetail.phone}</div>
                  <div class="rightTableCell">شماره ی مطب</div>
                </div>
              </div>
              <div className="infoTable2">
                <div className="tableRow2">
                  <div class="completeTableCell1">توضیحات</div>
                </div>
              </div>
              <div className="infoTable3">
                <div className="tableRow3">
                  {this.extraClinicInfo(postdetail.transport, postdetail.park)}
                  <div class="completeTableCell2">
                    <ul className="infoList">
                      <li className="listItem">
                        {this.state.transportResultString}
                      </li>

                      <li>{this.state.parkResultString}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="infoTableRating">
          <div className="tableRowRating">
            <div class="leftTableCellRating">
              {" "}
              <div>
                <StarRatingComponent
                  className="Rating"
                  name="rating"
                  starCount={5}
                  value={this.state.rating}
                  onStarClick={this.onStarClick}
                />
              </div>
            </div>
            <div class="rightTableCellRating">امتیاز خود را ثبت کنید</div>
          </div>
        </div>
      </div>
    );
  }
}
