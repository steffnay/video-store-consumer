import React, { Component } from 'react';
import axios from 'axios';

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

  renderLibraryList = () => {
    return this.state.libraryList.map((libraryMovie) =>
        <section>
          <h4>{libraryMovie.title}</h4>
          <p>Inventory: {libraryMovie.inventory}</p>
          <p>Release date: {libraryMovie.release_date}</p>
          <p>Overview: {libraryMovie.overview}</p>
    </section>);
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


