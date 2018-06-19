import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'



class Movie extends Component {

  handleClick = () => {
    this.props.addMovieCallback({
      title: this.props.title,
      image_url: this.props.imageUrl,
      release_date: this.props.releaseDate,
      overview: this.props.overview,
      external_id: this.props.externalId
    })
  }

  render() {

    return (
      <section>
        <h3>{this.props.title}</h3>
        <p><img src={this.props.imageUrl} alt="movie cover"/></p>
        <p>{this.props.overview}</p>
        <p>{this.props.releaseDate}</p>

        <button onClick={this.handleClick}>Add to Inventory</button>

      </section>
    );
  }
}

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  addMovieCallback: PropTypes.func,
  externalId: PropTypes.number.isRequired,
};

export default Movie;
