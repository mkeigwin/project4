import React, { Component } from 'react';
import Comments from '../postitem/comments/Comments.jsx';


export default class PostItem extends Component{

  constructor() {
    super();

    this.state = {
      commentsData: []
    }
  }

  componentWillMount(){
    return fetch(`/posts/comments/${this.props.postId}`, {
      method: 'GET'
    })
    .then(r => r.json())
    .then((data) => {
      this.setState({
        commentsData: data
      })
    })
  }

  renderComments(){
    return this.state.commentsData.map((result, i) =>
      <Comments
        username={result.username}
        textInput={result.textinput}
        commentId={result.id}
        key={i}
        deleteComment={this.props.deleteComment}
      />
    )
  }

  renderDelete(){
    const userUserName = this.props.userUserName;
    const postUserName = this.props.postUserName;
    if (userUserName === postUserName ) {
      return <div onClick={() => this.props.handleDeletePostFunctions(this.props.postId)}>DELETE</div>;
    }
  }

  render(){
    return (
      <div className="PostItem-Container">
        <div>
          <p>{this.props.postUserName}</p>
          <p className="timestamp">{this.props.postTimeStamp}</p>
          <iframe id="ytplayer" type="text/html" width="640" height="360"
            src={`https://www.youtube.com/embed/${this.props.postMedia}?autoplay=0&origin=http://example.com`}
            frameborder="0"></iframe>
          <div className="comment-input-field">
            <input
            type="text"
            placeholder="leave a comment"
            value={this.props.newComment}
            onChange={this.props.updateFormNewComment}
            />
            <div className="newCommentButton" onClick={this.props.handleNewComment}>
              Post Comment
            </div>
          </div>
          <div>
            {this.renderComments()}
          </div>
          <div>
            {this.renderDelete()}
          </div>
        </div>
      </div>
    );
  }
}
