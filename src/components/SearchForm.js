import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import '../App.css';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/es/Grid/Grid";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };
  }


  onFieldChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const updateState = {};

    updateState[fieldName] = fieldValue;
    this.setState(updateState);
    console.log(this.state.text)
  };

  onFormSubmit = (event) => {
    event.preventDefault();

    this.props.searchCallback(this.state.text);
    this.clearForm();
  };

  clearForm = () => {
    this.setState({
      text: '',
    });
  };


  render() {


    const searchButton = <Button variant="raised" type="submit" color="secondary" id="search">Search</Button>;

    return (
      <section>
        <h2>Find Movie</h2>
        <Grid container className="demo" justify="center" spacing={8} id="container">

          <form className="movie-search-form__form" onSubmit={this.onFormSubmit}>
            <TextField
              onChange={this.onFieldChange}
              name="text"
              label="Title"
              id="margin-normal"
              value={this.state.text}
              id="textField"
              margin="normal"
            />
            {searchButton}
          </form>
        </Grid>
      </section>
    );
  }
}

export default SearchForm;
