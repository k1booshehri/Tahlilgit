import React, { Component } from "react";
import { Link } from "react-router-dom";

class welcome extends Component {
  render() {
    return (
      <div className="App">
        <div className="App__Form">
        <div className="FormCenter__welcome">

        <div>A paragraph is a series of related sentences developing a central idea, 
              called the topic. Try to think about paragraphs in terms of thematic unity: 
              a paragraph is a sentence or a group of sentences that supports one central, unified idea. 
              Paragraphs add one idea at a time to your broader argument.</div>
          <div className="FormField__welcome">

            <Link to="/sign-in">
              <button className="FormField__Button mr-20">بیمار</button>
            </Link>
        
           
            <Link to="/Dr_Sign_In">
              <button className="FormField__Button mr-20">روانشناس</button>
            </Link>
         </div>
          </div>
          <div className="formcenter-part2">روان یار</div>
       
        </div>
      </div>
    );
  }
}

export default welcome;
