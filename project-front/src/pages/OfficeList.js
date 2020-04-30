import React, { Component } from "react";

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
      <div >
        {this.state.officeList.map((postdetail, index) => {
          return (
           
              <div className="Drofficecard">
                <div className = "officecardtitle">
                  <div> {postdetail.info}</div>
                </div>

                <div>
                  <div className="Officecardinfo">  شهر :  {postdetail.city} </div>
                </div>

                <div>
                  <div className="Officecardinfo">   آدرس : {postdetail.address} </div>
                </div>


                <div>
                  <div className="Officecardinfo">
                   
                تلفن : {postdetail.phone}      
                   
                  </div>
                  <div className="Officecardinfo">
                  حمل و نقل : {postdetail.transport} 
                  </div>
                  <div className="Officecardinfo"></div>
                </div>
              </div>
           
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
