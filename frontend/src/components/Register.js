import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                email: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.username && user.email  && user.password) {
            this.props.register(user);
        }
    }

    render() {
        const { user, submitted } = this.state;
        return (
            <div id="register">
                <h2>Register</h2>
                <form name="form-register" onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" name="username" placeholder="Username" value={user.username} onChange={this.handleChange} />
                        {submitted && !user.username &&
                            <div>Username is required</div>
                        }
                    </div>
                    <div>
                        <input type="text" name="email" placeholder="Email" value={user.email} onChange={this.handleChange} />
                        {submitted && !user.email &&
                            <div>Email is required</div>
                        }
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div>Password is required</div>
                        }
                    </div>
                    <div>
                        <button>Register</button><br/>
                        <Link to="/login">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(Register);
export default connectedRegisterPage;