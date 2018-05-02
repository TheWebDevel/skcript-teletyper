import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

export const NoteListHeader = (props) => {
  return (
    <div className="item-list__header">
      <button className="button" onClick={() => {
        props.meteorCall('notes.insert', (err, res) => {
          if (res) {
            browserHistory.replace(`/dashboard/${res}`);
          }
        });
      }}>Create Post</button>
    </div>
  );
};

NoteListHeader.propTypes = {
  meteorCall: React.PropTypes.func.isRequired,
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
  };
}, NoteListHeader);
