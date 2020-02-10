import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CodeEditor from './CodeEditor';
import { algorithmActions } from '../actions';

class Algorithm extends Component {
    constructor(props) {
        super(props);

        let name = this.props.match.params.name;
        this.state = {
            code: '',
            name,
        };
        this.props.get(name);
    }
    render() {
        const { getting, code } = this.props;
        console.log(code);
        return (
            <div className="algo">
                <h1 className="algoTitle">{!getting && code && code.title}</h1>
                <div className="description"><p>{!getting && code && code.description}</p></div>
                <CodeEditor code={code}/>
            </div>
        );
    }
}
function mapState(state) {
    const { getting, code } = state.algorithm;
    return { code };
}

const actionCreators = {
    get: algorithmActions.get,
};


const connectedAlgorithmPage = connect(mapState, actionCreators)(Algorithm);
export default connectedAlgorithmPage;