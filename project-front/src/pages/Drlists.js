import React, { Component } from "react";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";
//import Card from 'react-bootstrap/Card'
import { HashRouter as Router, Route, NavLink } from "react-router-dom";

import Filter from "./Filtering";


export default class Drlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Drlist: [],
    };
  }
  componentDidMount() {
    this.getItems();
  }
  getItems() {
    fetch("http://localhost:8000/doctors/edu=phd/")
      .then((results) => results.json())
      .then((results) => this.setState({ Drlist: results }));
  }
 /* state = {
    search : ""
  }
  onchange = e =>{
    this.setState({ search : e.target.value });
}*/

  
  render() {

    return (
   
    /*  <input label="Search Country" icon="search" onChange={this.onchange}
      type="search"
      id="search"
      className="Drsearch"
      placeholder="search"
      name="search"
      value={this.state.search}
  
      />*/
   
      
   <div >
       
       <Filter/> 
        
        <div className = "Drlistdashboard">
     
          {this.state.Drlist.map((postdetail, index) => {
            return (
              console.log(this.state.Drlist),
               
              
                <div className="Drlistcard">
               
                  
                  {/* <img>hii</img> */}
                  <div>
                    <div className="container">{postdetail.f_name}{postdetail.l_name}  :نام پزشک</div>
                  </div>
                  <div>
                    <div className="container">{postdetail.edu}  :تحصیلات</div>
                    <div className="container">{postdetail.field} :تخصص</div>
                  </div>
                  <button className="locationbutton" variant="primary">
                    profile
                  </button>
                </div>
             
            );
          })}
        </div>
       
      </div>
      
     
    );
  }
}

