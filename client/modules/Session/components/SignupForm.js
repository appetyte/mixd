import React from 'react';
import { connect } from 'react-redux';
import './signup.scss';

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
    // create a user, post.
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email
          <input
            autoComplete="email"
            type="email"
            onChange={this.handleChange('email')}
          />
        </label>
        <label>
          Username
          <input
            autoComplete="username"
            type="text"
            onChange={this.handleChange('displayName')}
          />
        </label>
        <label>
          Password
          <input
            autoComplete="off"
            type="password"
            onChange={this.handleChange('password')}
          />
        </label>
        <label>
          Confirm password
          <input
            autoComplete="off"
            type="password"
            onChange={this.handleChange('confirmPassword')}
          />
        </label>
        <button>
          Create user
        </button>
      </form>
    );
  }
}

export default SignupForm;

// const mapStateToProps = () => ({
//
// });
//
// export default connect(
//   mapStateToProps
// )(SignupForm);
