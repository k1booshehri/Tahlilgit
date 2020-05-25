import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./App.scss";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/sass/styles.scss";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
