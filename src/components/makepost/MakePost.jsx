import React, { Component } from 'react';

// create a React Component called _App_
class MakePost extends Component {

  render(){
    return (
      <div className="newPost">
        <input
          type="text"
          placeholder="create a new post"
          value={this.props.newPost}
          onChange={this.props.updateFormNewPost}
        />
        <input
          type="text"
          placeholder="enter tags"
          value={this.props.tags}
          onChange={this.props.updateFormTags}
        />
        <div className="newPostButton" onClick={this.props.handleNewPost}>
          Post
        </div>
      </div>
    );
  }
}

export default MakePost;
