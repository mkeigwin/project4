import React, { Component } from 'react';
import Tagposts from '../searchtags/posts/TagPosts.jsx';

// create a React Component called _App_
class Searchtags extends Component {

  render(){
    return (
      <div className={this.props.searchbar}>
        <div onClick={()=> this.props.searchButton()} className="searchbutton">search</div>
        <div className={this.props.searchpagecontent}>
          <div className="exitblackpage" onClick={()=> this.props.exitblackpage()}>
            <img className="deleteiconwhite" src={this.props.deleteiconwhite} alt=""/>
          </div>
          <div className="searchTagsContainer">
            <input
              type="text"
              className="tagsearchinput"
              placeholder="enter a tag"
              value={this.props.searchtagentry}
              onChange={this.props.updateSearchTagsInput}
            />
            <div className="searchtagsbutton" onClick={()=>this.props.searchtags()}>
              search tags
            </div>
            <Tagposts />
          </div>
        </div>
      </div>
    );
  }
}

export default Searchtags;
