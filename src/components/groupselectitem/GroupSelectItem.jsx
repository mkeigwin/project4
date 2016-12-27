import React, { Component } from 'react';

export default class GroupSelectItem extends Component{

  render(){
    return (
      <div className="UserGroup-Container">
        <div onClick={() => this.props.handleChooseGroupFunctions(this.props.GroupId, this.props.GroupName)}>
          <p className="usergroupP">{this.props.GroupName}</p>
        </div>
      </div>
    );
  }
}
