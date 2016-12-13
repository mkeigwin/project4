import React, { Component } from 'react';
import SignUpForm from './signup/Signup.jsx';
import LogInForm from './login/Login.jsx';

// create a React Component called _App_
class Header extends Component {

  render(){
    return (
      <div className={this.props.loginContainer}>
        <SignUpForm
          signUpFormDisplay={this.props.signUpFormDisplay}
          trackSignupForm={this.props.trackSignupForm}
          postSignup={this.props.postSignup}
        />
        <LogInForm
          trackLoginForm={this.props.trackLoginForm}
          handleLoginFuntions={this.props.handleLoginFuntions}
          logout={this.props.logout}
          loginFormDisplay={this.props.loginFormDisplay}
        />
        <div className={this.props.registerButtonDisplay} onClick={() => this.props.handleRegisterButton()}>
          register
        </div>
        <div className={this.props.loginButtonDisplay} onClick={() => this.props.handleLoginButton()}>
          login
        </div>
      </div>
    );
  }
}

export default Header;
