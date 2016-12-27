import React, { Component } from 'react';

class Comments extends Component {

  renderDelete(){
    const userUserName = this.props.userUserName;
    const postUserName = this.props.postUserName;
    if (userUserName === postUserName) {
      return (
      <div className="comment-delete" onClick={() => this.props.deleteComment(this.props.commentId)}>
        DELETE
      </div>
      )
    }
  }

  renderComment(){
    if(this.props.postId === this.props.commentPostId){
      return  (
        <div>
          <div>
            {this.renderDelete()}
          </div>
          <p className="comment-username">{this.props.username}</p>
          <p className="comment-text">{this.props.textInput}</p>
        </div>
      )
    }
  }

  render(){
      return (
        <div className="comment-wrapper">
          {this.renderComment()}
        </div>
      );
  }
}

export default Comments;
