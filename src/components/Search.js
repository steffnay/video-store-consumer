import React, { Component } from 'react';
import SearchForm from './SearchForm'
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
      results: '',
    };
  }

  movieSearch = (title) => {
  console.log('yay')
  console.log(title)

    const BASE_URL = 'http://localhost:3000/movies?query='
    console.log(`${BASE_URL}${title}`)
    axios.get(`${BASE_URL}${title}`)
    .then((response) => {
      console.log(response)
    })
     .catch((error) => {
       this.setState({ error: error.message });
    });
  }

  renderMovieList = () => {
    console.log('Rendering Movie List')
    const movieList = this.state.results.map((result, index) => {
      return (
        <Movie
          id={result.external_id}
          key={index}
          text={card.card.text}
          emoji={card.card.emoji}
          deleteThisCard={this.deleteCard}
        />
      )
    })
    console.log(cardList)
    return cardList;
  }

  render() {

    return (
      <section className="movie-search">
        <SearchForm searchCallback={this.movieSearch} />
        {this.renderMovieList()}
      </section>
    );
  }
}

export default Search;
