import React, {Component} from 'react';
import { Route, Link, Switch } from 'react-router-dom';

class Carta extends Component {
    render() {
        return (
            <div id="carta">
                <div>
                <h4>Carta: </h4>
                    <ul >
                        <li><Link to="/carta/entrantes">Entrantes</Link></li>
                        <li><Link to="/carta/bebida">Bebida</Link></li>
                        <li><Link to="/carta/arroces">Arroces</Link></li>
                        <li><Link to="/carta/especiales">Especiales</Link></li>
                    </ul>
                </div>
                <div>
                    <Switch>
                        <Route exact path="/carta/entrantes">
                            <h4>Entrantes: </h4>
                            <ul>
                                <li><Link to="/item/entrantes/Patatasfritas">Patatas fritas</Link></li>
                                <li><Link to="/item/entrantes/Calamares">Calamares</Link></li>
                                <li><Link to="/item/entrantes/Chipirones">Chipirones</Link></li>
                                <li><Link to="/item/entrantes/Nachos">Nachos</Link></li>
                            </ul>
                        </Route>
                        <Route exact path="/carta/bebida">
                            <h4>Bebida: </h4>
                            <ul>
                                <li><Link to="/item/bebida/WaterBottle">Agua</Link></li>
                                <li><Link to="/item/bebida/LataCocaCola">Coca Cola</Link></li>
                                <li><Link to="/item/bebida/FantaNaranja">Fanta de naranja</Link></li>
                                <li><Link to="/item/bebida/Nestea">Nestea</Link></li>
                            </ul>
                        </Route>
                        <Route exact path="/carta/arroces">
                            <h4>Arroces: </h4>
                            <ul>
                                <li><Link to="/item/arroces/Arrozblanco">Arroz blanco</Link></li>
                                <li><Link to="/item/arroces/Paella">Paella</Link></li>
                                <li><Link to="/item/arroces/Arrozalacubana">Arroz a la cubana</Link></li>
                                <li><Link to="/item/arroces/Fideua">Fideua</Link></li>
                            </ul>
                        </Route>
                        <Route exact path="/carta/especiales">
                            <h4>Especiales: </h4>
                            <ul>
                                <li><Link to="/item/especiales/Tallarines">Tallarines</Link></li>
                                <li><Link to="/item/especiales/Rollitosdeprimavera">Rollito de primavera</Link></li>
                                <li><Link to="/item/especiales/Canelones">Canelones</Link></li>
                                <li><Link to="/item/especiales/Hamburguesa">Hamburguesa</Link></li>
                            </ul>
                        </Route>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Carta;