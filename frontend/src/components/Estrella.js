import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

class Estrella extends Component {
    constructor(props) {
        super(props);
        this.state = {redirectToDefault: false};
    }

    goBack = () => {
        this.setState({redirectToDefault: true});
    }

    render() {

        if (this.state.redirectToDefault) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <Redirect to="/item/especiales/Hamburguesa"/>
            </div>
        );
    }
}

export default Estrella;