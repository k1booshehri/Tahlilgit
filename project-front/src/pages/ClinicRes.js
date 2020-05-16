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

const localizer = momentLocalizer(moment); //defining localizer

//example for min and max of the calender
const minTime = new Date();
minTime.setHours(12, 0, 0);
const maxTime = new Date();
maxTime.setHours(20, 0, 0);

export default class ClinicRes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [], // events to be shown
      savedEvents: [], // events to be saved
      clinicInfo: [],
      clinicCities: [],
    };

    this.parsingInformation = this.parsingInformation.bind(this);
    this.createSelectItems = this.createSelectItems.bind(this);
  }

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

  parsingInformation(res) {
    let clinicInfo = res;
    this.state.clinicInfo = clinicInfo.offices;
    this.state.clinicCities = this.state.clinicInfo.map((e) => e.city);
    console.log(this.state.clinicCities);
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

  createSelectItems() {
    let items = [];
    for (let i = 0; i <= this.state.clinicCities.length; i++) {
      items.push(
        <option key={i} value={i}>
          {this.state.clinicCities[i]}
        </option>
      );
      //here I will be creating my options dynamically based on
      //what props are currently passed to the parent component
    }
    return items;
  }
  render() {
    return (
      <div className="CalenContainer">
        <div className="FormField3">
          <label className="clinicFormLable" htmlFor="city">
            استان مطب را انتخاب کنید
          </label>
          <select
            value={this.state.city}
            // onChange={this.handleChange}
            required
            className="clinicFormInput"
            id="city"
            placeholder=""
            name="city"
          >
            {this.createSelectItems()}
          </select>
        </div>

        {/* <Input type="select" onChange={this.onDropdownSelected} label="Multiple Select" multiple>
       {this.createSelectItems()}
  </Input> */}

        <div className="Clinic__App_Res">
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
            //  onSelectEvent={this.onSelectEvent}

            // startAccessor="start"
            // endAccessor="end"

            slotPropGetter={this.slotPropGetter}
            dayPropGetter={this.dayPropGetter}
            tooltipAccessor={this.tooltipAccessor}
          />
        </div>
      </div>
    );
  }
}
