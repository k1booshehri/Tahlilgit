import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import avatar from "./avatarpic.png";
import Send from "@material-ui/icons/Send";


export default class ChatMsgs extends Component {
    constructor() {
        super();
    
        this.state = {
          current_message : ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(e) {
        let target = e.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;
    
        this.setState({
          [name]: value,
        });
      }
     
    
      handleSubmit(e) {
        e.preventDefault();
    
      /*  axios
        .post(
          "http://localhost:8000/api/auth/setrate/",
          {
            Value: currentValue,
            doctorusername: sessionStorage.getItem("DrProfileUsername"),
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: "token " + sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            alert("امتیاز شما ثبت شد");
            this.setState({ rating: currentValue, isStateSet: true });
          }
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            alert("موفقیت آمیز نبود . دوباره امتحان کنید");
          }
        });*/
      
      
      }

    /*  componentDidMount() {
        
        this.interval = setInterval(() => { console.log('running') }, 1000);
      }*/

      render(){
   
          return(
            <div class="mesgs">
          <div class="msg_history">


            <div class="incoming_msg">
              <div class="incoming_msg_img"> <img src={avatar} alt="sunil"/> </div>
              <div class="received_msg">
                <div class="received_withd_msg">
                  <p>its so sakht :[ </p>
                  <span class="time_date"> ساعت   |   تاریخ</span></div>
              </div>
            </div>
           <div class="outgoing_msg">
              <div class="sent_msg">
                <p>Apollo University, Delhi, India Test</p>
                <span class="time_date"> 11:01 AM    |    Today</span> </div>
            </div>
            
           
           
            </div>
            
    {/***********************send button***********************************/}  
        
        
        
          <form onSubmit={this.handleSubmit}>
          <div class="type_msg">
            <div class="input_msg_write">
            <input
            id="current_message"
            class="right"
            placeholder=" ...بنویسید"
            name="current_message"
            value={this.state.current_message}
            onChange={this.handleChange}
          />



              <button class="msg_send_btn"   >
               <Send></Send>
               </button>
            </div>
          </div>
          </form> 
        </div>
      
          )
      }


}
