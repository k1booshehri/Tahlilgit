
import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import avatar from "./avatarpic.png";
import Send from "@material-ui/icons/Send";
import ChatMsgs from "./ChatMsgs";
import ChatList from "./ChatLlist";



export default class DoctorProfile extends Component {

   
          render(){
        return(
            <div>
            <h3 class="header">گفتگو</h3>
            <div class="chat">

            <ChatList></ChatList>
            <ChatMsgs></ChatMsgs>
      </div>
    </div>
        )
    }



}