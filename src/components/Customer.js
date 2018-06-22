import React, { Component } from 'react';
import PropTypes from 'prop-types';




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
