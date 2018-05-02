import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    };
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });
    clearInterval(this.timerID);
    this.timerID = setInterval(
      () => this.save(),
      2000
    );
  }
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
    clearInterval(this.timerID);
    this.timerID = setInterval(
      () => this.save(),
      2000
    );
  }
  handleRemoval(){
    this.props.call('notes.remove', this.props.note._id);
    this.props.browserHistory.push('/dashboard');
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.save(),
      2000
    );
  }

  save() {
    let body = this.state.body;
    let title = this.state.title;
    this.props.call('notes.update', this.props.note._id, { body });
    this.props.call('notes.update', this.props.note._id, { body });
  }

  componentWillReceiveProps(nextProps) {
    const url = window.location.href;
    const partitionedUrl = url.split('/');
    let note = Notes.findOne(partitionedUrl[4]);
    note ? this.setState({
      title : note.title,
      body : note.body
    }) : null;
  }

  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
    }
    
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  render() {
    if (this.props.note) {
      return (
        <div className="editor">
          <input className="editor__title" value={this.state.title} placeholder="Untitled Post" onChange={this.handleTitleChange.bind(this)}/>
          <textarea className="editor__body" value={this.state.body} placeholder="Your post here" onChange={this.handleBodyChange.bind(this)}></textarea>
          <div>
            <button className="button button--secondary" onClick={this.handleRemoval.bind(this)}>Delete</button>
          </div>
          <div>
            <strong>{`Sharable Link - http://localhost:3000/live/${this.props.selectedNoteId}`}</strong>
          </div>
        </div>
      );
    } else {
      return (
        <div className="editor">
          <p className="editor__message">
            { this.props.selectedNoteId ? 'Post not found.' : 'Pick or create a post to get started.'}
          </p>
        </div>
      );
    }
  }
};

Editor.propTypes = {
  note: React.PropTypes.object,
  selectedNoteId: React.PropTypes.string,
  call: React.PropTypes.func.isRequired,
  browserHistory: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  const url = window.location.href;
  const partitionedUrl = url.split('/');
  
  return {
    selectedNoteId : partitionedUrl[4],
    note: Notes.findOne(partitionedUrl[4]),
    call: Meteor.call,
    browserHistory
  };
}, Editor);
