import React, { Component } from 'react';
import axios from 'axios';

import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import Grid from "@material-ui/core/es/Grid/Grid";
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


const LibraryMovie = (props) => {
  const addButton = <Button variant="raised" color="primary" onClick={() => props.movieButtonHandler(props.title)}>Add to Rental</Button>;

  return (
    <Grid item xs={12}>
      <Card className="foo">
        <section className="details">
          <CardContent className="content">
            <Typography variant="headline">{props.title}</Typography>
            <Typography variant="subheading" color="textSecondary" className="big-text">
              <p><strong>Overview:</strong> {props.overview}</p>
              <p><strong>Release Date:</strong>{props.release}</p>
            </Typography>
            <div className="controls">
              {addButton}
            </div>
          </CardContent>
        </section>
        <CardMedia className="cover" title="movie cover">
          <img src={props.img} />
        </CardMedia>
      </Card>
    </Grid>
  );
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

    console.log(this.state.libraryList)
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
        <section className="movie-list">
          <Paper>
            <h2>Library List</h2>
            {this.renderLibraryList()}
          </Paper>
        </section>
    );
  }
}

export default Library;
