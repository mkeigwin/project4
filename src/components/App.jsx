import React, { Component } from 'react';
import Posts from './posts/Posts.jsx';
import Loginbox from './loginbox/Loginbox.jsx';
import GroupSelect from './groupselect/Groupselect.jsx'
import MakePost from './makepost/MakePost.jsx';
import Searchtags from './searchtags/Searchtags.jsx';
import Creategroup from './creategroup/Creategroup.jsx';
import Deleteicon from '../images/deleteicon.png';
import Check from '../images/check.png';
import About from './about/About.jsx'
import Deleteiconwhite from '../images/deleteiconwhite.png';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      deleteiconwhite: Deleteiconwhite,
      deleteicon: Deleteicon,
      check: Check,
      groupname: '',
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
      tags: [],
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
      newPostContainer: 'hidden',
      searchHiddenItems: '',
      searchbar: 'hidden',
      searchpagecontent: 'hidden',
      creategroupdisplay: 'hidden',
      creategroupbutton: 'hidden',
      leavegroupbutton: 'hidden',
      joingroupdisplay: 'hidden',
      leavegroupdisplay: 'hidden',
      headerdisplay: 'hidden',
      aboutcontentdisplay: 'hidden',
      tagdisplay: 'tagdisplay',
      welcomeabout: 'welcomeabout'
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
        searchbar: 'searchbar',
        loginContainer: 'hidden',
        headerdisplay: '',
        welcomeabout: 'hidden',
        username: this.state.loginForm.username,
        searchbarbutton: 'searchbutton button',
        creategroupbutton: 'creategroupbutton button',
        leavegroupbutton: 'leavegroupbutton button',
        aboutcontentdisplay: 'aboutcontent',
        loginForm: {
          username: '',
          password: ''
        }
      })
    })
  }

  logout(){
    this.setState({
      aboutcontentdisplay: 'hidden',
      currentToken: ''
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
    .then(this.joinGroupFetch())
    .catch(err => console.log(err));
  }

  joinGroupFetch(){
    console.log('joining group', this.state.searchGroupName)
    fetch('/usergroups/joinGroup', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.state.currentToken
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        groupname: this.state.createGroupName
      })
    })
    .then(this.setState({
      joinGroupId: '',
      createGroupName: '',
      creategroupdisplay: 'hidden'
    }))
    .then(this.getUserGroups())
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
        this.setState({
          aboutcontentdisplay: 'hidden',
          searchGroupName: data[0].name,
          joinGroupId: data[0].id
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
      newtags: ''
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
      console.log('the usergroup data is', data)
      this.setState({
        usergroups: data
      });
    })
    .catch(err => console.log(err));
    }

  handleChooseGroupFunctions(GroupId, groupname){
    this.handleComments(GroupId);
    this.handleChooseGroup(GroupId);
    this.setState({
      groupname: groupname,
      aboutcontentdisplay: 'hidden'
    })
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
        console.log('this is the data for choosegroup', data)
        this.setState({
          postData: data,
          group_id: GroupId,
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

  searchButton(){
    this.getTags()
    this.setState({
      searchHiddenItems: 'hidden',
      headerdisplay: 'hidden',
      searchbar: 'searchpage',
      aboutcontentdisplay: 'hidden',
      tagdisplay: 'tagdisplay'
    })
    setTimeout(()=>{this.setState({
      searchbarbutton: 'hidden',
      searchpagecontent: 'searchpagecontent'
    })}, 1100)
  }

  exitblackpage(){
    this.setState({
      searchpagecontent: 'hidden',
      searchbar: 'searchbar',
      headerdisplay: '',
      searchbarbutton: 'searchbutton button'
    })
    setTimeout(()=>{this.setState({
      searchHiddenItems: ''
    })}, 1100)
  }

  getTags(){
    return fetch(`/posts/gettags`, {
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
          tags: data
        });
      })
      .catch(err => console.log(err));
  };

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
        this.setState({
          tagsearchdata: data
        });
      })
      .catch(err => console.log(err));
  };

  showcreategroup(){
    if (this.state.creategroupdisplay == 'creategroupdisplay'){
      this.setState({
        creategroupdisplay: 'hidden'
      })
      return
    }
    this.setState({
      creategroupdisplay: 'creategroupdisplay'
    })
    console.log('clicked create group')
  }

  showleavegroup(){
    if (this.state.showleavegroup == 'showleavegroup'){
      this.setState({
        leavegroupdisplay: 'hidden'
      })
      return
    }
    this.setState({
      leavegroupdisplay: 'leavegroupdisplay'
    })
  }

  showjoingroup(){
    if (this.state.joingroupdisplay == 'joingroupdisplay'){
      this.setState({
        joingroupdisplay: 'hidden'
      })
      return
    }
    this.setState({
      joingroupdisplay: 'joingroupdisplay'
    })
    console.log('clicked join group')
  }

  render(){
    return (
      <div className="main-container">
        <header>
          <div className={this.state.headerdisplay}>
            <div className="username-group-display">
              <p className="username-display">{this.state.username}  <span className="groupname-display">{this.state.groupname}</span></p>
            </div>
            <div className="logout button" onClick={this.logout.bind(this)}>logout</div>
            <GroupSelect
              userGroupSelectDisplay={this.state.userGroupSelectDisplay}
              usergroups={this.state.usergroups}
              handleChooseGroupFunctions={this.handleChooseGroupFunctions.bind(this)}
            />
            <Creategroup
              leavegroupbutton={this.state.leavegroupbutton}
              showleavegroup={this.showleavegroup.bind(this)}
              showcreategroup={this.showcreategroup.bind(this)}
              check={this.state.check}
              creategroupdisplay={this.state.creategroupdisplay}
              checkdisplay={this.state.checkdisplay}
              trackCreateGroup={event => this.trackCreateGroup(event)}
              creategroup={this.createGroup.bind(this)}
              creategroupbutton={this.state.creategroupbutton}
            />
            <MakePost
              newPostContainer={this.state.newPostContainer}
              newPost={this.state.newPost}
              newtags={this.state.newtags}
              updateFormNewPost={event => this.updateFormNewPost(event)}
              updateFormTags={event => this.updateFormTags(event)}
              handleNewPost={() => this.handleNewPostFunctions()}
            />
          </div>
          <Searchtags
            tagdisplay={this.state.tagdisplay}
            tags={this.state.tags}
            searchbarbutton={this.state.searchbarbutton}
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
        </header>
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
        <div className={this.state.searchHiddenItems}>
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
        <About
          welcomeabout={this.state.welcomeabout}
          aboutcontentdisplay={this.state.aboutcontentdisplay}
        />
      </div>
   );
 }
};

export default App;
