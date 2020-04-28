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

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
    console.log(this.state.rating);
  }

  render() {
    const { rating } = this.state;

    return (
      <div>
        <h2>Rating from state: {rating}</h2>
        <StarRatingComponent
          name="rating"
          starCount={10}
          value={rating}
          onStarClick={this.onStarClick}
        />
      </div>
    );
  }
}
