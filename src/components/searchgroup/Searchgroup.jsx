import React, { Component } from 'react';

class Searchgroup extends Component {

  render(){
    return (
      <div className="searchjoingroupbar">
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
          <p className="clicktojoin">
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
