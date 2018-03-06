import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signUp } from '../SessionActions';
import './session.scss';

class SignupForm extends React.Component {
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

    const newUser = Object.assign({}, this.state);
    this.props.signUp(newUser);
  }

  render() {
    return (
      <form
        className="session-form"
        onSubmit={this.handleSubmit}
      >
        <Link to="/login">Log in instead</Link>
        <label htmlFor="email">
          Email
          <input
            id="email"
            autoComplete="email"
            type="email"
            onChange={this.handleChange('email')}
          />
        </label>
        <label htmlFor="username">
          Username
          <input
            id="username"
            autoComplete="username"
            type="text"
            onChange={this.handleChange('displayName')}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            autoComplete="off"
            type="password"
            onChange={this.handleChange('password')}
          />
        </label>
        <label htmlFor="confirmPassword">
          Confirm password
          <input
            id="confirmPassword"
            autoComplete="off"
            type="password"
            onChange={this.handleChange('confirmPassword')}
          />
        </label>
        <button>
          Create user
        </button>
        Sign up with google
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signUp: newUser => dispatch(signUp(newUser)),
});

export default connect(
  null,
  mapDispatchToProps,
)(SignupForm);
