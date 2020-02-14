import React, { Component } from 'react';
import './App.css';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Algorithm from './components/Algorithm.js';
import Profile from './components/Profile.js';
import Nothing from './components/Nothing.js';
import Header from './components/Header.js';
import Home from './components/Home.js';
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { history } from './helpers';
import { alertActions, userActions, algorithmActions } from './actions';
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
              <Home />
            </Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route key="default-algorithm" exact path="/algorithm" component={Algorithm}></Route>
            <Route key="custom-algorithm" exact path="/algorithm/:name" component={Algorithm}></Route>
            <Route exact path="/user/:username" component={Profile}></Route>
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
  const { codeList } = state.algorithm;
  return { alert, user, codeList};
}

const actionCreators = {
  clearAlerts: alertActions.clear,
  logout: userActions.logout,
  list: algorithmActions.list
};

const connectedApp = connect(mapState, actionCreators)(App);
export default connectedApp;