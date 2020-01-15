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
            Restaurante Handkerchief
          </h1>
          <nav>
            <ul id="nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/carta">Carta</Link></li>
              <li><Link to="/estrella">Plato estrella</Link></li>
            </ul>
          </nav>
          <div id="content">
            <Switch>
              <Route exact path="/">
                <h2>Bienvenido!</h2>
                <p>Desea ver <Link to="/carta">la carta?</Link></p>
              </Route>
              <Route exact path="/carta" component={Carta}></Route>
              <Route exact path="/estrella" component={Estrella}></Route>
              <Route exact path="/carta/:menu" component={Carta}></Route>
              <Route exact path="/item/:category/:item" component={Item}></Route>
              <Route component={Nothing}/>
            </Switch>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
