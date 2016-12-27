import React, { Component } from 'react';
import PostItem from '../posts/postitem/PostItem.jsx';

class Posts extends Component {

  renderPosts() {
    return this.props.postData.map((result, i) =>
      <PostItem
        GroupId={this.props.GroupId}
        mediaType={result.mediatype}
        handleDeletePostFunctions={this.props.handleDeletePostFunctions}
        deleteComment={this.props.deleteComment}
        handleNewCommentFunctions={this.props.handleNewCommentFunctions}
        updateFormNewComment={this.props.updateFormNewComment}
        newComment={this.props.newComment}
        userUserName={this.props.username}
        postUserName={result.username}
        postMedia={result.media}
        postTimeStamp={result.created_at}
        postId={result.id}
        commentsData={this.props.commentsData}
        key={i}
      />
      )
  }

  render(){
    return (
      <div>
        {this.renderPosts()}
      </div>
    );
  }
}

export default Posts;
