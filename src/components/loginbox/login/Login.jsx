import React, { Component } from 'react';

// create a React Component called _App_
class LogInForm extends Component {

  render(){
    return (
      <div className={this.props.loginFormDisplay}>
        <input
          type="text"
          placeholder="username"
          onChange={this.props.trackLoginForm}
        />
        <input
          type="password"
          placeholder="password"
          onChange={this.props.trackLoginForm}
        />
        <div className="loginbutton" onClick={this.props.handleLoginFuntions}>
          log in
        </div>
      </div>
    );
  }
}

export default LogInForm;
