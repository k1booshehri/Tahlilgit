import React, { Component } from "react";
import { Link } from "react-router-dom";


import { HashRouter as Router, Route, NavLink } from "react-router-dom";

export default class Notif extends Component {
    constructor(props) {
        super(props);
        this.state = {
          Notifs: [],
        };
        this.notifonclick = this.notifonclick.bind(this);
        this.redirectnotifs = this.redirectnotifs.bind(this);
    }
    notifonclick(){
        this.state.Notifs =[];

    }

    componentDidMount() {
        
        this.interval = setInterval(() => {
           this.getItems();
          }, 1000);

          localStorage.setItem("notificatians" , null)
      }

      redirectnotifs(e){
      
        this.props.updateState(e);

      }
      
      componentWillUnmount() {
        clearInterval(this.interval);
      }
      
      getItems(){
       
       
          fetch("http://localhost:8000/api/notifget", {
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
            .then((res)=>{
                this.props.data.updatenotif(res);
              })
        
           
            .catch((error) => console.error("Error:", error));
        
      }

      parsingInformation(res) {
        var information = res;
       
        if(Object.entries(information.notifs).length !== 0){
      this.state.Notifs.push(information.notifs);
       console.log(this.state.Notifs);}
    
        
      }
      
  
      render(){
        return(

            <div className="notifs">
                {Object.keys(this.state.Notifs).map((key) => {
            return (
                
                this.state.Notifs[key].map((val, index) => {
            return (
                  <div>

          {val.notiftype=== "1" ? (
            
         
            
            <div className="notif1" >
                im a notification :))) 
            </div>
           

          ):( val.notiftype=== "2" ? (
            <div className="notif2" >
           
           im another notification :)
            </div>

            ) : ( val.notiftype=== "3" ? (
      
              <div className="notif3" onClick={this.redirectnotifs}   id="5"  >
               
               im another :)
                </div>
             
                ) : (
                
                    <div className="notif4" >
           
                    and another another :)
                     </div>
             
                ) 
         
         )   ) }
           
         </div>

           
        );
          })
          );
})}
         <button type="button" class="btn btn-secondary clearbutton" onClick={this.notifonclick}>Clear</button>

 </div>
       )
    }


}






