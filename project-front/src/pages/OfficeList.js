import React, { Component } from "react";
import $ from "jquery";
import ClinicTime from "./ClinicTime";
import { Collapse, Button, CardBody, Card } from "reactstrap";

export default class OfficeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officeList: [],
      dataToggle: " ",
      isOpen: {},
      info: "",
      item: "",
    };
    this.mapInfo = this.mapInfo.bind(this);
    this.collapseFunc = this.collapseFunc.bind(this);
  }
  componentDidMount() {
    this.getItems();
  }

  getItems() {
    fetch("http://localhost:8000/api/auth/officelist", {
      method: "GET",
      headers: {
        Authorization: "token " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((results) => this.mapInfo(results))
      .catch((error) => console.error("Error:", error));
  }

  mapInfo(results) {
    for (var i = 0; i < results.length; i++) {
      this.state.isOpen[results[i].id] = false;
    }
    var info = results.map((postdetail, index) => {
      return (
        <div className="Drofficecard">
          <div className="officecardtitle">
            <div> {postdetail.info}</div>
          </div>

          <div>
            <div className="Officecardinfo"> استان : {postdetail.city} </div>
          </div>

          <div>
            <div className="Officecardinfo"> آدرس : {postdetail.address} </div>
          </div>

          <div>
            <div className="Officecardinfo">تلفن : {postdetail.phone}</div>
            <div className="Officecardinfo">
              حمل و نقل : {postdetail.transport}
            </div>
            <div className="Officecardinfo"></div>
          </div>
          {/* button for calender */}

          <div className="card clinicCard">
            <div className="card-header" id="headingOne">
              <h5 className="mb-0">
                <button
                  className="calenderButton"
                  //  type="button"
                  data-toggle="collapse"
                  data-target={"#Collapsible" + postdetail.id}
                  onClick={(e) => {
                    sessionStorage.setItem("officeid", postdetail.id);

                    var a = postdetail.id;
                    this.state.isOpen[postdetail.id] = true;
                    {
                      this.collapseFunc();
                    }
                  }}
                  aria-expanded="true"
                  aria-controls={"Collapsible" + postdetail.id}
                >
                  وقت دهی آنلاین
                </button>
              </h5>
            </div>

            <div
              id={"Collapsible" + postdetail.id}
              className="collapse"
              aria-labelledby={"Collapsible" + postdetail.id}
            >
              {/* {this.state.isOpen[postdetail.id] === true ? ( */}
              <div className="card-body">
                {/* <ClinicTime /> */}
                {this.collapseFunc()}
              </div>
              {/* // ) : (
              //   <p>ih</p>
              // )} */}
            </div>
          </div>
        </div>
      );
    });
    this.setState({ info: info });
  }

  collapseFunc() {
    let item = <ClinicTime />;
    this.setState({ item: item });
  }

  render() {
    return (
      <div>
        {this.state.info}
        <button
          className="newoffice"
          id="1-1"
          onClick={(e) => this.props.updateState(e)}
        >
          ثبت مطب جدید
        </button>
      </div>
    );
  }
}
