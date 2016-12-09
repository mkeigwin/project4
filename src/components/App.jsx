import React, { Component } from 'react';
import SignUpForm from './signup/Signup.jsx';
import LogInForm from './login/Login.jsx';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      usergroups: [],
      signUpFormDisplay: 'signup-form',
      logInFormDisplay: 'form-container',
      signup: {
        username: '',
        password: ''
      },
      login: {
        loggedIn: false,
        username: '',
        password: ''
      },
  };
}

// Rafa login code:

  updateFormSignUpUsername(e) {
    console.log(e.target.value);
    this.setState({
      signup: {
        username: e.target.value,
        password: this.state.signup.password
      }
    });
  }

  updateFormSignUpPassword(e) {
    console.log(e.target.value);
    this.setState({
      signup: {
        username: this.state.signup.username,
        password: e.target.value
      }
    });
  }

  updateFormLogInUsername(e) {
    this.setState({
      login: {
        username: e.target.value,
        password: this.state.login.password
      }
    });
  }

  updateFormLogInPassword(e) {
    this.setState({
      login: {
        username: this.state.login.username,
        password: e.target.value
      }
    });
  }

  handleSignUp() {
    fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.signup.username,
        password: this.state.signup.password
      })
    })
    .then(this.setState({
      username: this.state.login.username,
      signup: {
        username: '',
        password: ''
      },
      signUpFormDisplay: 'hidden'
    }))
    .catch(err => console.log(err));
  }

  handleLogIn() {
    fetch('/api/auth', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.login.username,
        password: this.state.login.password
      })
    })
    .then(this.setState({
      username: this.state.login.username,
      login: {
        username: '',
        password: ''
      },
      signUpFormDisplay: 'hidden',
      logInFormDisplay: 'hidden'
    }))
    .then(this.onSuccessfulLogIn)
    .catch(err => console.log(err));
  }

  loginFunctions(username) {
    this.getUserGroups(username);
    this.handleLogIn();
  }

  getUserGroups(username) {
  console.log('hey i am fetching usergroups for', username)
  return fetch(`/usergroups/${username}`, {
    method: 'GET'
  })
  .then(r => r.json())
  .then((data) => {
    console.log('$$$ THE USERGROUP DATA IS', data)
    this.setState({
      usergroups: data
    });
  })
  .catch(err => console.log(err));
}



  render(){
    return (
      <div>
        <p>test working</p>
        <SignUpForm
          signUpFormDisplay={this.state.signUpFormDisplay}
          signUpUsername={this.state.signup.username}
          signUpPassword={this.state.signup.password}
          updateFormUsername={event => this.updateFormSignUpUsername(event)}
          updateFormPassword={event => this.updateFormSignUpPassword(event)}
          handleFormSubmit={() => this.handleSignUp()}
        />
        <LogInForm
          logInFormDisplay={this.state.logInFormDisplay}
          loginFunctions={() => this.loginFunctions(this.state.login.username)}
          logInUsername={this.state.login.username}
          logInPassword={this.state.login.password}
          updateFormUsername={event => this.updateFormLogInUsername(event)}
          updateFormPassword={event => this.updateFormLogInPassword(event)}
          handleFormSubmit={() => this.handleLogIn()}
        />
      </div>
   );
 }
};

export default App;
