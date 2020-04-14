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
  // onClick(e) {
  //   var checkboxes = e.target.name;
  //   // checkboxes.forEach((item) => {
  //   //   if (item !== e) item.checked = false;
  //   // });
  //   // Array.prototype.forEach.call(checkboxes, (item) => {
  //   //   if (item !== e) item.checked = false;
  //   // });

  //   for (const item of checkboxes) {
  //     if (item !== e) e.checked = false;
  //   }
  // }
  render() {
    if (this.state.haveLogedIn) {
      // redirect to dashboard if signed up
      return <Redirect to={{ pathname: "/DrDashboard" }} />;
    }
    if (!this.state.haveLogedIn) {
      return (
        <form onSubmit={this.handleSubmit} className="FormField3">
          <div className="clinicFormTitle">
            <div className=".clinicFormTitleText">
              برای ثبت مطب جدید اطلاعات زیر را تکمیل کنید
            </div>
          </div>
          <div className="FormField3">
            <label className="FormField__Label" htmlFor="address">
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
            <label className="FormField__Label" htmlFor="city">
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
          </div>
          <div className="FormField3">
            <label className="FormField__Label" htmlFor="phone">
              شماره ی تلفن مطب را با رعایت کد پیش شماره ی استان مورد نظر وارد
              کنید
            </label>
            <input
              className="clinicFormInput"
              placeholder="شماره ی تلفن"
              type="tel"
              id="phone"
              name="phone"
              value={this.state.phone}
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="FormField3">
            <label className="FormField__Label" htmlFor="transport">
              مطب شما یا کدام وسایل حمل و نقل عمومی دسترسی آسان تری دارد؟
            </label>
            <div>
              <input
                className="clinicFormCheckbox"
                type="checkbox"
                name="transport"
                value="taxi"
                onChange={this.handleChange}
              />
              <label className="clinicFormInput-checkbox" htmlFor="transport">
                تاکسی
              </label>
              <input
                className="clinicFormCheckbox"
                type="checkbox"
                name="transport"
                value="bus"
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
                value="subway"
                onChange={this.handleChange}
              />
              <label className="clinicFormInput-checkbox" htmlFor="transport">
                {" "}
                مترو
              </label>
            </div>
          </div>
          <div className="FormField3">
            <label className="FormField__Label" htmlFor="park">
              آیا پارک خودروی شخصی در اطراف مطب شما به زمان زیادی احتیاج دارد؟
            </label>
            <div>
              <input
                className="clinicFormCheckbox"
                type="checkbox"
                name="park"
                value="parkYes"
                onChange={this.handleChange}
                //onClick={this.onClick}
              />
              <label className="clinicFormInput-checkbox" htmlFor="park">
                بله
              </label>
              <input
                className="clinicFormCheckbox"
                type="checkbox"
                name="park"
                value="parkNo"
                onChange={this.handleChange}
                //onClick={this.onClick}
              />
              <label className="clinicFormInput-checkbox" htmlFor="park">
                {" "}
                خیر
              </label>
            </div>
          </div>
          <div className="FormField3">
            <label className="FormField__Label" htmlFor="info">
              توضیخات تکمیلی درمورد مطب خود را وارد کنید
            </label>
            <textarea
              type="text"
              className="clinicFormInput-info"
              id="info"
              rows="5"
              cols="50"
              name="info"
              placeholder="توضیخات"
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
            <button className="FormField__Button mr-20">ثبت مطب</button>{" "}
          </div>
        </form>
      );
    }
  }
}
