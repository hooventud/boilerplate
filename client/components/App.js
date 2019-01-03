import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Main from './index';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={Main} />
        <Route path="/" component={SignIn} />
      </Switch>
    );
  }
}

export default withRouter(App);
