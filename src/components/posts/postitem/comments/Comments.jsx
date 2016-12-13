import React, { Component } from 'react';

class Comments extends Component {

  renderComment(){
    if(this.props.postId === this.props.commentPostId){
      return  (
        <div>
          <div className="comment-delete" onClick={() => this.props.deleteComment(this.props.commentId)} className="comment-delete">
            DELETE
          </div>
          <p className="comment-username">{this.props.username}</p>
          <p className="comment-text">{this.props.textInput}</p>
        </div>
      )
    }
  }

  render(){
      return (
        <div>
          {this.renderComment()}
        </div>
      );
  }
}

export default Comments;
