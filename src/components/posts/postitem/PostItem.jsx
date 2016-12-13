import React, { Component } from 'react';
import Comments from '../postitem/comments/Comments.jsx';


export default class PostItem extends Component {

  renderComments(){
    return this.props.commentsData.map((result, i) => {
      return <Comments
        postId={this.props.postId}
        username={result.username}
        commentPostId={result.post_id}
        textInput={result.textinput}
        commentId={result.id}
        key={i}
        deleteComment={this.props.deleteComment}
      />
    }
    )
  }

  renderDelete(){
    const userUserName = this.props.userUserName;
    const postUserName = this.props.postUserName;
    if (userUserName === postUserName ) {
      return <div className="deletePost" onClick={() => this.props.handleDeletePostFunctions(this.props.postId)}>DELETE</div>;
    }
  }

  renderMedia(){
    if (this.props.mediaType === 'youtube'){
      const link = this.props.postMedia;
      const parsedLink = link.slice(-11);
      return <iframe className="posted-video" id="ytplayer" type="text/html" width="750" height="422"
      src={`https://www.youtube.com/embed/${parsedLink}?autoplay=0&origin=http://example.com`}
      frameborder="0" />
    }
    else if (this.props.mediaType === 'image'){
      return <img className="posted-image" src={this.props.postMedia} alt="" />
    }
    else if (this.props.mediaType === 'vimeo'){
      const link = this.props.postMedia;
      const parsedLink = link.slice(-9)
      console.log(parsedLink);
      return <iframe className="posted-video" src={`https://player.vimeo.com/video/${parsedLink}`} width="750" height="422" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen />
    }
  }

  render() {
    return (
      <div className="post-container">
        <div>
          <div>
            {this.renderDelete()}
          </div>
          <p className="postUserName">{this.props.postUserName}</p>
          <p className="timestamp">{this.props.postTimeStamp}</p>
          <div>
            {this.renderMedia()}
          </div>
          <div className="comment-input-field">
            <textarea
            type="text"
            className="leaveComment-input"
            contenteditable="true"
            placeholder="leave a comment"
            value={this.props.newComment}
            onChange={this.props.updateFormNewComment}
            />
            <div className="newCommentButton" onClick={() => this.props.handleNewCommentFunctions(this.props.postId)}>
              Post
            </div>
          </div>
          <div>
            {this.renderComments()}
          </div>
        </div>
      </div>
    );
  }
}
