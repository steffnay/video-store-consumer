import React, { Component } from 'react';
import axios from 'axios';
import Rental from "./Rental";

const RENTAL_URL = 'http://localhost:3000/rentals/';

class Rentals extends Component {
  constructor() {
    super();

    this.state = {
      rentalsList: [],
      onlyOverdue: false
    };
  }

  switchFilter = () => {
    this.setState({onlyOverdue: !this.state.onlyOverdue});
    this.callApi();

  };

  getUrl = () => { return this.state.onlyOverdue ? `${RENTAL_URL}overdue/` : RENTAL_URL };

  callApi = () => {
    console.log('Component did mount was called');
    axios.get(this.getUrl())
        .then((response) => {
          console.log(response.data);
          this.setState({ rentalsList: response.data });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ error: error.message });
        });
  };

  componentDidMount = () => {
    this.callApi();
    // console.log('Component did mount was called');
    // axios.get(this.getUrl())
    //     .then((response) => {
    //       console.log(response.data);
    //       this.setState({ rentalsList: response.data });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       this.setState({ error: error.message });
    //     });
  };

  render() {

    const filterButton = <button onClick={() => this.switchFilter()}>{this.state.onlyOverdue.toString()}</button>;

    const renderRentalsList = () => { return this.state.rentalsList.map((rentalInfo) =>
        <article>
          <Rental key={rentalInfo.id}
                  title={rentalInfo.title}
                  customerId={rentalInfo.customer_id}
                  name={rentalInfo.name}
                  checkoutDate={rentalInfo.checkout_date}
                  dueDate={rentalInfo.due_date}
                  returned={rentalInfo.returned}
          />
      </article>);
    };

    return (
        <section className="rentals-section">
          <h3>Rentals List</h3>
          {filterButton}
          {renderRentalsList()}
        </section>
    );
  }
}

export default Rentals;
