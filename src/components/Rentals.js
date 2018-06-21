import React, { Component } from 'react';
import axios from 'axios';
import Switch from '@material-ui/core/Switch';

import Rental from "./Rental";


const RENTAL_URL = 'http://localhost:3000/rentals/';

class Rentals extends Component {
  constructor() {
    super();

    this.state = {
      rentalsList: [],
      onlyOverdue: false,
      // checkedA: true,
      checkedB: false,
    };
  }

  switchFilter = () => {
    console.log(this.state.onlyOverdue);
    const onlyOverdue = !this.state.onlyOverdue
    this.setState({onlyOverdue, });
    console.log(this.state.onlyOverdue);
    this.callApi();
  };

  // handleChange = (event) => {
  //   this.setState({ [name]: event.target.checked });
  // };

  getUrl = () => { return this.state.checkedB ? `${RENTAL_URL}overdue/` : RENTAL_URL };

  callApi = () => {
    console.log('Rental API called');
    axios.get(this.getUrl())
        .then((response) => this.setState({ rentalsList: response.data }))
        .catch((error) => {
          console.log(error);
          this.setState({ error: error.message });
        });
  };


  handleChange = name => event => {
    console.log(this.state.checkedB);
    this.setState({ [name]: event.target.checked });
    this.callApi();

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

    // const filterButton = <button onClick={() => this.switchFilter()}>{this.state.onlyOverdue.toString()}</button>;

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
          <Switch
              checked={this.state.checkedB}
              onChange={this.handleChange('checkedB')}
              value="checkedB"
              color="primary"
              // checked={this.state.onlyOverdue}
              // onChange={this.switchFilter}
              // value={false}
          />
          {renderRentalsList()}
        </section>
    );
  }
}

export default Rentals;
