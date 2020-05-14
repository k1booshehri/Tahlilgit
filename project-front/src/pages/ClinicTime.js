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
// import "react-big-calendar/lib/sass/styles";

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
      savedEvents: [], // events to be saved
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.onSelectEvent = this.onSelectEvent.bind(this);
  }

  // called when solt(s) are selected
  handleSelect = ({ start, end }) => {
    //creating savedStart for saving in savedEvents
    let startMomentFormat = moment(start);

    let savedStart =
      startMomentFormat.get("year") +
      "-" +
      (startMomentFormat.get("month") + 1) +
      "-" +
      startMomentFormat.get("D") +
      " " +
      startMomentFormat.get("hour") +
      ":" +
      startMomentFormat.get("minute") +
      ":" +
      startMomentFormat.get("second");

    //creating savedEnd for saving in savedEvents
    let endMomentFormat = moment(end);
    let savedEnd =
      endMomentFormat.get("year") +
      "-" +
      (endMomentFormat.get("month") + 1) +
      "-" +
      endMomentFormat.get("D") +
      " " +
      endMomentFormat.get("hour") +
      ":" +
      endMomentFormat.get("minute") +
      ":" +
      endMomentFormat.get("second");

    this.setState({
      savedEvents: [
        ...this.state.savedEvents,
        {
          savedStart: savedStart,
          savedEnd: savedEnd,
        },
      ],
      events: [
        ...this.state.events,
        {
          start: start,
          end: end,
        },
      ],
    });
    console.log(this.state.events);
    console.log(this.state.savedEvents);
  };

  //events CSS
  eventPropGetter(e, start, end, isSelected) {
    var style = {
      backgroundColor: "#e1f5fe",
      borderRadius: "0px",
      opacity: 1,
      color: "black",
      border: "0px",
      fontSize: "1em",
      width: "100%",
      display: "inline-block",
      textAlign: "center",
    };
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
    };
    return { style: style };
  }
  tooltipAccessor(e) {
    return null;
  }
  onSelectEvent(e) {
    const r = window.confirm("Would you like to remove this event?");
    if (r === true) {
      //remove chosen event from events
      var removeIndex = this.state.events
        .map(function (item) {
          return item.start;
        })
        .indexOf(e.start);
      this.state.events.splice(removeIndex, 1);
      //remove chosen event from savedEvents
      var removeIndex = this.state.savedEvents
        .map(function (item) {
          return item.start;
        })
        .indexOf(e.start);
      this.state.savedEvents.splice(removeIndex, 1);
      console.log(this.state.savedEvents);
    }
  }
  render() {
    return (
      <div className="Clinic__App">
        <Calendar
          selectable={"ignoreEvents"} // doesnt let one slot being selected twice
          localizer={localizer}
          events={this.state.events} // events to be shown
          // step={30}
          // timeslots={10}
          timeslots={1}
          views={["week"]}
          toolbar={true}
          min={minTime}
          max={maxTime}
          defaultDate={new Date()} // shaded column
          defaultView="week"
          eventPropGetter={this.eventPropGetter}
          events={this.state.events}
          // style={{ height: "100vh" }}
          onSelectEvent={this.onSelectEvent}
          onSelectSlot={this.handleSelect}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          slotPropGetter={this.slotPropGetter}
          dayPropGetter={this.dayPropGetter}
          tooltipAccessor={this.tooltipAccessor}
        />
      </div>
    );
  }
}
