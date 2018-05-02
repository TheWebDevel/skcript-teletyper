import React from 'react';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Post from './Post';

export default class Live extends React.Component { 
  render() {
    return(
      <div>
        <PrivateHeader title="Skcript TeleTyper"/>
        <div className="page-content">
          <div className="page-content__main">
            <Post id={this.props.params.id}/>
          </div>
        </div>
      </div>
    );
  }
};
