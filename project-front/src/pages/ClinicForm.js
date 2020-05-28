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

export default class ClinicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      city: "",
      title: "",
      phone: "",
      park: "",
      transport: "",
      info: "",
      haveLogedIn: false,
    };
    this.handleChange = this.handleChange.bind(this);
    //  this.onClick = this.onClick.bind(this);
    // this.onSelect = this.onSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    // let value = target.type === "checkbox" ? target.checked : target.value;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }
  // onSelect(e) {
  //   let targetValue = e.target.value;
  //   let targetName = e.target.name;
  //   this.setState({ [targetName]: targetValue });
  // }
  handleSubmit(e) {
    e.preventDefault();
    // const data = {
    //   address: this.state.address,
    //   city: this.state.address,
    //   phone: this.state.phone,
    //   park: this.state.park,
    //   transport: this.state.transport,
    //   info: this.state.info,
    // };
    // console.log(data);

    axios
      .post(
        "http://localhost:8000/api/auth/office-register",
        {
          address: this.state.address,
          city: this.state.city,
          phone: this.state.phone,
          park: this.state.park,
          transport: this.state.transport,
          info: this.state.info,
          //title : this.state.title,
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
          //console.log(res.data);
          alert("مطب جدید ثبت شد");
          this.setState({ haveLogedIn: true });
        }
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          alert("موفقیت آمیز نبود . دوباره امتحان کنید");
        }
      });
  }

  render() {
    if (this.state.haveLogedIn) {
      // redirect to dashboard if signed up
      //  alert("مطب جدید با موفقیت ثبت شد");
      return <Redirect to={{ pathname: "/DrDashboard" }} />;
    }
    if (!this.state.haveLogedIn) {
      return (
        <div className="clinicForm ">
          <form onSubmit={this.handleSubmit} className="FormField3">
            <p className="clinicFormTitle">
              {" "}
              برای ثبت مطب جدید اطلاعات زیر را تکمیل کنید
            </p>
            <hr className="divider__clinic"></hr>
            <div className="FormField3">
              <label className="clinicFormLable" htmlFor="title">
                نام مطب خود را وارد کنید
              </label>
              <input
                type="text"
                className="clinicFormInput"
                id="title"
                name="title"
                placeholder="نام مطب"
                value={this.state.title}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="FormField3">
              <label className="clinicFormLable" htmlFor="address">
                آدرس مطب خود را وارد کنید
              </label>
              <input
                type="text"
                className="clinicFormInput"
                id="address"
                name="address"
                placeholder="شهر،منطقه،خیابان،پلاک،واحد"
                value={this.state.address}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="FormField3">
              <label className="clinicFormLable" htmlFor="city">
                استان مطب را انتخاب کنید
              </label>
              <select
                value={this.state.city}
                onChange={this.handleChange}
                required
                className="clinicFormInput"
                id="city"
                placeholder=""
                name="city"
              >
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
            </div>
            <div className="FormField3">
              <label className="clinicFormLable" htmlFor="phone">
                شماره ی تلفن مطب را با رعایت کد پیش شماره ی استان مورد نظر وارد
                کنید
              </label>
              <input
                className="clinicFormInput"
                placeholder="شماره تلفن"
                type="tel"
                id="phone"
                name="phone"
                pattern="[0]\d{10}$"
                value={this.state.phone}
                required
                onChange={this.handleChange}
              />
            </div>
            <div className="FormField3">
              <label className="clinicFormLable" htmlFor="transport">
                مطب شما با کدام وسایل حمل و نقل عمومی دسترسی آسان تری دارد؟
              </label>
              <div>
                <label className="clinicFormInput-checkbox" htmlFor="transport">
                  تاکسی
                </label>
                <input
                  className="clinicFormCheckbox"
                  type="checkbox"
                  name="transport"
                  value="تاکسی"
                  onChange={this.handleChange}
                />
                <label className="clinicFormInput-checkbox" htmlFor="transport">
                  {" "}
                  اتوبوس
                </label>
                <input
                  className="clinicFormCheckbox"
                  type="checkbox"
                  name="transport"
                  value="اتوبوس"
                  onChange={this.handleChange}
                />
                <label className="clinicFormInput-checkbox" htmlFor="transport">
                  {" "}
                  مترو
                </label>
                <input
                  className="clinicFormCheckbox"
                  type="checkbox"
                  name="transport"
                  value="مترو"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="FormField3">
              <label className="clinicFormLable" htmlFor="park">
                آیا پارک خودروی شخصی در اطراف مطب شما به زمان زیادی احتیاج دارد؟
              </label>
              <div>
                <label className="clinicFormInput-checkbox" htmlFor="park">
                  بله
                </label>
                <input
                  className="clinicFormCheckbox"
                  type="checkbox"
                  name="park"
                  value="دارد"
                  onChange={this.handleChange}
                  //onClick={this.onClick}
                />
                <label className="clinicFormInput-checkbox" htmlFor="park">
                  {" "}
                  خیر
                </label>
                <input
                  className="clinicFormCheckbox"
                  type="checkbox"
                  name="park"
                  value="ندارد"
                  onChange={this.handleChange}
                  //onClick={this.onClick}
                />
              </div>
            </div>
            <div className="FormField3">
              <label className="clinicFormLable" htmlFor="info">
                توضیخات تکمیلی درمورد مطب خود را وارد کنید
              </label>
              <textarea
                type="text"
                className="clinicFormInput-info"
                id="info"
                rows="5"
                cols="50"
                name="info"
                placeholder="توضیحات"
                value={this.state.info}
                onChange={this.handleChange}
              />
              {/* <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea> */}
            </div>
            <div className="FormField1">
              <button className="clinicButton mr-20">ثبت مطب</button>{" "}
            </div>
          </form>
        </div>
      );
    }
  }
}
