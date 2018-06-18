import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'



class Customers extends Component {

  customers = () => {
    let customersList = [];
    axios.get(`http://localhost:4000/customers/`)
        .then((response) => {
          const customersList = response.data.map(inputCard => inputCard.card);
        })
        .catch((error) => {
          console.log({ error: error.message});
        });

  };

  render() {

    const home = () => {
      return (<p>Welcome!</p>);
    };

    return (
        <Router>
          <section>
            <ul>
              <li><Link to="/">Home</Link></li>
              {/*<li><Link to="/search">Search</Link></li>*/}
              {/*<li><Link to="/library">Library</Link></li>*/}
              {/*<li><Link to="/customers">Customers</Link></li>*/}
            </ul>

            <hr/>

            <Route exact path="/" component={home}/>
            {/*<Route path="/search" component={Search}/>*/}
            {/*<Route path="/library" component={Library}/>*/}
            {/*<Route path="/customers" component={Customers}/>*/}
          </section>
        </Router>
    );
  }
}

export default App;



