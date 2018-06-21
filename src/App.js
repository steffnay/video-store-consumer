import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import './App.css';
import Search from './components/Search'
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import Library from "./components/Library";

import LinkToButton from "./components/LinkToButton";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';




class App extends Component {
  constructor() {
    super();

    this.state = {
      rentalCustomerID: 70,
      rentalCustomerName: 'None Selected',
      rentalMovieTitle: 'None Selected',
      message:''
    };
  }

  // axios call for creating rental when button is clicked
  makeNewRental = () => {
    const encodedUri = encodeURI(this.state.rentalMovieTitle)

    let dt = new Date();
    dt.setDate(dt.getDate() + 7);
    const today = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();

    axios.post(`http://localhost:3000/rentals/${encodedUri}/check-out?customer_id=${this.state.rentalCustomerID}&due_date=${today}`)
     .then((response) => {
       this.setState({message: `This rental is due: ${response.data.due_date}`})
     })
     .catch((error) => {
       console.log(error)
       this.setState({ message: error.message });
     });

     this.clearRentalForm()
  }

  clearRentalForm = () => {
    this.setState({
      rentalCustomerID: 70,
      rentalCustomerName: 'None Selected',
      rentalMovieTitle: 'None Selected',
    });
  }
  addCustomer = (id, name) => {
    this.setState({ rentalCustomerID: id });
    this.setState({ rentalCustomerName: name});
  }

  addMovie = (title) => {
    this.setState({ rentalMovieTitle: title });
  }

  render() {

    const home = () => {
      return <p></p>;
    };

    const StatelessCustomer = (props) => {
      return <span><strong>Customer:</strong> {props.name}  </span>;
    }

    const StatelessMovie = (props) => {
      return <span><strong>Movie:</strong> {props.title}  </span>;
    }

    const StatelessButton = (props) => {
      return <span><button onClick={props.handleClick}> Make Rental</button></span>;
    }


    return (
        <React.Fragment>
          <CssBaseline />
        <Router>
          <section className='body-section background'>
          <div>
          <AppBar position="static" color="default">
           <Toolbar>

             <section>
               <LinkToButton toLink='/' buttonText='Home'className="ok"/>
               <LinkToButton toLink='/search' buttonText='Search'/>
               <LinkToButton toLink='/library' buttonText='Library'/>
               <LinkToButton toLink='/customers' buttonText='Customers'/>
               <LinkToButton toLink='/rentals' buttonText='Rentals'/>
              </section>
              

              <section>
                <StatelessCustomer name={this.state.rentalCustomerName} />
                <StatelessMovie title={this.state.rentalMovieTitle} />
                <StatelessButton handleClick={this.makeNewRental} />
              </section>
           </Toolbar>
          </AppBar>

          <center><img src={'https://preview.ibb.co/n6pjXy/blockbusted.png'} alt="blockbusted logo"/></center>
            {this.state.message}

            <section>
              <Grid container justify="center" spacing={8}>
                <Grid item xs={9}>

                  <Route exact path="/" component={home}/>
                  <Route path="/search" component={Search}/>
                  <Route path="/library" render={()=><Library addMovieToRental={this.addMovie}/>}/>
                  <Route path="/rentals" component={Rentals}/>
                  <Route path="/customers" render={()=><Customers addCustomerToRental={this.addCustomer}/>}/>
                </Grid>
              </Grid>
            </section>
          </div>
        </section>
        </Router>
        </React.Fragment>
    );
  }
}

export default App;
