import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions';

class Login extends Component {
    constructor(props) {
        super(props);

        // reset login status
        //this.props.logout();

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            this.props.login(email, password);
        }
    }
    render() {
        const { email, password, submitted } = this.state;
        return (
            <div id="login">
                <h2>Login</h2>
                <form name="form-login" onSubmit={this.handleSubmit}>
                    <div className={(submitted && !email ? ' has-error' : '')}>
                        <input type="text" placeholder="Email" name="email" value={email} onChange={this.handleChange} />
                        {submitted && !email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={(submitted && !password ? ' has-error' : '')}>
                        <input type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <button>Login</button>
                    <br/>
                    <Link to="/register">Register</Link>
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
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(Login);
export default connectedLoginPage;