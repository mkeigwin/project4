import React, { Component } from 'react';
import TagPostItem from '../posts/postitem/TagPostitem.jsx';

// create a React Component called _App_
class Posts extends Component {

  renderPosts() {
      this.props.tagsearchdata.forEach((tag, j)=> {
        this.props.postData.filter((result, i) => {
          return result.id === tag.post_id
          <TagPostItem
            GroupId={this.props.GroupId}
            mediaType={result.mediatype}
            handleDeletePostFunctions={this.props.handleDeletePostFunctions}
            userUserName={this.props.username}
            postUserName={result.username}
            postMedia={result.media}
            postTimeStamp={result.created_at}
            postId={result.id}
            key={i}
          />
        })
      })
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
