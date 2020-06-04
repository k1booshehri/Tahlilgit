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
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/sass/styles.scss";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
const localizer = momentLocalizer(moment); //defining localizer

const DragAndDropCalendar = withDragAndDrop(Calendar); //making calender a DND

//example for min and max of the calender
const minTime = new Date();
minTime.setHours(12, 0, 0);
const maxTime = new Date();
maxTime.setHours(20, 0, 0);

export default class ClinicTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      savedEvents: [],
      getEvents: [], // events that are get from get request
      isClicked: false,
      is: false,
      isModal: false,
      eDel: null,
      hi: "hi",
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.onSelectEvent = this.onSelectEvent.bind(this);
    this.parsingInformation = this.parsingInformation.bind(this);
    this.ChangeSavedEventsFormat = this.ChangeSavedEventsFormat.bind(this);
    this.onModal = this.onModal.bind(this);
  }

  // called when solt(s) are selected, where post request happens
  handleSelect = ({ start, end }) => {
    this.setState({
      events: [
        ...this.state.events,
        {
          start: start,
          end: end,
        },
      ],
    });

    // post request for adding a new event in database
    axios
      .post(
        "http://myravanyar.ir/api/time/?officeid=" +
          sessionStorage.getItem("officeid"), // sending office id
        {
          //sending end and start of the new event (format => Iran Daylight)
          end: end,
          start: start,
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: "token " + sessionStorage.getItem("token"), //doctor's token
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          this.setState({ isClicked: true });
          this.getItems(); // call get request after post to show the latest added event
        }
      })
      .catch(function (error) {
        if (error.response) {
          alert("موفقیت آمیز نبود . دوباره امتحان کنید");
        }
      });
  };

  componentDidMount() {
    this.getItems();
    //console.log("hi");
  }

  // get request for showing events in database
  getItems() {
    fetch(
      "http://myravanyar.ir/api/timesview/?officeid=" +
        sessionStorage.getItem("officeid"), //sending office id
      {
        method: "GET",
        headers: {
          Authorization: "token " + sessionStorage.getItem("token"), //doctor's token
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        this.parsingInformation(res); // call parsing information on datas came from database
        this.setState({ is: true }); // re-render
      })
      .catch((error) => console.error("Error:", error));
  }

  //function for initializing getEvents array with datas came from database
  parsingInformation(res) {
    let getArr = res;
    let getArrinfo = getArr.info;
    this.state.getEvents = getArrinfo.map(this.ChangeSavedEventsFormat); // Call ChangeSavedEventsFormat function for changing the format to Iran daylight format
    console.log(this.state.getEvents);
  }

  //function for changing the events came from get request format to Iran daylight format
  ChangeSavedEventsFormat(e) {
    let end = moment(e.end);
    let start = moment(e.start);

    var event = {
      start: start._d,
      end: end._d,
      id: e.id,
      patient: e.patient,
      reservetime: e.reservetime,
    };
    return event; //return a format like this : //Wed May 20 2020 12:00:00 GMT+0430 (Iran Daylight Time)
  }

  // events CSS
  eventPropGetter(e, start, end, isSelected) {
    if (e.reservetime !== null) {
      var style = {
        backgroundColor: "#f48fb1",
        borderRadius: "0px",
        opacity: 1,
        border: "1px solid black",

        fontSize: "1.1em",
        width: "100%",
        display: "inline-block",
        textAlign: "center",
      };
    }
    if (e.reservetime === null) {
      var style = {
        backgroundColor: "#0277bd",
        borderRadius: "0px",
        opacity: 1,
        border: "1px solid black",

        fontSize: "1.1em",
        width: "100%",
        display: "inline-block",
        textAlign: "center",
      };
    }
    return {
      style: style,
    };
  }

  slotPropGetter(e) {
    var style = {
      fontSize: "1em",
      width: "100%",
    };
    return { style: style };
  }

  dayPropGetter(e) {
    var style = {
      fontSize: "1em",
      width: "100%",
      backgroundColor: "white",
    };
    return { style: style };
  }

  tooltipAccessor(e) {
    return null;
  }
  onModal(e) {
    this.setState({ isModal: true, eDel: e });
  }
  //called when an event is clicked , used for deleting
  onSelectEvent(e) {
    //const r = window.confirm("Would you like to remove this event?");
    this.setState({ is: false, isModal: false });

    // delete request for deleting an event in database
    //  if (r === true) {
    axios
      .delete(
        "http://myravanyar.ir/api/time/?timeid=" + this.state.eDel.id,

        {
          headers: {
            "content-type": "application/json",
            Authorization: "token " + sessionStorage.getItem("token"), //doctor's token
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          this.getItems(); // call get request after post to show the latest added event
        }
      })
      .catch(function (error) {
        if (error.response) {
          alert("موفقیت آمیز نبود . دوباره امتحان کنید");
        }
      });
  }

  resizeEvent = ({ event, start, end }) => {
    this.setState({ is: false });
    // console.log(start, end);
    axios
      .put(
        "http://myravanyar.ir/api/api/time/?timeid=" + event.id,
        {
          start: start,
          end: end,
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
          this.getItems();
        }
      })
      .catch(function (error) {
        if (error.response) {
          alert("موفقیت آمیز نبود . دوباره امتحان کنید");
        }
      });
  };

  render() {
    return (
      <div>
        <div>
          <ul className="moreInfoCalenList">
            <li>.برای ثبت وقت جدید یک بازه ی زمانی را روی تقویم مشخص کنید</li>
            <li>.برای پاک کردن یک وقت روی آن کلیک کنید</li>
            <li>
              .می توانید با تغییر زمان شروع و پایان یک وقت روی تقویم بازه ی
              زمانی آن را تغییر دهید
            </li>
          </ul>
        </div>
        <hr className="divider__calenFromInfo"></hr>
        <div className="Clinic__App">
          <DragAndDropCalendar
            selectable={"ignoreEvents"} // doesnt let one slot being selected twice
            resizable={true}
            localizer={localizer}
            events={this.state.getEvents} // events to be shown
            // step={30}
            timeslots={1}
            views={["week"]}
            toolbar={true}
            min={minTime}
            max={maxTime}
            defaultDate={new Date()} // shaded column
            defaultView="week"
            startAccessor="start"
            endAccessor="end"
            // titleAccessor="id"
            onEventDrop={this.moveEvent}
            tooltipAccessor={this.tooltipAccessor}
            onEventResize={this.resizeEvent}
            onDragStart={console.log}
            eventPropGetter={this.eventPropGetter}
            slotPropGetter={this.slotPropGetter}
            dayPropGetter={this.dayPropGetter}
            onSelectEvent={this.onModal}
            onSelectSlot={this.handleSelect}
            popup={false}
            //  onShowMore={(events, date) => this.setState({ hi: "bye" })}
          />
        </div>
        <Modal isOpen={this.state.isModal} toggle={this.onModal}>
          <ModalBody className="modalbodCalender">
            آیا می خواهید این وقت را لغو کنید؟
          </ModalBody>
          <ModalFooter>
            <Button>مشاهده ی پروفایل کاربر</Button>
            <Button color="primary" onClick={this.onSelectEvent}>
              حذف وقت
            </Button>{" "}
            <Button
              color="secondary"
              onClick={() => this.setState({ isModal: false })}
            >
              خیر
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
