import React, { Component } from 'react';
import axios from 'axios';

// this is a stateless component for customer
const Customer = (props) => {
  return (
    <section key={props.id}>
      <li>{props.name}</li>
      <button onClick={() => {props.customerButtonHandler(props.id, props.name)} }> Add to rental </button>
    </section>)
}

class Customers extends Component {
  constructor() {
    super();

    this.state = {
      customersList: [],
    };
  }

  componentDidMount = () => {
    console.log('Component did mount was called');
    axios.get(`http://localhost:3000/customers/`)

        .then((response) => {
          console.log(response.data);
          this.setState({ customersList: response.data });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ error: error.message });
        });

  };

  // this is a callback that goes to app to add the customer to the app's state
  addCustomerCallback = (rentalID, rentalName) => {
    this.props.addCustomerToRental(rentalID, rentalName)
  }

  renderCustomersList = () => {
    return this.state.customersList.map((customerInfo) =>
      <Customer name={customerInfo.name} id={customerInfo.id} customerButtonHandler={this.addCustomerCallback}/>
    );
  };

  render() {


    return (
      <section className="customer-section">
        <h3>Customers List</h3>
        <ul>{this.renderCustomersList()}</ul>
      </section>
    );
  }
}

export default Customers;
