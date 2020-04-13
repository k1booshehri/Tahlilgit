import React, { Component } from "react";
import Drofficedata from '../pages/officedata/officedata.json'


export default class OfficeList extends Component {
   
  /* constructor(props){
       super(props);
       this.state = {
           
           'OfficeList' : []
       }
   } 
 componentDidMount (){
       this.getItems();

   }
   getItems(){
       fetch('')
       .then(results =>results.json())
       .then(results => this.setState({'OfficeList' : results}))
   } */
 
 
   render() {
        return (
             <div >
                 
                 <div >
                 { Drofficedata.map((postdetail , index)=> {
                return <h1 >
                 
             <div className = "Drofficecard">
           
           
       
        <div >
        <div> {postdetail.building_name}</div>
        </div>
        <div>
         
          <div className = "titleOffice">
          {postdetail.building_adress}
          </div>
          </div>
         <button className="locationbutton" variant="primary">location</button>

         
             
             </div>
             
             
             </h1>
             
            
             })}
             <button className="newoffice" > مطب جدید </button>
             
             </div> 
             </div>

            
        );
    }

}
