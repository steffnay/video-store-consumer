import React, { Component } from 'react';
import SearchForm from './SearchForm'
import Movie from './Movie'
import axios from 'axios';



import Notification from "./Notification";


import Paper from '@material-ui/core/Paper';


class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      message:'',
    };
  }

  addMovieToInventory = (movieData) => {
    axios.post('http://localhost:3000/movies', movieData)
     .then((response) => {
       console.log(response);
       this.setState({message: `${response.data.title} added to inventory.`})
       // showMessage(this.state.message);
     })
     .catch((error) => {
       console.log(error);
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


  // showMessage = (message) => {
  //   console.log("shit is fucked");
  //   // if (this.state.message) {
  //   return <Notification notificationMessage={message} />;
  //
  //   // const thisMessage = <Notification notificationMessage={this.state.message} />;
  //   //  return thisMessage;
  //  // }
  // };

  showMessage = () => {
    if (this.state.message) {
     return (this.state.message)
   }
  }


  render() {

    const showMessage = (message) => {
      console.log("shit is fucked");
      // if (this.state.message) {
      // return <div>{this.state.message}</div>;


      return <Notification notificationMessage={message} />;

      // const thisMessage = <Notification notificationMessage={this.state.message} />;
      //  return thisMessage;
      // }
    };
    // const showMessage = (message) => {
    //   // if (this.state.message) {
    //   const thisMessage = <Notification notificationMessage={message} />;
    //
    //   // const thisMessage = <Notification notificationMessage={this.state.message} />;
    //   return thisMessage;
    //   // }
    // };

    return (
      <section className="movie-search">
        {showMessage(this.state.message)}
        {/*{<Notification notificationMessage={this.state.message} />}*/}
        <Paper>
          <SearchForm searchCallback={this.movieSearch} />
        </Paper>
        {this.state.results}
      </section>
    );
  }
}

export default Search;
