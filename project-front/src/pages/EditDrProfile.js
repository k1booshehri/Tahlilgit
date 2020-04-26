import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  HashRouter as Router,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";

export default class EditDrProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="DrProfileForm">
        <div className="DrProfileInfoTable">
          {" "}
          <div className="DrProfileTableRow">
            {" "}
            <div className="DrProfileLeftTableCell">
              {" "}
              <div className="DrProfileFormField">
                <label htmlFor="l_name" className="DrProfileFormField__Label">
                  نام خانوداگی
                </label>
                <input
                  type="text"
                  className="DrProfileFormField__Input"
                  id="l_name"
                  name="l_name"
                  value={this.state.l_name}
                  placeholder={this.state.l_name}
                  readOnly
                />
              </div>
            </div>
            <div className="DrProfileRightTableCell">
              {" "}
              <div className="DrProfileFormField">
                <label className="DrProfileFormField__Label" htmlFor="f_name">
                  نام
                </label>
                <input
                  type="text"
                  className="DrProfileFormField__Input"
                  id="f_name"
                  name="f_name"
                  value={this.state.f_name}
                  placeholder={this.state.f_name}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="DrProfileTableRow">
            <div className="DrProfileLeftTableCell">
              <div className="DrProfileFormField">
                <label className="DrProfileFormField__Label" htmlFor="birth">
                  تاریخ تولد
                </label>
                <input
                  type="text"
                  className="DrProfileFormField__Input"
                  id="birth"
                  name="birth"
                  value={this.state.birth}
                  placeholder={this.state.birth}
                  readOnly
                />
              </div>
            </div>{" "}
            <div className="DrProfileRightTableCell">
              {" "}
              <div className="DrProfileFormField">
                <label htmlFor="gender" className="DrProfileFormField__Label">
                  جنسیت
                </label>
                <input
                  type="text"
                  className="DrProfileFormField__Input"
                  id="gender"
                  name="gender"
                  value={this.state.gender}
                  placeholder={this.state.gender}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="DrProfileTableRow">
            <div className="DrProfileLeftTableCell">
              <div className="DrProfileFormField">
                <label className="DrProfileFormField__Label" htmlFor="email">
                  آدرس ایمیل
                </label>
                <input
                  type="text"
                  className="DrProfileFormField__Input"
                  id="email"
                  name="email"
                  value={this.state.email}
                  placeholder={this.state.email}
                  readOnly
                />
              </div>
            </div>{" "}
            <div className="DrProfileRightTableCell">
              {" "}
              <div className="DrProfileFormField">
                <label className="DrProfileFormField__Label" htmlFor="phone">
                  شماره ی موبایل
                </label>
                <input
                  type="text"
                  className="DrProfileFormField__Input"
                  id="phone"
                  name="phone"
                  value={this.state.phone}
                  placeholder={this.state.phone}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="DrProfileTableRow">
            <div className="DrProfileLeftTableCell">
              {" "}
              <div className="DrProfileFormField">
                <label htmlFor="field" className="DrProfileFormField__Label">
                  تخصص
                </label>
                <input
                  type="text"
                  className="DrProfileFormField__Input"
                  id="field"
                  name="field"
                  value={this.state.field}
                  placeholder={this.state.field}
                  readOnly
                />
              </div>
            </div>{" "}
            <div className="DrProfileRightTableCell">
              {" "}
              <div className="DrProfileFormField">
                <label htmlFor="edu" className="DrProfileFormField__Label">
                  تحصیلات
                </label>
                <input
                  type="text"
                  className="DrProfileFormField__Input"
                  id="edu"
                  name="edu"
                  value={this.state.edu}
                  placeholder={this.state.edu}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="DrProfileTableRow">
            <div className="DrProfileLeftTableCell">
              <div className="DrProfileFormField">
                <label className="DrProfileFormField__Label" htmlFor="code">
                  کد نظام پزشکی
                </label>
                <input
                  type="text"
                  className="DrProfileFormField__Input"
                  id="code"
                  name="code"
                  value={this.state.code}
                  placeholder={this.state.code}
                  readOnly
                />
              </div>
            </div>{" "}
            <div className="DrProfileRightTableCell">
              {" "}
              <div className="DrProfileFormField">
                <label
                  className="DrProfileFormField__Label"
                  htmlFor="startYear"
                >
                  تاریخ شروع فعالیت پزشکی
                </label>
                <input
                  type="text"
                  className="DrProfileFormField__Input"
                  id="startYear"
                  name="startYear"
                  value={this.state.startYear}
                  placeholder={this.state.startYear}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="DrProfileTableRow">
            <div className="DrProfileLeftTableCell">
              {" "}
              <div className="DrProfileFormField">
                <label className="DrProfileFormField__Label" htmlFor="password">
                  رمز ورود
                </label>
                <input
                  type="text"
                  className="DrProfileFormField__Input"
                  id="password"
                  name="password"
                  value={this.state.password}
                  placeholder={this.state.password}
                  readOnly
                />
              </div>
            </div>{" "}
            <div className="DrProfileRightTableCell">
              {" "}
              <div className="DrProfileFormField">
                <label className="DrProfileFormField__Label" htmlFor="username">
                  نام کاربری
                </label>
                <input
                  type="text"
                  className="DrProfileFormField__Input"
                  id="username"
                  name="username"
                  value={this.state.username}
                  placeholder={this.state.username}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
