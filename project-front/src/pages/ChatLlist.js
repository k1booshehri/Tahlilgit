import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import avatar from "./avatarpic.png";

import Search from "@material-ui/icons/Search";

export default class ChatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contains: "",
      ChatList: [],
    };

    this.ChatListOnClick = this.ChatListOnClick.bind(this);
  }
  componentDidMount() {
    this.getItems();
  }

  getItems() {
    fetch("http://myravanyar.ir/api/chatlist", {
      method: "GET",
      headers: {
        Authorization: "token " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.parsingInformation(res);
      })
      .then((res) => {
        this.props.data.updatedrChat(res);
      })
      .catch((error) => console.error("Error:", error));
  }
  parsingInformation(res) {
    let information = res;

    this.state.ChatList = information.info;
  }

  ChatListOnClick(e) {
    this.props.data.updatedrChat(
      localStorage.setItem("DrOnChatUsername", e.target.name)
    );
    console.log(localStorage.getItem("DrOnChatUsername"));
  }
  render() {
    return (
      <div class="inbox_people">
        <form onSubmit={this.handleSubmit}>
          <div class="headind_srch">
            <div class="recent_heading">
              <h4>لیست گفتگو ها</h4>
            </div>
            <div class="srch_bar">
              <div class="stylish-input-group">
                <input
                  class="search-bar"
                  placeholder="جستجو"
                  id="contains"
                  name="contains"
                  value={this.state.contains}
                  onChange={this.handleChange}
                />

                <span class="input-group-addon">
                  <button>
                    <Search></Search>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </form>

        {/******************************** showing list ***************************************/}
        <div class="inbox_chat">
          {this.state.ChatList.map((postdetail, index) => {
            return (
              <div class="chat_list active_chat">
                <div class="chat_people">
                  {postdetail.destpp !== null ? (
                    <img
                      src={postdetail.destpp}
                      className="chat_img"
                      onClick={this.ChatListOnClick}
                      name={postdetail.destid}
                    />
                  ) : (
                    <img
                      src={avatar}
                      className="chat_img"
                      onClick={this.ChatListOnClick}
                      name={postdetail.destid}
                    />
                  )}
                  <div class="chat_ib">
                    <h5>
                      {postdetail.destusername}
                      {/* <span class="chat_date">تاریخ</span>*/}
                    </h5>

                    {/*    <button id="2-2" onClick={this.ChatButtonOnClick}     className="locationbutton">گفتگو</button>*/}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
