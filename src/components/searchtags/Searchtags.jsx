import React, { Component } from 'react';
import Tagposts from '../searchtags/posts/TagPosts.jsx';

// create a React Component called _App_
class Searchtags extends Component {

  renderTags(){
    let data = this.props.tags
    let array = []
    for(let i = 0; i < data.length; i++){
      console.log('counting')
      array.push(<p className="tagP" key={i}>{data[i].name}</p>);
    }
    return <div className={this.props.tagdisplay}>{array}</div>
  }

  render(){
    return (
      <div className={this.props.searchbar}>
        <div onClick={()=> this.props.searchButton()} className={this.props.searchbarbutton}>search</div>
        <div className={this.props.searchpagecontent}>
          <div>
            {this.renderTags()}
          </div>
          <div className="exitblackpage" onClick={()=> this.props.exitblackpage()}>
            <img className="deleteiconwhite" src={this.props.deleteiconwhite} alt=""/>
          </div>
          <div>
            <input
              type="text"
              className="tagsearchinput"
              placeholder="enter a tag"
              value={this.props.searchtagentry}
              onChange={this.props.updateSearchTagsInput}
            />
            <div className="searchtagsbutton" onClick={()=>this.props.searchtags()}>
              search
            </div>
            <Tagposts
              tagsearchdata={this.props.tagsearchdata}
              searchtagentry={this.props.searchtagentry}
              updateSearchTagsInput={this.props.updateSearchTagsInput}
              searchtags={this.props.searchtags}
              exitblackpage={this.props.exitblackpage}
              deleteiconwhite={this.props.deleteiconwhite}
              searchpagecontent={this.props.searchpagecontent}
              searchbar={this.props.searchbar}
              searchButton={this.props.searchButton}
              GroupId={this.props.group_id}
              postData={this.props.postData}
              username={this.props.username}
              handleDeletePostFunctions={this.props.handleDeletePostFunctions}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Searchtags;
