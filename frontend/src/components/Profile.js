import React, {Component} from 'react';
import { connect } from 'react-redux';
import AlgorithmList from './AlgorithmList';
import { algorithmActions } from '../actions';

class Profile extends Component {
    constructor(props) {
        super(props);
        let username = this.props.match.params.username;
        this.props.listAuthor(username);
    }
    render() {
        const { codeList } = this.props;
        return (
            <div className="profile">
                <AlgorithmList list={codeList} />
            </div>
        );
    }
}
function mapState(state) {
    const { codeList } = state.algorithm;
  return { codeList };
}

const actionCreators = {
    listAuthor: algorithmActions.listAuthor,
};


const connectedProfilePage = connect(mapState, actionCreators)(Profile);
export default connectedProfilePage;