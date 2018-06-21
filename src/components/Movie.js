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
import Paper from "@material-ui/core/es/Paper/Paper";
import Button from '@material-ui/core/Button';


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

    const addButton = <Button variant="raised" color="primary" onClick={() => this.handleClick()}>Add to Inventory</Button>;


    return (
        <Grid item xs={12}>
          {/*<Paper className="outer-paper">*/}
            <Card className="foo"
                  >
              <section className="details">
                <CardContent className="content">

                  <Typography variant="headline">{this.props.title}</Typography>
                  <Typography variant="subheading"
                              color="textSecondary"
                              className="big-text">
                    <p>Overview: {this.props.overview}</p>
                    <p>Release Date:{this.props.releaseDate}</p>
                  </Typography>
                  <div className="controls">
                    {addButton}
                    {/*<IconButton aria-label="Play/pause">*/}
                    {/*<PlayArrowIcon className={classes.playIcon} />*/}
                    {/*</IconButton>*/}

                  </div>
                </CardContent>


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
          {/*</Paper>*/}
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
