import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class SearchForm extends Component {
  constructor() {
    super();

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
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    this.props.searchCallback(this.state.text);
    this.clearForm();
  }

  clearForm = () => {
    this.setState({
      text: '',
    });
  }


  render() {

    return (
      <section className="movie-search">
        <h3 className="movie-search-form__header">Find Movie</h3>
        <form className="movie-search-form__form" onSubmit={this.onFormSubmit}>
          <div>
            <label htmlFor="text" className="movie-search-form__form-label">Title: </label>
            <input
              className="movie-search-form__form-textarea"
              name="text"
              value={this.state.text}
              type="text"
              onChange = {this.onFieldChange}
              />
          </div>

          <input type="submit" value="Search" className="movie-search-form__form-button" />
        </form>
      </section>
    );
  }
}

export default SearchForm;
