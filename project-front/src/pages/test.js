import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import avatar from "./avatarpic.png";

import Search from "@material-ui/icons/Search";


export default class ChatList extends Component {

    constructor() {
        super();
    
        this.state = {
          seconds : Date.now(),
          
        };
       
    }
   
    componentDidMount() {
        
        this.interval = setInterval(() => {
            this.setState({ seconds: Date.now() });
            console.log(this.state.seconds)
          }, 1000);
      }
    
      componentWillUnmount() {
        clearInterval(this.interval);
      }
   
   
    render(){
        return(

            <div className="App">
            <header className="App-header">
              {this.state.seconds} seconds have elapsed since mounting.
            </header>
          </div>
        )
    }
}