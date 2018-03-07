import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logIn } from '../sessionActions';
import './session.scss';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      displayName: '',
      password: '',
      confirmPassword: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    const user = Object.assign({}, this.state);
    this.props.logIn(user);
  }

  render() {
    return (
      <form
        className="session-form"
        onSubmit={this.handleSubmit}
      >
        <div className="session-form-header">
          <h1>Log in</h1>
          <Link to="/signup">Create account instead?</Link>
        </div>
        <label htmlFor="email">
          <input
            id="email"
            autoComplete="email"
            type="email"
            onChange={this.handleChange('email')}
            placeholder="Email address"
            autoFocus
          />
        </label>
        <label htmlFor="password">
          <input
            htmlFor="password"
            autoComplete="off"
            type="password"
            onChange={this.handleChange('password')}
            placeholder="Password"
          />
        </label>
        <div className="session-form-bottom">
          <button>
            Log in
          </button>
          <a className="session-form-button" href="/api/auth/google">Log in with Google</a>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logIn: newUser => dispatch(logIn(newUser)),
});

export default connect(
  null,
  mapDispatchToProps,
)(LoginForm);
