import React, { Component } from 'react';
import axios from 'axios';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Paper from "@material-ui/core/es/Paper/Paper";
import Rental from "./Rental";
import '../App.css';


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

  getOverdueUrl = () => { return this.state.checkedB ? `${RENTAL_URL}overdue/` : RENTAL_URL };

  callApiAll = () => {
    console.log('Rental API called');
    axios.get(RENTAL_URL)
        .then((response) => this.setState({ rentalsList: response.data }))
        .catch((error) => {
          console.log(error);
          this.setState({ error: error.message });
        });
  };

  callAPIOverdue = () => {
    console.log('Rental API called for overdue only');
    axios.get(`${RENTAL_URL}overdue/`)
      .then((response) => this.setState({ rentalsList: response.data }))
      .catch((error) => {
        console.log(error);
        this.setState({ error: error.message });
      });
  };



  handleChange = name => event => {
    console.log(this.state.checkedA);
    this.setState({ [name]: !event.target.checked });
    if (this.state.checkedA === true || this.state.checkedA == null) {
      this.callAPIOverdue();
    }
    else {
      this.callApiAll();
    }

  };

  componentDidMount = () => {
    this.callApiAll();
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

    const renderRentalsList = () => { return this.state.rentalsList.map((rentalInfo, index) =>
        <article key={index}>
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
          <Paper>
{/*<<<<<<< HEAD*/}
{/*//           <h3>Rentals List</h3>*/}
{/*//           <Switch*/}
{/*//               checked={this.state.checkedB}*/}
{/*//               onChange={this.handleChange('checkedB')}*/}
{/*//               value="checkedB"*/}
{/*//               color="primary"*/}
{/*//               // checked={this.state.onlyOverdue}*/}
{/*//               // onChange={this.switchFilter}*/}
{/*//               // value={false}*/}
{/*//           />*/}
{/*//           {renderRentalsList()}*/}
{/*// =======*/}
            <h2>Rentals List</h2>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                  checked={this.state.checkedA}
                  onChange={this.handleChange('checkedA')}
                  value="checkedB"
                  color="primary"
                  // checked={this.state.onlyOverdue}
                  // onChange={this.switchFilter}
                  // value={false}
                  />
                }
                label="Only Overdue"
              />
            </FormGroup>
            {renderRentalsList()}
          </Paper>
        </section>
    );
  }
}

export default Rentals;
