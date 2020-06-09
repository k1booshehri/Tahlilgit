import React, { Component } from "react";
import queryString from "query-string";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";
//import Card from 'react-bootstrap/Card'
import { HashRouter as Router, Route, NavLink } from "react-router-dom";

export default class Filtering extends Component {
  constructor() {
    super();

    this.state = {
      contains: "",
      city: "",
      gender: "",
      field: "",
      rate: "",
      Drs: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleduplicate = this.handleduplicate.bind(this);
   
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }
  /* componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        console.log(values.contains) // "active"
        console.log(values.city) // "ascend"
        console.log(values.gender) // "1"
        console.log(values.field)
        console.log(values.rate) // "50"
      }
    */

  handleSubmit(e) {
    e.preventDefault();

    {
      /* let params = {
          
            "contains": this.state.contains,
            "city": this.state.city,
            "gender":this.state.gender,
            "field": this.state.field,
            "rate" :this.state.rate
          };*/
    }

    let p = new URLSearchParams();
   

    if (this.state.contains) {
      p.append("contains", this.state.contains);
    }
    if (this.state.city) {
      p.append("city", this.state.city);
    }
    if (this.state.gender) {
      p.append("gender", this.state.gender);
    }
    if (this.state.field) {
      p.append("field", this.state.field);
    }
    if (this.state.rate) {
      p.append("rate", this.state.rate);
    }

    window.history.replaceState(null, "", "/PatientDashboard/" + p);

    return fetch("http://myravanyar.ir/api/filter/?" + p, {})
      .then((results) => results.json())
    /* .then((results)=>  results.map((x) => {
      a.push(x.username);
  }),)*/
      .then((results) => 

       this.handleduplicate(results)
   
       /* results.map((x) => {
          if (!a.includes('x.username')) {
            a.push(x.username);
            results.push(x);
          }
        })*/
     )
      

   
  }
  handleduplicate(e){
    let clean = [];
    clean = e.filter((e, index, self) =>
    index === self.findIndex((t) => (t.username === e.username )))
    this.props.data.updatedr(clean)

  }



  render() {
    return (
      <div className=" filterin_sidenav ">
        {/*************************/}

        <div className="filteringlable"> جستجو</div>
        <label className="Filtering__Label" htmlFor="rate">
          اسم و فامیل
        </label>
        <input
          id="contains"
          className="Filtering__Input"
          placeholder="اسم و فامیل مورد نظر"
          name="contains"
          value={this.state.contains}
          onChange={this.handleChange}
        />

        <div className="filteringlable"> دسته بندی </div>

        {/*****************************/}
        <form onSubmit={this.handleSubmit}>
          <label className="Filtering__Label" htmlFor="city">
            استان
          </label>
          <select
            value={this.state.city}
            onChange={this.handleChange}
            className="Filtering__Input"
            id="city"
            placeholder=""
            name="city"
          >
            <option value={null}> </option>
            <option value="آذربایجان شرقی">آذربایجان شرقی</option>
            <option value="آذربایجان غربی">آذربایجان غربی</option>
            <option value="آردبیل">اردبیل</option>
            <option value="اصفهان">اصفهان</option>
            <option value="البرز">البرز</option>
            <option value="ایلام">ایلام</option>
            <option value="بوشهر">بوشهر</option>
            <option value="تهران">تهران</option>
            <option value="چهارمحال و بختیاری">چهارمحال و بختیاری</option>
            <option value="خراسان جنوبی">خراسان جنوبی</option>
            <option value="خراسان رضوی">خراسان رضوی</option>
            <option value="خراسان شمالی">خراسان شمالی</option>
            <option value="خوزستان">خوزستان</option>
            <option value="زنجان">زنجان</option>
            <option value="سمنان">سمنان</option>
            <option value="سیستان و بلوچستان">سیستان و بلوچستان</option>
            <option value="فارس">فارس</option>
            <option value="قزوین">قزوین</option>
            <option value="قم">قم</option>
            <option value="کردستان">کردستان</option>
            <option value="کرمان">کرمان</option>
            <option value="کرمانشاه">کرمانشاه</option>
            <option value="کهگیلویه و بویراحمد">کهگیلویه و بویراحمد</option>
            <option value="گلستان">گلستان</option>
            <option value="گیلان">گیلان</option>
            <option value="لرستان">لرستان</option>
            <option value="مازندران">مازندران</option>
            <option value="مرکزی">مرکزی</option>
            <option value="هرمزگان">هرمزگان</option>
            <option value="همدان">همدان</option>
            <option value="یزد">یزد</option>
          </select>
          {/*********************************/}

          <label htmlFor="gender" className="Filtering__Label">
            جنسیت
          </label>
          <select
            className="Filtering__Input"
            name="gender"
            id="gender"
            value={this.state.gender}
            onChange={this.handleChange}
          >
            <option value={null}> </option>
            <option value="زن">زن</option>
            <option value="مرد">مرد</option>
            <option value="سایر">سایر</option>
          </select>
          {/*******************************/}

          <label htmlFor="field" className="Filtering__Label">
            تخصص
          </label>
          <select
            name="field"
            id="field"
            className="Filtering__Input"
            value={this.state.field}
            onChange={this.handleChange}
          >
            <option value={null}> </option>
            <option value="روان شناسی بالینی">روان شناسی بالینی</option>
            <option value="روان شناسی مشاوره">روان شناسی مشاوره </option>
            <option value="روان شناسی خانواده">روان شناسی خانواده </option>
            <option value="روان شناسی تحصیلی">روان شناسی تحصیلی </option>
            <option value="روان شناسی تربیتی">روان شناسی تربیتی </option>
            <option value="روان شناسی شخصیت">روان شناسی شخصیت </option>
            <option value="روان شناسی اجتماعی">روان شناسی اجتماعی </option>
            <option value="روان شناسی صنعتی و سازمانی">
              روان شناسی صنعتی و سازمانی{" "}
            </option>
            <option value="روان شناسی مصرف">روان شناسی مصرف </option>
          </select>

          {/**********************************/}

          <label className="Filtering__Label" htmlFor="rate">
            امتیاز
          </label>
          <input
            id="rate"
            className="Filtering__Input"
            placeholder="کمترین امتیاز مورد نظر"
            name="rate"
            value={this.state.rate}
            onChange={this.handleChange}
          />
          {/**************/}
          <button className=" Filtering__Button">جستجو</button>
        </form>
      </div>
    );
  }
}
