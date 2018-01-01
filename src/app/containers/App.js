import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import reduxConnectProps from '../utils/redux-connect-props';

@connect(store => ({
}))
class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <h1>Crypto Clash</h1>
      // Routes will go in here as well
    );
  }
}

export default withRouter(reduxConnectProps(App));
