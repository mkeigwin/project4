import React, { Component } from 'react';
import GroupSelectItem from '../groupselectitem/GroupSelectItem.jsx';

// create a React Component called _App_
class GroupSelect extends Component {

  renderUserGroups() {
    return this.props.usergroups.map((result, i) =>
      <GroupSelectItem
        handleChooseGroup={this.props.handleChooseGroup}
        GroupId={result.group_id}
        GroupName={result.name}
        key={i}
      />
      )
  }

  render(){
    return (
      <div className={this.props.userGroupSelectDisplay}>
        {this.renderUserGroups()}
      </div>
    );
  }
}

export default GroupSelect;
