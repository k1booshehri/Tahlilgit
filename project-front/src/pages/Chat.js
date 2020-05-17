
import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import avatar from "./avatarpic.png";
import Send from "@material-ui/icons/Send";
import ChatMsgs from "./ChatMsgs";
import ChatList from "./ChatLlist";



export default class DoctorProfile extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      DrChat:null,
    };
 
  }
 

  updatedrChat(items) {
    this.setState({ DrChat: items });
    console.log(localStorage.getItem("DrOnChatUsername"))
  }
   
          render(){
           
        return(
          <div>
          <h3 class="header">گفتگو</h3>
          <div class="chat">


          <div>
            <ChatList 
            
            data={{
            DrChat: this.state.DrChat,
            updatedrChat: this.updatedrChat.bind(this),
          }}>

          </ChatList>

          { localStorage.getItem("DrOnChatUsername")==='null'? (
             <div>
               
                
             <div class="mesgs">
                   <div class="msg_history">
             <div className="nomassage">no massage found</div>
             </div>
             </div>
             </div>
          ) : (
           

          
            <ChatMsgs></ChatMsgs>
     
        
          )}
          </div>
          </div>
    </div>
          
         
           )}}