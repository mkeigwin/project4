import React, { Component } from 'react';

class Comments extends Component {

  render(){
    return (
      <div>
        <p>{this.props.username}</p>
        <p>{this.props.textInput}</p>
        <div onClick={() => this.props.deleteComment(this.props.commentId)} className="comment-delete">delete comment</div>
      </div>
    );
  }
}

export default Comments;
