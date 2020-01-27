import React, { Component } from 'react';
import './App.css';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Nothing from './components/Nothing.js';
import Header from './components/Header.js';
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { history } from './helpers';
import { alertActions } from './actions';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  constructor(props) {
    super(props);
    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  render() {
    return (
      <div className="App">
        <Header currentUser={this.props.user}/>
        <div id="content">
          <Switch>
            <Route exact path="/">
              <h2>Home</h2>
            </Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route component={Nothing} />
          </Switch>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { alert, authentication } = state;
  let user = null;
  if (authentication.user !== undefined)
    user = authentication.user.user;
  return { alert, user};
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export default connectedApp;