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

  addMovieToInventory = (movieData) => {
    console.log('hello')
    console.log(movieData)
    axios.post('http://localhost:3000/movies', movieData)
     .then((response) => {

       console.log(response)
     })
     .catch((error) => {
       this.setState({ error: error.message });
     });
  }

  movieSearch = (title) => {
  console.log('yay');
  console.log(title);

    const BASE_URL = 'http://localhost:3000/movies?query='
    console.log(`${BASE_URL}${title}`)
    axios.get(`${BASE_URL}${title}`)
    .then((response) => {
      console.log('Rendering Movie List')


        const movieList = response.data.map((result, index) => {
        return (
          <Movie
            title={result.title}
            overview={result.overview}
            releaseDate={result.release_date}
            imageUrl={result.image_url}
            key={index}
            externalId={result.external_id}
            addMovieCallback={this.addMovieToInventory}
          />
        )
      })
      console.log('setting state');
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
