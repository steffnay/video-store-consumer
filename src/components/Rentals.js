import React, { Component } from 'react';
import axios from 'axios';
import Rental from "./Rental";

class Rentals extends Component {
  constructor() {
    super();

    this.state = {
      rentalsList: [],
    };
  }


  componentDidMount = () => {
    console.log('Component did mount was called');
    axios.get(`http://localhost:3000/rentals/`)
        .then((response) => {
          console.log(response.data);
          this.setState({ rentalsList: response.data });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ error: error.message });
        });
  };

  renderRentalsList = () => {
    console.log(this.state.rentalsList);
    return this.state.rentalsList.map((rentalInfo) => <li key={rentalInfo.id}>
                                                        <Rental title={rentalInfo.title}
                                                                customerId={rentalInfo.customer_id}
                                                                name={rentalInfo.name}
                                                                checkoutDate={rentalInfo.checkout_date}
                                                                dueDate={rentalInfo.due_date}
                                                                returned={rentalInfo.returned}
                                                        />
                                                      </li>);
  };

  render() {

    return (
        <section className="rentals-section">
          <h3>Rentals List</h3>
          <ul>{this.renderRentalsList()}</ul>
        </section>
    );
  }
}

export default Rentals;
