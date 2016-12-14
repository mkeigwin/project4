import React, { Component } from 'react';

class Searchgroup extends Component {

  render(){
    return (
      <div className={this.props.searchjoingroupbar}>
        <div onClick={this.props.closegroupsearchwindow}>
          <img className="groupsearchdeleteicon" src={this.props.deleteicon} alt=""/>
        </div>
        <div className={this.props.checkdisplay}>
          <img className="checkimage" src={this.props.check} alt=""/>
        </div>
        <div className="creategroupbar">
          <input
          type="text"
          placeholder="create a group"
          onChange={this.props.trackCreateGroup}
          />
          <div onClick={this.props.createGroup} className="creategroupbutton">
            create
          </div>
        </div>
        <div className="searchgroupbar">
          <input
          type="text"
          placeholder="search for a group"
          onChange={this.props.trackSearchGroup}
          />
          <div onClick={this.props.searchGroup} className="searchgroupsbutton">
            search
          </div>
        </div>
        <div className="foundgroupsbar">
          <p className={this.props.clicktojoin}>
            <span onClick={this.props.joinGroup}>
              {this.props.searchGroupName}
            </span>
            click to join
          </p>
        </div>
      </div>
    );
  }
}

export default Searchgroup;
