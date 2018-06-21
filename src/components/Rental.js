import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const RENTAL_URL = 'http://localhost:3000/rentals/';


class Rental extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      name: this.props.name,
      customerId: this.props.customerId,
      checkoutDate: this.props.checkoutDate,
      dueDate: this.props.dueDate,
      returned: this.props.returned
    };
  }

  onClickCheckin = () => {
    axios.post(`${RENTAL_URL}${this.state.title}/return/?customer_id=${this.state.customerId}`)
          .then((response) => {
            console.log(response);
            this.setState({ returned: true});
          })
          .catch((error) => {
            console.log(error);
            console.log(error.message);
          });
};

  render() {
    const status = this.state.returned ? "Returned" : "Checked-Out";
    const checkinButton = <Button variant="raised" color="primary" onClick={() => this.onClickCheckin()}>Return rental</Button>;
    return (
        <section className="one-rental-section">
          <h4>{this.state.title}</h4>
          <p>Checked-out by: {this.state.name}</p>
          <p>Status: {status}</p>

          {checkinButton}
        </section>
    );
  }
}

export default Rental;

Rental.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  customerId: PropTypes.number.isRequired,
  checkoutDate: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  returned: PropTypes.bool.isRequired,
};