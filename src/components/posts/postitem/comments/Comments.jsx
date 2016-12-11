import React, { Component } from 'react';

class Comments extends Component {

  render(){
    return (
      <div>
        <p>{this.props.username}</p>
        <p>{this.props.textInput}</p>
      </div>
    );
  }
}

export default Comments;
