import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom'



class Customer extends Component {




  render() {


    return (
         <p>{this.props.name}</p>

    );
  }
}


export default Customer;


Customer.propTypes = {
  name: PropTypes.string.isRequired
};
