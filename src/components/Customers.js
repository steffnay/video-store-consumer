import React, { Component } from 'react';
import axios from 'axios';

import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import Grid from "@material-ui/core/es/Grid/Grid";
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

// this is a stateless component for customer
const Customer = (props) => {
  const addButton = <Button variant="raised" color="primary" onClick={() => props.customerButtonHandler(props.title)}>Add to Rental</Button>;

  return (
    <Grid item xs={12}>
      <Card className="foo">
        <section className="details">
          <CardContent className="content">
            <Typography variant="headline">{props.name}</Typography>
            <Typography variant="subheading" color="textSecondary" className="big-text">
              <p><strong>Member Since:</strong> {props.registered}</p>
              <p><strong>Address:</strong> {props.address} {props.city} {props.state} {props.zip}</p>
              <p><strong>Phone:</strong> {props.phone} </p>
              <p><strong>Customer Credit:</strong> {props.credit} </p>
              <p><strong>Movies Checked Out:</strong> {props.checked_out} </p>
            </Typography>
            <div className="controls">
              {addButton}
            </div>
          </CardContent>
        </section>
      </Card>
    </Grid>
  );
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
    return this.state.customersList.map((customerInfo, index) =>
      <Customer key={index} name={customerInfo.name} id={customerInfo.id}
      customerButtonHandler={this.addCustomerCallback} registered={customerInfo.registered_at} address={customerInfo.address} city={customerInfo.city} state={customerInfo.state} zip={customerInfo.postal_code} phone={customerInfo.phone} credit={customerInfo.account_credit} checked_out={customerInfo.movies_checked_out_count}/>
    );
  };
  render() {


    return (
      <section className="customer-section">
        <Paper>
        <h2>Customers List</h2>
        {this.renderCustomersList()}
        </Paper>
      </section>
    );
  }
}

export default Customers;
