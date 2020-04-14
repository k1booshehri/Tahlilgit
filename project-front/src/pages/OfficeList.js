import React, { Component } from "react";
import Drofficedata from "../pages/officedata/officedata.json";

export default class OfficeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officeList: [],
    };
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
      .then((results) => this.setState({ officeList: results }))
      .catch((error) => console.error("Error:", error));
  }

  render() {
    return (
      <div>
        {this.state.officeList.map((postdetail, index) => {
          return (
            <h1>
              <div className="Drofficecard">
                <div>
                  <div> {postdetail.info} </div>
                </div>

                <div className="titleOffice">
                  <div> {postdetail.city} :شهر</div>
                </div>

                <div>
                  <div className="titleOffice"> {postdetail.address} :آدرس</div>
                </div>

                <div>
                  <div className="titleOffice"> {postdetail.phone} :تلفن </div>
                </div>

                <div>
                  <div className="titleOffice">
                    {" "}
                    {postdetail.transport} :امکان دسترسی{" "}
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
          ثبت مطب جدید{" "}
        </button>
      </div>
    );
  }
}
