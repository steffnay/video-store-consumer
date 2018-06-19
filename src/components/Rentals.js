import React, { Component } from 'react';
import axios from 'axios';

class Rentals extends Component {
  constructor() {
    super();

    this.state = {
      rentalsList: [],
    };
  }


  componentDidMount = () => {
    console.log('Component did mount was called');
    axios.get(`http://localhost:4000/rentals/`)
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
    return this.state.rentalsList.map((rentalInfo) => <li key={rentalInfo.id}>{rentalInfo.name}</li>);
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
