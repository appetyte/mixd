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
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="email" onChange={this.handleChange('email')} />
        <input type="text" onChange={this.handleChange('displayName')} />
        <input type="password" onChange={this.handleChange('password')} />
        <input type="password" onChange={this.handleChange('confirmPassword')} />
      </form>
    );
  }
}

const mapStateToProps = () => ({

});

export default connect(
  mapStateToProps
)(SignupForm);
