import React from 'react';

class LoginForm extends React.Component {
  constructor() {
    this.state = {
      username: '',
      password: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {

  }

  handleSubmit() {
    
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input />
      </form>
    );
  }
}

export default LoginForm;
