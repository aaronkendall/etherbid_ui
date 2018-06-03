import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import reduxConnectProps from '../utils/redux-connect-props';

import Routes from '../components/Routes'

@connect(store => ({
}))
class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <main className="main-container">
        <Routes />
      </main>
    )
  }
}

export default withRouter(reduxConnectProps(App));
