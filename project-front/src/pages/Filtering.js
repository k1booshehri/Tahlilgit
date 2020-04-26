import React, { Component } from "react";
import queryString from 'query-string'

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

       {/* let params = {
          
            "contains": this.state.contains,
            "city": this.state.city,
            "gender":this.state.gender,
            "field": this.state.field,
            "rate" :this.state.rate
          };*/}


          let p = new URLSearchParams();

       if(this.state.contains){ p.append('contains', this.state.contains);}
       if (this.state.city){p.append('city', this.state.city );}
       if(this.state.gender){ p.append('gender', this.state.gender );}
        if (this.state.field){p.append('field', this.state.field);}
       if(this.state.rate){ p.append('rate', this.state.rate);}

      window.history.replaceState(null , '' , '/PatientDashboard/'+p);
      
       return fetch('http://localhost:8000/filter/?' + p, {
           
    })
    .then((results) => results.json())
    .then( (results) => this.props.data.updatedr(results));
     
    
    
        
        
     {/*   
    
          let query = Object.keys(params)
          .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
          .join('&');

             let url = 'http://localhost:8000/filter/?' + query;

                   fetch(url)
                 .then(res => res.json())
                  .then( (json) => {
                    console.info(json);
                  } ).catch(function (error) {
                 console.log('request failed', error)
                 });
       
         
         
       
       
       {/*   
            fetch("http://localhost:8000/doctors/edu=phd/")
              .then((results) => results.json())
              .then((results) => this.setState({ Drlist: results }));
       */}

    
    
    }
   
   
    
      
   
   
    render(){
        return(
           

            <div className =" sidenav t" >

                {/*************************/}
                

            
                <div className="filteringlable">: جستجو</div>
                <label className="Filtering__Label" htmlFor="rate">
                  : اسم و فامیل  
                  </label>
                  <input
                    
                    id="contains"
                    className="Filtering__Input"
                    placeholder="اسم و فامیل مورد نظر"
                    name="contains"
                    value={this.state.contains}
                    onChange={this.handleChange}
                   
                  />

         
           <div className="filteringlable">: دسته بندی </div>
         
         {/*****************************/}
         <form onSubmit={this.handleSubmit} >
               
                  <label className="Filtering__Label" htmlFor="city">
                     : استان   
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
                    <option value="east-azarbijan">آذربایجان شرقی</option>
                    <option value="west-azarbijan">آذربایجان غربی</option>
                    <option value="ardebil">اردبیل</option>
                    <option value="isfahan">اصفهان</option>
                    <option value="alborz">البرز</option>
                    <option value="ilam">ایلام</option>
                    <option value="boushehr">بوشهر</option>
                    <option value="tehran">تهران</option>
                    <option value="chaharmahal">چهارمحال و بختیاری</option>
                    <option value="south-khorasan">خراسان جنوبی</option>
                    <option value="razavi">خراسان رضوی</option>
                    <option value="north-khorasan">خراسان شمالی</option>
                    <option value="khozestan">خوزستان</option>
                    <option value="zanjan">زنجان</option>
                    <option value="semnan">سمنان</option>
                    <option value="sistan">سیستان و بلوچستان</option>
                    <option value="fars">فارس</option>
                    <option value="ghazvin">قزوین</option>
                    <option value="qom">قم</option>
                    <option value="kordestan">کردستان</option>
                    <option value="kerman">کرمان</option>
                    <option value="kermanshah">کرمانشاه</option>
                    <option value="kohkelouyeh">کهگیلویه و بویراحمد</option>
                    <option value="golestan">گلستان</option>
                    <option value="gilan">گیلان</option>
                    <option value="lorestan">لرستان</option>
                    <option value="mazandaran">مازندران</option>
                    <option value="markazi">مرکزی</option>
                    <option value="hormozgan">هرمزگان</option>
                    <option value="hamedan">همدان</option>
                    <option value="yazd">یزد</option>
                  </select>
             {/*********************************/}

             <label htmlFor="gender" className="Filtering__Label">
                   : جنسیت 
                  </label>
                  <select
                    className="Filtering__Input"
                    name="gender"
                    id="gender"
                    value={this.state.gender}
                    onChange={this.handleChange}
                   
                  >
                      <option value= {null} > </option>
                    <option value="female">زن</option>
                    <option value="male">مرد</option>
                    <option value="other">سایر</option>
                  </select>
              {/*******************************/}

              <label htmlFor="field" className="Filtering__Label">
                   : تخصص 
                  </label>
                  <select
                    name="field"
                    id="field"
                    className="Filtering__Input"
                    value={this.state.field}
                    onChange={this.handleChange}
                   
                  >
                      <option value={null}> </option>
                    <option value="balini">روان شناسی بالینی</option>
                    <option value="moshavere">روان شناسی مشاوره </option>
                    <option value="khanevade">روان شناسی خانواده </option>
                    <option value="tahisli">روان شناسی تحصیلی </option>
                    <option value="tarbiati">روان شناسی تربیتی </option>
                    <option value="shakhsiat">روان شناسی شخصیت </option>
                    <option value="ejtemaei">روان شناسی اجتماعی </option>
                    <option value="sazmani">روان شناسی صنعتی و سازمانی </option>
                    <option value="masraf">روان شناسی مصرف </option>
                  </select>

                  {/**********************************/}

                  <label className="Filtering__Label" htmlFor="rate">
                   : امتیاز 
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
                  <button className="Filtering__Button mr-20">جستجو</button>

                  </form>
                   
      
     
     
   </div>




            
                

       


           
          
            
        )
    }



}
