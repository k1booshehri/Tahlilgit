import React, { Component } from "react";


import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';

export default class DrRating extends Component {
constructor() {
    super();
 
    this.state = {
      rating: 1
    };
  }
 
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }
  handleRatingChange(value) {
    console.log(value);
    //here set your state for rating
}
 
  render() {
    const { rating } = this.state;
    
    return (                
      <div>
        <h2>Rating from state: {rating}</h2>
        <Rating 
          name="rate1" 
          starCount={10}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
          onChange={this.handleRatingChange} 
        />
      </div>
    );
  }
}