import React, { Component } from 'react';
import './App.css';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Nothing from './components/Nothing.js';
import { Route, Link, Switch } from "react-router-dom";
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
        <header className="App-header">
          <h1><Link to="/">
            Algorithms</Link>
          </h1>
          <ul id="nav">
            <li><h2><Link to="/">Home</Link></h2></li>
            <li><h2><Link to="/login">Login</Link></h2></li>
          </ul>
        </header>
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
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export default connectedApp;