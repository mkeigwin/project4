import React, { Component } from 'react';
import GroupSelectItem from '../groupselectitem/GroupSelectItem.jsx';

class GroupSelect extends Component {

  renderUserGroups() {
    return this.props.usergroups.map((result, i) =>
      <GroupSelectItem
        handleChooseGroupFunctions={this.props.handleChooseGroupFunctions}
        GroupId={result.id}
        GroupName={result.name}
        key={i}
      />
      )
  }

  render(){
    return (
      <div className="groupSelection">
        {this.renderUserGroups()}
      </div>
    );
  }
}

export default GroupSelect;
