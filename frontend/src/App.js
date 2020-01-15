import React, {Component} from 'react';
import './App.css';
import Carta from './components/Carta.js';
import Item from './components/Item.js';
import Estrella from './components/Estrella.js';
import Nothing from './components/Nothing.js';
import { Route, Link, Switch } from "react-router-dom";

class App extends Component {
  render() {
    console.log('App>render>', this.state, this.props);
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Data structures
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
            <Route exact path="/carta" component={Carta}></Route>
            <Route exact path="/estrella" component={Estrella}></Route>
            <Route exact path="/carta/:menu" component={Carta}></Route>
            <Route exact path="/item/:category/:item" component={Item}></Route>
            <Route component={Nothing}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
