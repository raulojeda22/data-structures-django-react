import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions';

class Header extends React.Component {
    render() {
        if (this.props.currentUser) {
            return (
                <header className="App-header">
                <h1><Link to="/">
                    Algorithms</Link>
                </h1>
                <ul id="nav">
                    <li><h2><Link to="/">Home</Link></h2></li>
                    <li><h2>{this.props.currentUser.username}</h2></li>
                    <li><button onClick={() => this.props.logout()}>Logout</button></li>
                </ul>
                </header>
            )
        }
        else {
            return (
            <header className="App-header">
            <h1><Link to="/">
                Algorithms</Link>
            </h1>
            <ul id="nav">
                <li><h2><Link to="/">Home</Link></h2></li>
                <li><h2><Link to="/login">Login</Link></h2></li>
            </ul>
            </header>
            )
        }
    }
}

function mapState(state) {
    const { loggedIn } = state.authentication;
    return { loggedIn };
}

const actionCreators = {
    logout: userActions.logout
};

const connectedHeader = connect(mapState, actionCreators)(Header);
export default connectedHeader;