import React, { Component } from 'react';

// create a React Component called _App_
class SignUpForm extends Component {

  render(){
    return (
      <div className={this.props.signUpFormDisplay}>
        <input
          type="text"
          placeholder="username"
          onChange={this.props.trackSignupForm}
        />
        <input
          type="password"
          placeholder="password"
          onChange={this.props.trackSignupForm}
        />
        <div className="formbutton" onClick={this.props.postSignup}>
          register
        </div>
      </div>
    );
  }
}

export default SignUpForm;
