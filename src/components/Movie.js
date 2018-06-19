import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'



class Movie extends Component {

  render() {

    return (
      <section>
        <p>{this.props.title}</p>
      </section>

    );
  }
}

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
};
export default Movie;
