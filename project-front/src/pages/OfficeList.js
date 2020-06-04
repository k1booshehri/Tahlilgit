import React, { Component } from "react";
import $ from "jquery";
import ClinicTime from "./ClinicTime";
import { Collapse, Button, CardBody, Card } from "reactstrap";

// const style = { backgroundColor: "#00bcd4" };

export default class OfficeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officeList: [],
      dataToggle: " ",
      isOpen: {},
      info: "",
      item: "",
      collapse: false,
      officIdCollapse: {},
      isReq: false,
      isTog: false,
    };
    this.toggle = this.toggle.bind(this);
    this.parsingInformation = this.parsingInformation.bind(this);
  }
  componentDidMount() {
    this.getItems();
  }

  toggle(id) {
    sessionStorage.setItem("officeid", id);
    this.state.officIdCollapse[id] = !this.state.officIdCollapse[id];
    var isTog = !this.state.isTog;
    this.setState({ isTog: isTog });
  }
  getItems() {
    fetch("http://myravanyar.ir/api/auth/officelist", {
      method: "GET",
      headers: {
        Authorization: "token " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((results) => {
        this.parsingInformation(results);
        this.setState({ isReq: true });
      })
      .catch((error) => console.error("Error:", error));
  }

  parsingInformation(results) {
    this.state.officeList = results;
    console.log(this.state.officeList);
    for (var i = 0; i < results.length; i++) {
      this.state.officIdCollapse[results[i].id] = false;
    }
    //  console.log(this.state.officIdCollapse);
  }
  render() {
    return (
      <div>
        {this.state.officeList.map((postdetail, index) => {
          return (
            <div key={postdetail.id} className="Drofficecard">
              <div className="officecardtitle">
                <div> {postdetail.title}</div>
              </div>

              <div>
                <div className="Officecardinfo">
                  {" "}
                  استان : {postdetail.city}{" "}
                </div>
              </div>

              <div>
                <div className="Officecardinfo">
                  {" "}
                  آدرس : {postdetail.address}{" "}
                </div>
              </div>

              <div>
                <div className="Officecardinfo">تلفن : {postdetail.phone}</div>
                <div className="Officecardinfo">
                  حمل و نقل : {postdetail.transport}
                </div>
                <div className="Officecardinfo"></div>
              </div>
              {/* button for calender */}
              <div className="card clinicCard ">
                <div className="card-header">
                  <h5 className="mb-0 ">
                    <button
                      className="calenderButton"
                      onClick={() => this.toggle(postdetail.id)}
                    >
                      وقت دهی آنلاین
                    </button>
                  </h5>
                </div>

                <Collapse
                  isOpen={this.state.officIdCollapse[postdetail.id]}
                  onEntering={console.log(
                    this.state.officIdCollapse[postdetail.id]
                  )}
                >
                  {this.state.officIdCollapse[postdetail.id] === true ? (
                    <div className="card-body">
                      <ClinicTime />
                    </div>
                  ) : null}
                </Collapse>
              </div>
            </div>
          );
        })}
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
{
  /* 
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
                  aria-labelledby="headingOne"
                >
                  <div className="card-body">
                    <ClinicTime />
                    {this.collapseFunc()}
                  </div>
                </div>
              </div> */
}
