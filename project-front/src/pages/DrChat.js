import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import avatar from "./avatarpic.png";
import Send from "@material-ui/icons/Send";
import DrChatMsgs from "./DrChatMsgs.js";
import DrChatList from "./DrChatList";



export default class DoctorProfile extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      DrChat:null,
      Drmsgs: '',
    };
 
  }
 

  updatedrChat(items) {
    this.setState({ DrChat: items });
  
  }
  updatedrmsgs(items) {
    this.setState({ DrChat: items });
   
  }
   
          render(){
           
        return(
      
         

          <div>
            <DrChatList 
            
            data={{
            DrChat: this.state.DrChat,
            updatedrChat: this.updatedrChat.bind(this),
          }}>

          </DrChatList>

          { localStorage.getItem("PatientOnChatUsername")==='null'? (
             <div>
               
                
             <div class="mesgs">
                   <div class="msg_history">
             <div className="nomassage">no massage found</div>
             </div>
             </div>
             </div>
          ) : (
           

          
            <DrChatMsgs 
            data={{
              Drmsgs: this.state.DrChat,
              updatedrmsgs: this.updatedrChat.bind(this),
            }}
            ></DrChatMsgs>
     
        
          )}
          </div>
         
          
         
           )}}