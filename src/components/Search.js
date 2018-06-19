import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchForm from './SearchForm'
import Movie from './Movie'
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class Search extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
    };
  }

  movieSearch = (title) => {
  console.log('yay')
  console.log(title)

    const BASE_URL = 'http://localhost:3000/movies?query='
    console.log(`${BASE_URL}${title}`)
    axios.get(`${BASE_URL}${title}`)
    .then((response) => {
      console.log('Rendering Movie List')


        const movieList = response.data.map((result) => {
        return (
          <Movie
            title={result.title}
            overview={result.overview}
            release_date={result.release_date}
            image_url={result.image_url}
            key={result.external_id}
          />
        )
      })
      console.log('setting state')
      this.setState({
        results: movieList,
      });
    })
     .catch((error) => {
       this.setState({ error: error.message });
    });


  }

  render() {

    return (
      <section className="movie-search">
        <SearchForm searchCallback={this.movieSearch} />
        {this.state.results}
      </section>
    );
  }
}

export default Search;
