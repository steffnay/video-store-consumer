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
      message:'',
    };
  }

  addMovieToInventory = (movieData) => {
    axios.post('http://localhost:3000/movies', movieData)
     .then((response) => {
       console.log(response)
       this.setState({message: `${response.data.title} added to inventory.`})
     })
     .catch((error) => {
       console.log(error)
       this.setState({ message: error.message });
     });
  }

  movieSearch = (title) => {
    const BASE_URL = 'http://localhost:3000/movies?query='

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

      this.setState({
        results: movieList,
      });
    })
     .catch((error) => {
       this.setState({ message: error.message });
    });

  }

  showMessage = () => {
    if (this.state.message) {
     return (this.state.message)
   }
  }

  render() {

    return (
      <section className="movie-search">
        <p>{this.showMessage()}</p>
        <SearchForm searchCallback={this.movieSearch} />
        {this.state.results}
      </section>
    );
  }
}

export default Search;
