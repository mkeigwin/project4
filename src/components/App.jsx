import React, { Component } from 'react';
import Posts from './posts/Posts.jsx';
import Loginbox from './loginbox/Loginbox.jsx';
import GroupSelect from './groupselect/Groupselect.jsx'
import MakePost from './makepost/MakePost.jsx';
import Searchtags from './searchtags/Searchtags.jsx';
import Searchgroup from './searchgroup/Searchgroup.jsx';
import Deleteicon from '../images/deleteicon.png';
import Check from '../images/check.png';
import Deleteiconwhite from '../images/deleteiconwhite.png';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      deleteiconwhite: Deleteiconwhite,
      deleteicon: Deleteicon,
      check: Check,
      searchtagentry: '',
      searchGroupName: '',
      createGroupName: '',
      joinGroupId: '',
      newComment: '',
      newPost: '',
      mediaType: '',
      tagsearchdata: [],
      commentsData: [],
      postData: [],
      usergroups: [],
      group_id: '',
      newtags: '',
      username: '',
      signup: {
        username: '',
        password: ''
      },
      currentToken: '',
      login: {
        loggedIn: false,
        username: '',
        password: ''
      },
      loginButton: 'hidden',
      registerButton: 'registerbutton',
      userNameDisplay: 'hidden',
      signUpFormDisplay: 'hidden',
      logInFormDisplay: 'form-container',
      loginContainer: 'loginContainer',
      searchjoingroupbar: 'hidden',
      clicktojoin: 'hidden',
      groupheaderbutton: 'hidden',
      newPostContainer: 'hidden',
      searchHiddenItems: '',
      searchbar: 'hidden',
      searchpagecontent: 'hidden',
      checkdisplay: 'hidden'

  };
}

  // DANIEL PEASE USER AUTH:::::

  trackSignupForm(e) {
    let fieldsArr = e.target.parentElement.childNodes
    this.setState({
      signupForm: {
        username: fieldsArr[0].value,
        password: fieldsArr[1].value
      }
    }, () => {
      console.log(this.state)
    })
  }

  trackLoginForm(e) {
    let fieldsArr = e.target.parentElement.childNodes
    this.setState({
      loginForm: {
        username: fieldsArr[0].value,
        password: fieldsArr[1].value
      }
    })
  }

  postSignup() {
    console.log('clicked')
    fetch('/user/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ` + this.state.currentToken
      },
      body: JSON.stringify({
        username: this.state.signupForm.username,
        password: this.state.signupForm.password
      })
    })
    .then((data) => {
      this.setState({
        signupForm: {
          username: '',
          password: ''
        },
        registerButton: 'registerbutton',
        loginButton: 'hidden',
        signUpFormDisplay: 'hidden',
        logInFormDisplay: 'form-container'
      })
    })
  }

  postLogin() {
    console.log('clicked')
    fetch('/user/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.loginForm.username,
        password: this.state.loginForm.password
      })
    })
    .then(r => r.json())
    .then((data) => {
      this.setState({
        currentToken: data,
        loginContainer: 'hidden',
        groupheaderbutton: 'groupheaderbutton',
        username: this.state.loginForm.username,
        loginForm: {
          username: '',
          password: ''
        }
      })
    })
  }

  logout() {
    this.setState({
      currentToken: '',
    }, () => {
      console.log('after logout ', this.state)
    })
  }

  // ---------- END DANIEL PEASE CODE

  updateFormTags(e){
    this.setState({
      newtags: e.target.value
    })
  }

  updateSearchTagsInput(e){
    this.setState({
      searchtagentry: e.target.value
    })
  }

  updateFormNewPost(e){
    this.setState({
      newPost: e.target.value
    });
  }

  updateFormNewComment(e){
    this.setState({
      newComment: e.target.value
    })
  }

  createGroup(){
    fetch('/usergroups/newGroup', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.state.currentToken
      },
      method: 'POST',
      body: JSON.stringify({
        groupname: this.state.createGroupName
      })
    })
    .then(this.setState({
      checkdisplay: 'checkdisplay'
    }))
    .catch(err => console.log(err));
  }

  joinGroup(){
    this.joinGroupFetch();
    setTimeout(()=> {
      this.getUserGroups();
    }, )
  }

  joinGroupFetch(){
    console.log('joining group', this.state.joinGroupId)
    fetch('/usergroups/joinGroup', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.state.currentToken
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        group_id: this.state.joinGroupId
      })
    })
    .then(this.setState({
      joinGroupId: ''
    }))
    .catch(err => console.log(err));
  }

  searchGroup(){
    return fetch(`/usergroups/groups/${this.state.searchGroupName}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.state.currentToken
      },
        method: 'GET'
      })
      .then(r => r.json())
      .then((data) => {
        console.log('THE DATA FOR SEARCHGROUP IS', data)
        this.setState({
          searchGroupName: data[0].name,
          joinGroupId: data[0].id,
          clicktojoin: 'clicktojoin'
        });
      })
      .catch(err => console.log(err));
    }


  sortMediaType() {
    const youtube = /youtube.com/;
    const youtube2 = /youtu.be/;
    const gif = /.gif/;
    const png = /.png/;
    const jpg = /.jpg/;
    const jpeg = /.jpeg/;
    const svg = /.svg/;
    const vimeo = /vimeo.com/;
    const soundcloud = /soundcloud.com/;

    if(youtube.test(this.state.newPost) || youtube2.test(this.state.newPost)){
      this.setState({
        mediaType: 'youtube'
      })
    } else if (
      gif.test(this.state.newPost) ||
      png.test(this.state.newPost) ||
      jpg.test(this.state.newPost) ||
      jpeg.test(this.state.newPost) ||
      svg.test(this.state.newPost)){
      this.setState({
        mediaType: 'image'
      })
    } else if ( vimeo.test(this.state.newPost)){
      this.setState({
        mediaType: 'vimeo'
      })
    } else if ( soundcloud.test(this.state.newPost)){
      this.setState({
        mediaType: 'soundcloud'
      })
    }
  };

  handleNewPost() {
    console.log('the new tags in fetch', this.state.newtags)
    fetch('/posts/newPost', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.state.currentToken
      },
      method: 'POST',
      body: JSON.stringify({
        newPost: this.state.newPost,
        tags: this.state.newtags,
        group_id: this.state.group_id,
        username: this.state.username,
        mediaType: this.state.mediaType
      })
    })
    .then(this.setState({
      newPost: '',
      tags: ''
    }))
    .catch(err => console.log(err));
  };

  handleNewComment(postId){
    console.log('creating new comment to post', this.state.newComment)
    fetch('/posts/newComment', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.state.currentToken
      },
      method: 'POST',
      body: JSON.stringify({
        textinput: this.state.newComment,
        post_id: postId,
        username: this.state.username,
        group_id: this.state.group_id
      })
    })
    .then(this.setState({
      newComment: '',
    }))
    .catch(err => console.log(err));
  };

  handleLoginFuntions(){
    this.postLogin();
    setTimeout(() => {this.getUserGroups()}, 1000);
  }

  handleNewPostFunctions() {
    this.sortMediaType();
    setTimeout(() => {this.handleNewPost()}, 100);
    setTimeout(() => {this.handleChooseGroupFunctions(this.state.group_id)}, 200);
  }

  handleDeletePostFunctions(postId) {
    this.deletePost(postId);
  }

  getUserGroups() {
    console.log('gettinguserGroups')
  return fetch(`/usergroups/${this.state.username}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ` + this.state.currentToken
    },
      method: 'GET'
    })
    .then(r => r.json())
    .then((data) => {
      this.setState({
        usergroups: data
      });
    })
    .catch(err => console.log(err));
    }

  handleChooseGroupFunctions(GroupId){
    this.handleComments(GroupId);
    this.handleChooseGroup(GroupId);
  }

  handleChooseGroup(GroupId){
    return fetch(`/posts/${GroupId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.state.currentToken
      },
        method: 'GET'
      })
      .then(r => r.json())
      .then((data) => {
        this.setState({
          postData: data,
          group_id: GroupId,
          searchbar: 'searchbar',
          newPostContainer: 'newPost'
      });
    })
  }

  deletePost(PostId){
    fetch(`posts/delete/${PostId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.state.currentToken
      },
        method: 'delete'
      })
      .then(() => {
        const updatePosts = this.state.postData.filter((post) => {
          return post.id !== PostId;
        })
          this.setState({ postData: updatePosts })
          console.log(updatePosts)
      })
      .catch(err => console.log(err));
  }

  deleteComment(commentId){
    console.log('deleting comment')
    fetch(`posts/comment/${commentId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.state.currentToken
      },
      method: 'delete'
      })
      .then(() => {
        const updateComments = this.state.commentsData.filter((comment) => {
          return comment.id !== commentId;
        })
          this.setState({ commentsData: updateComments })
          console.log('the new comments are:', updateComments)
      })
      .catch(err => console.log(err));
  }

  handleNewCommentFunctions(postId){
    this.handleNewComment(postId)
    setTimeout(() => {this.handleChooseGroupFunctions(this.state.group_id)}, 300);
  }

  handleComments(GroupId){
    return fetch(`/posts/comments/${GroupId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.state.currentToken
      },
      method: 'GET'
    })
    .then(r => r.json())
    .then((data) => {
      this.setState({
        commentsData: data
      });
    })
  }

  handleRegisterButton(){
    this.setState({
      loginButton: 'loginbuttonselect',
      registerButton: 'hidden',
      userNameDisplay: 'hidden',
      signUpFormDisplay: 'form-container',
      logInFormDisplay: 'hidden'
    })
  }

  handleLoginButton(){
    this.setState({
      loginButton: 'hidden',
      registerButton: 'registerbutton',
      userNameDisplay: 'hidden',
      signUpFormDisplay: 'hidden',
      logInFormDisplay: 'form-container'
    })
  }

  trackSearchGroup(e) {
    let fieldsArr = e.target.parentElement.childNodes
    console.log('THE TARGET IS', e.target)
    this.setState({
      searchGroupName: fieldsArr[0].value
    })
  }

  trackCreateGroup(e) {
    let fieldsArr = e.target.parentElement.childNodes
    this.setState({
      createGroupName: fieldsArr[0].value
    })
  }

  opengroupfinder(){
    this.setState({
      searchjoingroupbar: 'searchjoingroupbar'
    })
  }

  closegroupsearchwindow(){
    this.setState({
      searchjoingroupbar: 'hidden',
      checkdisplay: 'hidden'
    })
  }

  searchButton(){
    this.setState({
      searchHiddenItems: 'hidden',
      searchbar: 'searchpage'
    })
    setTimeout(()=>{this.setState({
      searchpagecontent: 'searchpagecontent'
    })}, 1100)
  }

  exitblackpage(){
    this.setState({
      searchpagecontent: 'hidden',
      searchbar: 'searchbar'
    })
    setTimeout(()=>{this.setState({
      searchHiddenItems: ''
    })}, 1100)
  }

  searchtags(){
    return fetch(`/posts/tagsearch/${this.state.searchtagentry}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.state.currentToken
      },
        method: 'GET'
      })
      .then(r => r.json())
      .then((data) => {
        console.log('THE DATA FOR tags IS', data)
        this.setState({
          tagsearchdata: data
        });
      })
      .catch(err => console.log(err));
  };

  render(){
    return (
      <div className="main-container">
        <p className="username-display">{this.state.username}</p>
        <Loginbox
          username={this.state.username}
          signUpFormDisplay={this.state.signUpFormDisplay}
          loginButtonDisplay={this.state.loginButton}
          registerButtonDisplay={this.state.registerButton}
          loginFormDisplay={this.state.logInFormDisplay}
          loginContainer={this.state.loginContainer}
          handleRegisterButton={() => this.handleRegisterButton()}
          handleLoginButton={() => this.handleLoginButton()}
          trackSignupForm={this.trackSignupForm.bind(this)}
          postSignup={this.postSignup.bind(this)}
          trackLoginForm={this.trackLoginForm.bind(this)}
          handleLoginFuntions={this.handleLoginFuntions.bind(this)}
          logout={this.logout.bind(this)}
        />
        <Searchtags
          tagsearchdata={this.state.tagsearchdata}
          searchtagentry={this.state.searchtagentry}
          updateSearchTagsInput={event => this.updateSearchTagsInput(event)}
          searchtags={this.searchtags.bind(this)}
          exitblackpage={this.exitblackpage.bind(this)}
          deleteiconwhite={this.state.deleteiconwhite}
          searchpagecontent={this.state.searchpagecontent}
          searchbar={this.state.searchbar}
          searchButton={this.searchButton.bind(this)}
          GroupId={this.state.group_id}
          postData={this.state.postData}
          username={this.state.username}
          handleDeletePostFunctions={this.handleDeletePostFunctions.bind(this)}
        />
        <GroupSelect
          userGroupSelectDisplay={this.state.userGroupSelectDisplay}
          usergroups={this.state.usergroups}
          handleChooseGroupFunctions={this.handleChooseGroupFunctions.bind(this)}
        />
        <div className={this.state.searchHiddenItems}>
          <div className={this.state.groupheaderbutton} onClick={() => this.opengroupfinder()}>create/find a group</div>
          <Searchgroup
            checkdisplay={this.state.checkdisplay}
            check={this.state.check}
            closegroupsearchwindow={()=> this.closegroupsearchwindow()}
            deleteicon={this.state.deleteicon}
            clicktojoin={this.state.clicktojoin}
            searchjoingroupbar={this.state.searchjoingroupbar}
            joinGroup={this.joinGroup.bind(this)}
            searchGroupName={this.state.searchGroupName}
            searchGroup={this.searchGroup.bind(this)}
            trackSearchGroup={this.trackSearchGroup.bind(this)}
            createGroup={this.createGroup.bind(this)}
            trackCreateGroup={this.trackCreateGroup.bind(this)}
          />
          <MakePost
            newPostContainer={this.state.newPostContainer}
            newPost={this.state.newPostMedia}
            newtags={this.state.newtags}
            updateFormNewPost={event => this.updateFormNewPost(event)}
            updateFormTags={event => this.updateFormTags(event)}
            handleNewPost={() => this.handleNewPostFunctions()}
          />
          <Posts
            GroupId={this.state.group_id}
            newComment={this.state.newComment}
            updateFormNewComment={event => this.updateFormNewComment(event)}
            handleNewCommentFunctions={this.handleNewCommentFunctions.bind(this)}
            postData={this.state.postData}
            commentsData={this.state.commentsData}
            username={this.state.username}
            handleDeletePostFunctions={this.handleDeletePostFunctions.bind(this)}
            deleteComment={this.deleteComment.bind(this)}
          />
        </div>
      </div>
   );
 }
};

export default App;
