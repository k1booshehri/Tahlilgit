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
import StarRatingComponent from "react-star-rating-component";

export default class DrRating extends Component {
  constructor() {
    super();

    this.state = {
      rating: 0,
    };
    this.onStarClick = this.onStarClick.bind(this);
  }

  onStarClick(currentValue, oldValue, name) {
    this.setState({ rating: currentValue });
  }

  render() {
    return (
      <div>
        <h2>Rating from state: {this.state.rating}</h2>
        <StarRatingComponent
          name="rating"
          starCount={10}
          value={this.state.rating}
          onStarClick={this.onStarClick}
        />
      </div>
    );
  }
}
