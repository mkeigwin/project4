import React, { Component } from 'react';

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
            <input type="text"/>
            <div className="searchtagsbutton" onClick="searchtags">search tags</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Searchtags;
