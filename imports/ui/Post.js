import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import { Notes } from '../api/notes';

export class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }
  
  componentDidUpdate() {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
  }
  render() {
    if (this.props.note) {
      return (
        <div className="editor">
            <h1>{this.state.title}</h1>
            <p className="white-space-pre">{this.state.body}</p>
        </div>
      );
    } else {
      return (
        <div className="editor">
          <p className="editor__message">
            { this.props.note ? 'Loading...' : null}
          </p>
        </div>
      );
    }
  }
};

export default createContainer((props) => {
  const selectedNoteId = props.id;
  
  return {
    note: Notes.findOne(selectedNoteId)
  };
}, Post);
