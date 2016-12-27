import React, { Component } from 'react';

class Creategroup extends Component {

  render(){
    return (
      <div className="inline">
        <div className={this.props.creategroupbutton} onClick={this.props.showcreategroup}>join group</div>
        <div className={this.props.creategroupdisplay}>
          <div className="creategroupbar">
            <input
            className="headerinput"
            type="text"
            placeholder="enter group name"
            onChange={this.props.trackCreateGroup}
            />
            <div onClick={this.props.creategroup} className="createbutton">
              join
            </div>
          </div>
        </div>
        <div className={this.props.leavegroupbutton} onClick={this.props.showleavegroup}>leave group</div>
      </div>
    );
  }
}

export default Creategroup;
