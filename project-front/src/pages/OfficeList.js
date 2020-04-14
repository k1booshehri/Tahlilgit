import React, { Component } from "react";
import Drofficedata from "../pages/officedata/officedata.json";
import DrDashboard from "./DrDashboard";

export default class OfficeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OfficeList: [],
    };
  }
  //   componentDidMount() {
  //     this.getItems();
  //   }
  //   getItems() {
  //     fetch("")
  //       .then((results) => results.json())
  //       .then((results) => this.setState({ OfficeList: results }));
  //   }

  render() {
    return (
      <div>
        {Drofficedata.map((postdetail, index) => {
          return (
            <h1 id="h1">
              <div className="Drofficecard" id="Drofficecard">
                <div>
                  <div> {postdetail.building_name}</div>
                </div>
                <div>
                  <div className="titleOffice" id="titleOffice">
                    {postdetail.building_adress}
                  </div>
                </div>
              </div>
            </h1>
          );
        })}
        <button
          className="newoffice"
          id="1-1"
          onClick={(e) => this.props.updateState(e)}
        >
          {" "}
          مطب جدید{" "}
        </button>
      </div>
    );
  }
}
