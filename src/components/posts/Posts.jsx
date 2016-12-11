import React, { Component } from 'react';
import PostItem from '../posts/postitem/PostItem.jsx';

// create a React Component called _App_
class Posts extends Component {



  renderPosts() {
    return this.props.postData.map((result, i) =>
      <PostItem
        handleDeletePostFunctions={this.props.handleDeletePostFunctions}
        userUserName={this.props.username}
        postUserName={result.username}
        postMedia={result.media}
        postTimeStamp={result.created_at}
        postId={result.id}
        commentData={this.props.commentData}
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
