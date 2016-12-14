import React, { Component } from 'react';
import TagPostItem from '../posts/postitem/TagPostitem.jsx';

// create a React Component called _App_
class Posts extends Component {

  renderPosts() {
    return this.props.tagsearchdata.map((result, j) => {
      return <TagPostItem
        GroupId={this.props.GroupId}
        mediaType={result.mediatype}
        handleDeletePostFunctions={this.props.handleDeletePostFunctions}
        userUserName={this.props.username}
        postUserName={result.username}
        postMedia={result.media}
        postTimeStamp={result.created_at}
        postId={result.id}
        key={j}
      />
    })
  }

  render(){
    return (
      <div className="tag-post-container">
        {this.renderPosts()}
      </div>
    );
  }
}

export default Posts;
