import React, { Component } from 'react';
import axios from 'axios';

const LibraryMovie = (props) => {
  return (
    <section key={props.key}>
      <img src={props.img} alt="movie cover" />
      <h3>{props.title}</h3>
      <p>Overview: {props.overview}</p>
      <p>Release Date: {props.release}</p>
      <button onClick={() => {props.movieButtonHandler(props.title)} }> Add to rental </button>
    </section>)
};


class Library extends Component {
  constructor() {
    super();

    this.state = {
      libraryList: [],
    };
  }

  componentDidMount = () => {
    console.log('Component did mount was called');
    axios.get('http://localhost:3000/movies/')
        .then((response) => {
          console.log(response.data);
          this.setState({ libraryList: response.data });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ error: error.message });
        });
  };

  addMovieCallback = (title) => {
    this.props.addMovieToRental(title);
  };


  renderLibraryList = () => {
    return this.state.libraryList.map((libraryMovie, index) =>
      <LibraryMovie key={index} title={libraryMovie.title} release={libraryMovie.release_date}
      overview={libraryMovie.overview} inventory={libraryMovie.inventory} img={libraryMovie.image_url}
      movieButtonHandler={this.addMovieCallback}/>
    );
  };


  render() {

    return (
        <section className="library-section">
          <h3>Library List</h3>
          <ul>{this.renderLibraryList()}</ul>
        </section>
    );
  }
}

export default Library;
