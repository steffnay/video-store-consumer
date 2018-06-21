import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Library from "./Library";
import Button from "@material-ui/core/es/Button/Button";


class LinkToButton extends Component {
  renderLink = itemProps => <Link to={this.props.toLink} {...itemProps} />;

  render() {
    const { toLink, buttonText } = this.props;
    return (
      // const LinkToButton = ({ text, toLink }) => (
      <Button variant="contained" color="primary" component={this.renderLink}>
        {buttonText}
      </Button>
  );
  }
}

export default LinkToButton;

LinkToButton.propTypes = {
  toLink: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};
