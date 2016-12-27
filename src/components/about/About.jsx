import React, { Component } from 'react';

// create a React Component called _App_
class About extends Component {

  render(){
    return (
      <div>
        <div className={this.props.welcomeabout}>
          <p className="aboutP">Welcome to a space to share media with your friends.</p>
        </div>
        <div className={this.props.aboutcontentdisplay}>
          <p className="aboutP">Create a group, or join a group a friend has made, by clicking 'join group'.</p>
          <p className="aboutP">Search tags from all groups by clicking 'search'.</p>
        </div>
      </div>
    );
  }
}

export default About;
