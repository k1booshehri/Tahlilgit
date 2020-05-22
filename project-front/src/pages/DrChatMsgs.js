import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import avatar from "./avatarpic.png";
import Send from "@material-ui/icons/Send";
import axios from "axios";

export default class ChatMsgs extends Component {
  constructor() {
    super();

    this.state = {
      current_message: "",
      doctor: "",
      patient: "",
      massages: [],
      drid: "",
      patientid: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  /********************************************************************************* */

  componentDidMount() {
    this.interval = setInterval(() => {
      this.getItems();
    }, 300);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getItems() {
    fetch(
      "http://localhost:8000/api/drgetchat/?" +
        "patientid=" +
        localStorage.getItem("PatientOnChatUsername"),
      {
        method: "GET",
        headers: {
          Authorization: "token " + sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        this.parsingInformation(res);
      })
      .then((res) => {
        this.props.data.updatedrmsgs(res);
      })
      .catch((error) => console.error("Error:", error));
  }
  parsingInformation(res) {
    let information = res;

    this.state.doctor = information.doctor;
    this.state.patient = information.patient;
    this.state.massages = information.chats;

    this.state.drid = this.state.doctor.username;
    this.state.patientid = this.state.patient.username;
  }

  /********************************************************************************* */

  handleSubmit(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8000/api/sendchat/?" +
          "destid=" +
          localStorage.getItem("PatientOnChatUsername"),
        {
          message: this.state.current_message,
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: "token " + sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        this.props.data.updatedrmsgs(res),
          this.setState({ current_message: " " });
      })
      .catch((error) => console.error("Error:", error));
  }

  /*  componentDidMount() {
        
        this.interval = setInterval(() => { console.log('running') }, 1000);
      }*/

  render() {
    return (
      <div class="mesgs">
        <div class="msg_history">
          {this.state.massages.map((postdetail, index) => {
            return (
              <div>
                {this.state.patientid === postdetail.sender ? (
                  <div class="incoming_msg">
                    <div class="incoming_msg_img">
                      {" "}
                      <img src={avatar} alt="sunil" />{" "}
                    </div>
                    <div class="received_msg">
                      <div class="received_withd_msg">
                        <p>{postdetail.message}</p>
                        {/* <span class="time_date"> ساعت | تاریخ</span> */}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div class="outgoing_msg">
                    <div class="sent_msg">
                      <p>{postdetail.message}</p>
                      {/* <span class="time_date"> 11:01 AM | Today</span>{" "} */}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/***********************send button***********************************/}

        <form onSubmit={this.handleSubmit}>
          <div class="type_msg">
            <div class="input_msg_write">
              <input
                id="current_message"
                class="right"
                placeholder=" ...بنویسید"
                name="current_message"
                value={this.state.current_message}
                onChange={this.handleChange}
                autoComplete="off"
              />

              <button class="msg_send_btn">
                <Send></Send>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
