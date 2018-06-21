import React, { Component } from 'react';
import './Search.css';

import SearchForm from './SearchForm'
import Movie from './Movie'
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Grid from "@material-ui/core/es/Grid/Grid";
import Paper from "@material-ui/core/es/Paper/Paper";


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
  };

  movieSearch = (title) => {
    const BASE_URL = 'http://localhost:3000/movies?query=';

    axios.get(`${BASE_URL}${title}`)
    .then((response) => {
      console.log('Rendering Movie List');
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
      });

      this.setState({
        results: movieList,
      });
    })
     .catch((error) => {
       this.setState({ message: error.message });
    });

  };

  showMessage = () => {
    if (this.state.message) {
     return (this.state.message)
   }
  };

  render() {

    return (
      <section className="movie-search">
        <p>{this.showMessage()}</p>
        <Paper>
        <SearchForm searchCallback={this.movieSearch} />
        </Paper>
        <Grid container justify="center" spacing={8}>

        {this.state.results}
        </Grid>
      </section>
    );
  }
}

export default Search;
