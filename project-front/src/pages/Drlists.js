import React, { Component } from "react";
import postdata from '../data/posts.json'
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Card from 'react-bootstrap/Card'
import { HashRouter as Router, Route, NavLink } from "react-router-dom";

class Drlist extends Component {
    render() {
        return (
             <div className="App">
                 
                 <div >
                 { postdata.map((postdetail , index)=> {
                return <h1 className="App__Form_dr">
                   
             <Card style={{ width: '18rem' }}>
             <Card.Body>
             <Card.Title> {postdetail.f_name} {postdetail.l_name}</Card.Title>
             <Card.Text>
              <div >
               {postdetail.phone}
               </div>
               <div >
               {postdetail.email}
               </div>
               </Card.Text>
              <button className="Dr__list__Button" variant="primary">profile</button>
              </Card.Body>
             </Card></h1>
             
            
             })}
             
             </div> 
             </div>

            
        );
    }

}
export default Drlist;