import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Nothing extends Component {
    render() {
        return (
            <div>
                <h2>Nothing here</h2>
                <Link to="/">Home</Link>
            </div>
        );
    }
}

export default Nothing;