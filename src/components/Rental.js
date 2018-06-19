import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Movie from "./Movie";

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
    // if (this.state.returned) { throw Error }
    axios.post(`http://localhost:3000/rentals/${this.state.name}/return`, {title: this.state.title, customer_id: this.state.customerId})//{title: this.state.title, customer_id: this.state.customerId})
          .then((response) => {
            console.log(response.data);
            // this.setState({ rentalsList: this.state.rentalsList});
          })
          .catch((error) => {
            console.log(error);

            console.log(error.message);
            // error.message
            // this.setState({ error: error.message });
          });

};



  // checkinCallback = (custome) => {
  //   let rental =  this.state.rentalsList[index];
  //   axios.post(`http://localhost:3000/rentals/`, {title: rental.title, customer_id: rental.customer_id})
  //       .then((response) => {
  //         console.log(response.data);
  //         this.setState({ rentalsList: this.state.rentalsList});
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         this.setState({ error: error.message });
  //       });
  //
  //
  //   // if (this.props.returned) { throw Error }
  // };
// <button onClick={() => this.onClickCheckin()}>Return rental</button>



  render() {
    const status = this.props.returned ? "Returned" : "Checked-Out";
    const checkinButton = <button onClick={() => this.onClickCheckin()}>Return rental</button>;
  // const checkinButton = if (this.props.returned) { <button onClick={}></button>}
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