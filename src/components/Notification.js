import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Button from "@material-ui/core/es/Button/Button";
import Grid from "@material-ui/core/es/Grid/Grid";
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar";

// const styles = theme => ({
//   close: {
//     width: theme.spacing.unit * 4,
//     height: theme.spacing.unit * 4,
//   },
// });
class Notification extends Component {
  state = {
    open: false,
  };

  // handleClick = () => {
  //   this.setState({ open: true });
  // };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };



  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isActive: false,
  //   };
  // }
  //
  // showNotification = () => {
  //   console.log("foo");
  //   // var x = [];
  //   // x[place] = true;
  //   this.setState({isActive: true});
  //   setTimeout(
  //       function() {
  //         x[place] = false;
  //         this.setState({isActive: false});
  //       }.bind(this),
  //       6000
  //   );
  // }




  render() {




    return (
        <section>
        {/*<Grid container justify="center">*/}
          {/*<Grid item xs={12} sm={12} md={10} lg={8}>*/}
            {/*<Grid container>*/}
              {/*<Grid item xs={12} sm={12} md={4}>*/}
               {/**/}
                {/*<Snackbar*/}
                    {/*place="tc"*/}
                    {/*color="info"*/}
                    {/*// icon={AddAlert}*/}
                    {/*message={this.props.notificationMessage}*/}
                    {/*open={this.state.tc}*/}
                    {/*closeNotification={() => this.setState({ tc: false })}*/}
                    {/*close*/}
                {/*/>*/}

          <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={true}
              autoHideDuration={6000}
              onClose={this.handleClose}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">{this.props.notificationMessage}</span>}
              />

        </section>

    );
  }
}

export default Notification;

Notification.propTypes = {
  notificationMessage: PropTypes.string.isRequired,
  // buttonText: PropTypes.string.isRequired,
};
