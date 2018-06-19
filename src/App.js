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
      rentalMovieTitle: 'psycho',
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
       console.log(response)
       console.log('********')
       this.setState({message: `This rental is due: ${response.data.due_date}`})
     })
     .catch((error) => {
       console.log(error)
       this.setState({ message: error.message });
     });
  }


  addCustomer = (id, name) => {
    this.setState({ rentalCustomerID: id });
    this.setState({ rentalCustomerName: name});
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
            <img src={'https://preview.ibb.co/n6pjXy/blockbusted.png'} alt="blockbusted logo"/>
            {this.state.message}
            <span>
              <StatelessCustomer name={this.state.rentalCustomerName} />
              <StatelessMovie title={this.state.rentalMovieTitle} />
              <StatelessButton handleClick={this.makeNewRental} />
            </span>
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
            </section>
          </div>
        </Router>
    );
  }
}

export default App;
