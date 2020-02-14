import React, {Component} from 'react';
import { connect } from 'react-redux';
import CodeEditor from './CodeEditor';
import { algorithmActions } from '../actions';

class Algorithm extends Component {
    constructor(props) {
        super(props);

        let name = this.props.match.params.name;
        this.state = {
            code: {
                body: `import sys
print(sys.version)`
            },
            name,
        };
        if (name)
            this.props.get(name);
        else
            this.props.get("default");
    }
    render() {
        let { getting, code } = this.props;
        if (code === undefined) {
            code = this.state.code;
        }
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
    return { getting, code };
}

const actionCreators = {
    get: algorithmActions.get,
};


const connectedAlgorithmPage = connect(mapState, actionCreators)(Algorithm);
export default connectedAlgorithmPage;