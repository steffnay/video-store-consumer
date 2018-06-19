import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

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
    axios.post(`http://localhost:3000/rentals/${this.state.title}/return/?customer_id=${this.state.customerId}`)
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
    const checkinButton = <button onClick={() => this.onClickCheckin()}>Return rental</button>;
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