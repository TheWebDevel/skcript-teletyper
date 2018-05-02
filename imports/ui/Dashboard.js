import React from 'react';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <PrivateHeader title="Skcript TeleTyper"/>
        <div className="page-content">
          <div className="page-content__sidebar">
            <NoteList id={this.props.params.id}/>
          </div>
          <div className="page-content__main">
            <Editor id={this.props.params.id}/>
          </div>
        </div>
      </div>
    );
  }
};
