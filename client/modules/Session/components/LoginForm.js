import React from 'react';
import { connect } from 'react-redux';

import { logIn } from '../SessionActions';
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
        <label htmlFor="email">
          Email
          <input
            id="email"
            autoComplete="email"
            type="email"
            onChange={this.handleChange('email')}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            htmlFor="password"
            autoComplete="off"
            type="password"
            onChange={this.handleChange('password')}
          />
        </label>
        <button>
          Log in
        </button>
        <a href="/api/auth/google">Log in with google</a>
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
