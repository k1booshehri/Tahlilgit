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
      getEvents: [], // events that are get from get request
      city: "",
      isClicked: false,
      is: false,
    };

    this.parsingCitiesInformation = this.parsingCitiesInformation.bind(this);
    this.createSelectItems = this.createSelectItems.bind(this);
    this.handleDropChange = this.handleDropChange.bind(this);
    this.parsingClinicsEvents = this.parsingClinicsEvents.bind(this);
    this.ChangeSavedEventsFormat = this.ChangeSavedEventsFormat.bind(this);
    this.onSelectEvent = this.onSelectEvent.bind(this);
  }

  //events CSS
  eventPropGetter(e, start, end, isSelected) {
    if (e.reservetime !== null) {
      var style = {
        backgroundColor: "#f48fb1",
        // borderRadius: "0px",
        opacity: 1,
        //  color: "black",
        border: "0px",
        fontSize: "1.2em",
        width: "100%",
        display: "inline-block",
        textAlign: "center",
      };
    }
    if (e.reservetime === null) {
      var style = {
        backgroundColor: "#0277bd",
        // borderRadius: "0px",
        opacity: 1,
        // color: "black",
        border: "0px",
        fontSize: "1.2em",
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

  parsingCitiesInformation(res) {
    let clinicInfo = res;
    this.state.clinicInfo = clinicInfo.offices;
    this.state.clinicCities = this.state.clinicInfo.map((e) => e.city);
    //console.log(this.state.clinicCities);
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
        this.parsingCitiesInformation(res);
        this.setState({ isClicked: true });
      })
      .catch((error) => console.error("Error:", error));
  }

  getEventItems() {
    let url =
      "http://localhost:8000/api/times/?doctorusername=" +
      sessionStorage.getItem("DrProfileUsername") +
      "&city=" +
      this.state.city;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ isClicked: true });
        this.parsingClinicsEvents(res);
      })
      .catch((error) => console.error("Error:", error));
  }
  createSelectItems() {
    let items = [];
    for (let i = 0; i <= this.state.clinicCities.length; i++) {
      items.push(
        <option key={i} value={this.state.clinicCities[i]}>
          {this.state.clinicCities[i]}
        </option>
      );
    }
    // console.log(items);
    return items;
  }
  handleDropChange(e) {
    let target = e.target;
    let value = target.value;
    this.state.city = value;
    // console.log(this.state.city);
    this.getEventItems();
  }

  //function for initializing getEvents array with datas came from database
  parsingClinicsEvents(res) {
    let getArr = res;
    let getArrinfo = getArr.info;
    this.state.getEvents = getArrinfo.map(this.ChangeSavedEventsFormat); // Call ChangeSavedEventsFormat function for changing the format to Iran daylight format
    // console.log(this.state.getEvents);
    this.setState({ isClicked: true });
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
  //called when an event is clicked , used for reserving
  onSelectEvent(e) {
    console.log(e.reservetime);
    //the event is reserved
    if (e.reservetime !== null) {
      this.setState({ isClicked: false });

      const r = window.confirm("Would you like to cancel this event?");
      if (r === true) {
        axios
          .put(
            "http://localhost:8000/api/timecancel/?timeid=" + e.id,
            {},
            {
              headers: {
                "content-type": "application/json",
                Authorization: "token " + sessionStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              this.getEventItems();

              alert("موفقیت آمیز بود");
            }
          })
          .catch(function (error) {
            if (error.response) {
              alert("موفقیت آمیز نبود . دوباره امتحان کنید");
            }
          });
      }
    }
    //the event is not reserved
    if (e.reservetime === null) {
      this.setState({ isClicked: false });

      const r = window.confirm("Would you like to reserve this event?");
      if (r === true) {
        axios
          .put(
            "http://localhost:8000/api/timeset/?timeid=" + e.id,
            {},
            {
              headers: {
                "content-type": "application/json",
                Authorization: "token " + sessionStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              this.getEventItems();

              alert("موفقیت آمیز بود");
            }
          })
          .catch(function (error) {
            if (error.response) {
              alert("موفقیت آمیز نبود . دوباره امتحان کنید");
            }
          });
      }
    }
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
            onChange={this.handleDropChange}
            required
            className="clinicFormInput"
            id="city"
            name="city"
          >
            {this.createSelectItems()}
          </select>
        </div>

        <div className="Clinic__App_Res">
          <Calendar
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
            //titleAccessor="id"
            tooltipAccessor={this.tooltipAccessor}
            eventPropGetter={this.eventPropGetter}
            slotPropGetter={this.slotPropGetter}
            dayPropGetter={this.dayPropGetter}
            onSelectEvent={this.onSelectEvent}
          />
        </div>
      </div>
    );
  }
}
