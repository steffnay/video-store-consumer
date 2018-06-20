import React, { Component } from 'react';
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


class App extends Component {
  constructor() {
    super();

    this.state = {
      rentalCustomerID: 70,
      rentalCustomerName: '',
      rentalMovieTitle: '',
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
      rentalCustomerName: '',
      rentalMovieTitle: '',
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
      return (<p>Welcome!</p>);
    };

    const StatelessCustomer = (props) => {
      return <h4>Customer: {props.name}</h4>;
    }

    const StatelessMovie = (props) => {
      return <h4>Movie: {props.title}</h4>;
    }

    const StatelessButton = (props) => {
      return <button onClick={props.handleClick}> Make Rental</button>
    }

    return (
        <Router>
          <div>
            <img src={'https://preview.ibb.co/n6pjXy/blockbusted.png'} alt="blockbusted logo"/>
            {this.state.message}
            <span>
              <p>New Rental</p>
              <StatelessCustomer name={this.state.rentalCustomerName} />
              <StatelessMovie title={this.state.rentalMovieTitle} />
              <StatelessButton handleClick={this.makeNewRental} />
            </span>
            <section>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/library">Library</Link></li>
              <li><Link to="/customers">Customers</Link></li>
              <li><Link to="/rentals">Rentals</Link></li>
            </ul>

              <hr/>

              <Route exact path="/" component={home}/>
              <Route path="/search" component={Search}/>
              <Route path="/library" render={()=><Library addMovieToRental={this.addMovie}/>}/>
              <Route path="/rentals" component={Rentals}/>
              <Route path="/customers" render={()=><Customers addCustomerToRental={this.addCustomer}/>}/>
            </section>
          </div>

        </Router>
    );
  }
}

export default App;
