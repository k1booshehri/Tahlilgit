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

const localizer = momentLocalizer(moment); //defining localizer

//example for min and max of the calender
const minTime = new Date();
minTime.setHours(12, 0, 0);
const maxTime = new Date();
maxTime.setHours(20, 0, 0);

export default class ClinicTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [], // events to be shown
      showEvents: [], // events to be saved
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  // called when solt(s) are selected
  handleSelect = ({ start, end }) => {
    //creating savedStart for saving in savedEvents
    let startMomentFormat = moment(start);
    let savedStart =
      startMomentFormat.get("year") +
      "-" +
      startMomentFormat.get("month") +
      "-" +
      startMomentFormat.get("day") +
      " " +
      startMomentFormat.get("hour") +
      ":" +
      startMomentFormat.get("minute") +
      ":" +
      startMomentFormat.get("second");

    //creating savedEnd for saving in savedEvents
    let endMomentFormat = moment(start);
    let savedEnd =
      endMomentFormat.get("year") +
      "-" +
      endMomentFormat.get("month") +
      "-" +
      endMomentFormat.get("day") +
      " " +
      endMomentFormat.get("hour") +
      ":" +
      endMomentFormat.get("minute") +
      ":" +
      endMomentFormat.get("second");

    const title = window.prompt("New Event name");
    if (title)
      this.setState({
        savedEvents: [
          {
            savedStart: savedStart,
            end: savedEnd,
            title: title,
            allDay: false,
          },
        ],
        events: [
          {
            start: start,
            end: end,
            title: title,
            allDay: false,
          },
        ],
      });
    console.log(this.state.events);
    console.log(this.state.savedEvents);
  };

  //events CSS
  eventPropGetter(e, start, end, isSelected) {
    var style = {
      backgroundColor: "#4fc3f7",
      borderRadius: "0px",
      opacity: 1,
      color: "black",
      border: "0px",
      fontSize: "1.4em",
      width: "100%",
      display: "inline-block",
      textAlign: "center",
    };
    return {
      style: style,
    };
  }

  render() {
    return (
      <div className="Clinic__App">
        <Calendar
          selectable={"ignoreEvents"} // doesnt let one slot being selected twice
          localizer={localizer}
          events={this.state.events} // events to be shown
          step={60}
          timeslots={5}
          views={["week"]}
          toolbar={true}
          min={minTime}
          max={maxTime}
          defaultDate={new Date()} // shaded column
          defaultView="week"
          eventPropGetter={this.eventPropGetter}
          events={this.state.events}
          style={{ height: "100vh" }}
          onSelectEvent={(event) => alert(event.title)}
          onSelectSlot={this.handleSelect}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
        />
      </div>
    );
  }
}
