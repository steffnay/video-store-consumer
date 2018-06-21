import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Movie.css';

import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import Grid from "@material-ui/core/es/Grid/Grid";
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";



class Movie extends Component {

  handleClick = () => {
    this.props.addMovieCallback({
      title: this.props.title,
      image_url: this.props.imageUrl,
      release_date: this.props.releaseDate,
      overview: this.props.overview,
      external_id: this.props.externalId
    })
  }

  render() {
    return (
        <Grid item xs={12}>
          <div>
            <Card className="foo"
                  style={{ display: 'inline-flex' }}>
              <section className="details">
                <CardContent className="content">

                  <Typography variant="headline">{this.props.title}</Typography>
                  <Typography variant="subheading" color="textSecondary">
                      <p>Overview: {this.props.overview}</p>
                      <p>Release Date:{this.props.releaseDate}</p>
                  </Typography>
                </CardContent>
                <div className="controls">
                  <button onClick={this.handleClick}>Add to Inventory</button>
                  {/*<IconButton aria-label="Play/pause">*/}
                  {/*<PlayArrowIcon className={classes.playIcon} />*/}
                  {/*</IconButton>*/}

                </div>

              {/*<h3>{this.props.title}</h3>*/}
                  {/*<p><img src={this.props.imageUrl} alt="movie cover"/></p>*/}
              {/*<p>{this.props.overview}</p>*/}
              {/*<p>{this.props.releaseDate}</p>*/}
                {/*<button onClick={this.handleClick}>Add to Inventory</button>*/}
              </section>
              <CardMedia
                className="cover"

                title="movie cover"

            >
                <img src={this.props.imageUrl} />
              </CardMedia>

            </Card>
          </div>
        </Grid>
    );
  }
}

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  addMovieCallback: PropTypes.func,
  externalId: PropTypes.number.isRequired,
};
export default Movie;
