import React, { Component } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import './App.css';
import Search from './components/Search'


class App extends Component {

  movieSearch = (title) => {
  console.log('yay')
  console.log(title)

    // axios.get('https://inspiration-board.herokuapp.com/boards/steffany/cards', cardInfo)
    //  .then((response) => {
    //
    //    this.componentDidMount()
    //  })
    //  .catch((error) => {
    //    this.setState({ error: error.message });
    //  });
  }

  render() {

    const home = () => {
      return (<p>Welcome!</p>);
    };


    return (
        <Router>
          <section>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/search">Search</Link></li>
              {/*<li><Link to="/library">Library</Link></li>*/}
              {/*<li><Link to="/customers">Customers</Link></li>*/}
            </ul>

            <hr/>

            <Route exact path="/" component={home}/>
            <Route path="/search" render={()=><Search searchCallback={this.movieSearch}/>}/>
            {/*<Route path="/library" component={Library}/>*/}
            {/*<Route path="/customers" component={Customers}/>*/}
          </section>
        </Router>
    );
  }
}

export default App;
