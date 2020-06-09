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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

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
      startYear: null,
      username: "",
      code: "",
      transportResultString: "",
      parkResultString: "",
      rate: "",
      image: "",
      rating: 0,
      isStateSet: false,
      nullString: "ثبت نشده است",
      isnotLoged: false,
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
    this.state.username = this.state.drInfo.username;

    if (this.state.activetime !== null) {
      let split = this.state.activetime.split("-"); //spliting activetime date for getting the year
      this.state.startYear = split[0];
    }
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
      "http://myravanyar.ir/api/user/username=" +
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
        "http://myravanyar.ir/api/auth/setrate/",
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
          this.setState({ rating: currentValue, isnotLoged: true });
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
    if (!this.state.isStateSet) {
      return (
        <div className="DrProfileView">
          <div>
            {/* showing doctor info  */}

            <div className="nameInfoTable">
              <div class="nameTableRow">
                <div class="nameleftTableCell">
                  <div className="nameDisplay">
                    {this.state.f_name + " " + this.state.l_name}
                    <div style={{ fontSize: 25, fontFamily: "Katibeh" }}>
                      {this.state.username}
                    </div>

                    <Rating
                      value={this.state.rate}
                      size="small"
                      readOnly
                    ></Rating>
                  </div>
                </div>
                <div class="namerightTableCell">
                  {this.state.image !== null ? (
                    <img
                      alt="none"
                      src={this.state.image}
                      className="ProfileViewAvatar"
                    />
                  ) : (
                    <img src={avatar} className="ProfileViewAvatar" />
                  )}
                  {/* <div className="DrProfileViewStar">
                    <Rating
                      value={this.state.rate}
                      size="small"
                      readOnly
                    ></Rating>
                  </div> */}
                </div>
              </div>
            </div>
            <hr class="divider__EditProfile" style={{ marginTop: "0" }}></hr>
            <div className="DrProfileInfoTable">
              <div className="DrProfileTableRow_base">
                <div className="DrProfileLeftTableCell_base">
                  {" "}
                  <div class="DrProfileTableRow">
                    <div class="DrProfileLeftTableCell">
                      <div className="DrProfileFormField">
                        {" "}
                        {this.state.edu !== null ? (
                          <input
                            className="DrProfileFormField__Input__Right2"
                            readOnly
                            placeholder={this.state.edu}
                          />
                        ) : (
                          <input
                            className="DrProfileFormField__Input__Right2"
                            readOnly
                            placeholder={this.state.nullString}
                          />
                        )}
                      </div>
                    </div>
                    <div class="DrProfileRightTableCell">
                      <label className="DrProfileFormField__Label">
                        تحصیلات
                      </label>
                    </div>
                  </div>
                </div>
                <div className="DrProfileRightTableCell_base">
                  {" "}
                  <div class="DrProfileTableRow">
                    <div class="DrProfileLeftTableCell">
                      <div className="DrProfileFormField">
                        {" "}
                        {this.state.field !== null ? (
                          <input
                            className="DrProfileFormField__Input__Right2"
                            readOnly
                            placeholder={this.state.field}
                          />
                        ) : (
                          <input
                            className="DrProfileFormField__Input__Right2"
                            readOnly
                            placeholder={this.state.nullString}
                          />
                        )}
                      </div>
                    </div>
                    <div class="DrProfileRightTableCell">
                      <label className="DrProfileFormField__Label">تخصص</label>
                    </div>
                  </div>
                  <div class="DrProfileTableRow">
                    <div class="DrProfileLeftTableCell">
                      <div className="DrProfileFormField">
                        {" "}
                        {this.state.startYear !== null ? (
                          <input
                            className="DrProfileFormField__Input__Right2"
                            readOnly
                            placeholder={this.state.startYear}
                          />
                        ) : (
                          <input
                            className="DrProfileFormField__Input__Right2"
                            readOnly
                            placeholder={this.state.nullString}
                          />
                        )}
                      </div>
                    </div>
                    <div class="DrProfileRightTableCell">
                      <label className="DrProfileFormField__Label">
                        شروع فعالیت
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="drviewprofile_offices">
            {this.state.clinicInfo.map((postdetail, index) => {
              return (
                <div className="drviewprofile_location_infoWrap">
                  <div className="drviewprofile_location">
                    <h4
                      style={{
                        fontFamily: "BZar",
                        marginTop: "180px",
                      }}
                    >
                      ... به زودی{" "}
                    </h4>
                  </div>

                  <div className="infoWrap">
                    <div className="tableRow0">
                      <div class="completeTableCell0">{postdetail.title}</div>
                    </div>

                    <div className="infoTable1">
                      <div className="tableRow1">
                        <div class="rightTableCell"> : استان</div>
                        <div class="leftTableCell">{postdetail.city}</div>
                      </div>
                      <div className="tableRow1">
                        <div class="rightTableCell"> : آدرس</div>
                        <div class="leftTableCell">{postdetail.address}</div>
                      </div>
                      <div className="tableRow1">
                        <div class="rightTableCell"> : شماره ی مطب </div>
                        <div class="leftTableCell">{postdetail.phone}</div>
                      </div>
                    </div>
                    <div className="infoTable3">
                      <div className="tableRow3">
                        {this.extraClinicInfo(
                          postdetail.transport,
                          postdetail.park
                        )}
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
                </div>
              );
            })}
          </div>
          <div className="infoTableRating">
            <div className="tableRowRating">
              <div class="leftTableCellRating">
                <div>
                  <StarRatingComponent
                    className="Rating"
                    name="rating"
                    starCount={5}
                    value={this.state.rating}
                    onStarClick={this.onStarClick}
                    starColor={"Green"}
                  />
                </div>
              </div>
              <div class="rightTableCellRating">امتیاز خود را ثبت کنید</div>
            </div>{" "}
            <Modal
              style={{ fontFamily: "BZar" }}
              isOpen={this.state.isnotLoged}
            >
              <ModalBody>
                {" "}
                <Button
                  outline
                  onClick={() => this.setState({ isnotLoged: false })}
                >
                  &times;
                </Button>
              </ModalBody>
              <ModalBody className="modalbodCalender">
                .امتیاز شما ثبت شد
              </ModalBody>
            </Modal>
          </div>{" "}
        </div>
      );
    }
  }
}
