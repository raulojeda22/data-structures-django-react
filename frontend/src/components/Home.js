import React from 'react';
import { connect } from 'react-redux';
import { algorithmActions } from '../actions';
import AlgorithmList from './AlgorithmList.js';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.props.list();
      }
    render() {
        return (
            <div>
                <h2>Home</h2>
                <AlgorithmList list={this.props.codeList}/>
            </div>
        )
    }
}

function mapState(state) {
    const { codeList } = state.algorithm;
    return { codeList};
}

const actionCreators = {
    list: algorithmActions.list
};

const connectedHome = connect(mapState, actionCreators)(Home);
export default connectedHome;