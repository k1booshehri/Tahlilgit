import React, { Component } from "react";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Card from 'react-bootstrap/Card'
import { HashRouter as Router, Route, NavLink } from "react-router-dom";

class Drlist extends Component {
   
   constructor(props){
       super(props);
       this.state = {
           
           'Drlist' : []
       }
   } 


   componentDidMount (){
       this.getItems();

   }
   getItems(){
       fetch('http://localhost:8000/doctors/edu=phd/')
       .then(results =>results.json())
       .then(results => this.setState({'Drlist' : results}))
   }
   
   
   
   
   
    render() {
        return (
             <div className="Drpage">
                 
                 <div >
                 { this.state.Drlist.map((postdetail , index)=> {
                return <h1 >
                 
             <Card className = "card">
             <Card.Body>
           
        {  /* <img>hii</img> */}
            <div >
 
             <Card.Title> {postdetail.f_name} {postdetail.l_name}</Card.Title>
             </div>
             <Card.Text>
              <div className = "title" >
               {postdetail.phone}
               </div>
               <div className = "title">
               {postdetail.email}
               </div>
               </Card.Text>
              <button className="Drbutton" variant="primary">profile</button>
              </Card.Body>
             </Card></h1>
             
            
             })}
             
             </div> 
             </div>

            
        );
    }

}
export default Drlist;