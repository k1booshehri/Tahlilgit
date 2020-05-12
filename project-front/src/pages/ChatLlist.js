import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import avatar from "./avatarpic.png";
import Send from "@material-ui/icons/Send";


export default class ChatList extends Component {

  

      render(){
          return(
            <div class="inbox_people">
            <div class="headind_srch">
              <div class="recent_heading">
                <h4>لیست گفتگو ها</h4>
              </div>
              <div class="srch_bar">
                <div class="stylish-input-group">
                  <input type="text" class="search-bar"  placeholder="جستجو" />
                  <span class="input-group-addon">
                  <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                  </span> </div>
              </div>
            </div>
            <div class="inbox_chat">
              <div class="chat_list active_chat">
                <div class="chat_people">
                  <div class="chat_img"> <img src={avatar} alt="sunil"/> </div>
                  <div class="chat_ib">
                    <h5>hana <span class="chat_date">تاریخ</span></h5>
                    <p>hallo
                      </p>
                  </div>
                  
                </div>
                 </div>
              
              
            
            
            </div>
            
          </div>
          )
      }

}