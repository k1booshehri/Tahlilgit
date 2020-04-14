import React, { Component } from "react";
import Drofficedata from '../pages/officedata/officedata.json'


export default class OfficeList extends Component {
   
  constructor(props){
       super(props);
       this.state = {
           
           'officeList' : []
       }
   } 
 componentDidMount (){
       this.getItems();

   }
   getItems(){
       fetch('http://localhost:8000/api/auth/officelist', {
        method: 'GET',
        headers:{
          Authorization: "token " + sessionStorage.getItem("token"),
          'Content-Type': 'application/json'
        }
      })
       .then(res => res.json())
       .then(results => this.setState({'officeList' : results}))
       .catch(error => console.error('Error:', error));
   } 
 
 
   render() {
        return (
             <div >
                 
                 <div >
                 { this.state.officeList.map((postdetail , index)=> {
                return <h1 >
                 
             <div className = "Drofficecard">
           
           
       
        <div >
        <div> {postdetail.city}</div>
        </div>
        <div>
         
          <div className = "titleOffice">
          {postdetail.address}
          </div>
          </div>
        

         
             
             </div>
             
             
             </h1>
             
            
             })}
             <button className="newoffice" > مطب جدید </button>
             
             </div> 
             </div>

            
        );
    }

}
