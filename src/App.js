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


class App extends Component {
  constructor() {
    super();

    this.state = {
      rentalCustomerID: 70,
      rentalCustomerName: 'Minnie Mouse ',
      rentalMovieTitle: 'Goofy Movie',
    };
  }

  makeNewRental = () => {
    const encodedUri = encodeURI(this.state.rentalMovieTitle)
    console.log(`http://localhost:3000/rentals/${encodedUri}/check-out?customer_id=${this.state.rentalCustomerID}`)

    // axios.post(`http://localhost:3000/rentals/${encodedUri}/check-out?customer_id=${customer}`)
    //  .then((response) => {
    //    console.log(response)
    //    this.setState({message: `${response.data.title} added to inventory.`})
    //  })
    //  .catch((error) => {
    //    console.log(error)
    //    this.setState({ message: error.message });
    //  });
  }

  addCustomer = (id) => {
    this.setState({ rentalCustomerID: id });
    console.log('yay')
    console.log(id)
  }

  render() {

    const home = () => {
      return (<p>Welcome!</p>);
    };

    const StatelessCustomer = (props) => {
      return <h3>Customer: {props.name}</h3>;
    }

    const StatelessMovie = (props) => {
      return <h3>Movie: {props.title}</h3>;
    }

    const StatelessButton = (props) => {
      return <button onClick={props.handleClick}> Make Rental</button>
    }

    return (
        <Router>
          <div>
            <nav>
              <StatelessCustomer name={this.state.rentalCustomerName} />
              <StatelessMovie title={this.state.rentalMovieTitle} />
              <StatelessButton handleClick={this.makeNewRental} />
            </nav>
            <section>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/search">Search</Link></li>
                {/*<li><Link to="/library">Library</Link></li>*/}
                <li><Link to="/customers">Customers</Link></li>
              </ul>

              <hr/>

              <Route exact path="/" component={home}/>
              <Route path="/search" component={Search}/>
              {/*<Route path="/library" component={Library}/>*/}
              <Route path="/customers" render={()=><Customers addCustomerToRental={this.addCustomer}/>}/>
              <Route path="/customers" component={Customers}/>
            </section>
          </div>
        </Router>
    );
  }
}

export default App;
