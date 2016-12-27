import React, { Component } from 'react';

// create a React Component called _App_
class MakePost extends Component {

  render(){
    return (
      <div className={this.props.newPostContainer}>
        <input
          className="linkInput"
          type="text"
          placeholder="enter a link to share"
          value={this.props.newPost}
          onChange={this.props.updateFormNewPost}
        />
        <input
          className="linkInput"
          type="text"
          placeholder="enter tags (e.g. jazz, chicago)"
          value={this.props.newtags}
          onChange={this.props.updateFormTags}
        />
        <div className="newPostButton" onClick={this.props.handleNewPost}>
          post
        </div>
      </div>
    );
  }
}

export default MakePost;
