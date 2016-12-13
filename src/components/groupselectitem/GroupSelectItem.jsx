import React, { Component } from 'react';

export default class GroupSelectItem extends Component{

  render(){
    return (
      <div className="UserGroup-Container">
        <div onClick={() => this.props.handleChooseGroupFunctions(this.props.GroupId)}>
          <p>{this.props.GroupName}</p>
        </div>
      </div>
    );
  }
}
