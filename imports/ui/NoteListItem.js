import React from 'react';
import moment from 'moment';                                                                                                                                                                                                                                                                                                                                                                                                                    
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
export const NoteListItem = (props) => {
  
  const className = props.note.selected ? 'item item--selected' : 'item';

  return (
    <div className={className} onClick={() => {
      browserHistory.replace(`/dashboard/${props.note._id}`);
    }}>
      <h5 className="item__title">{ props.note.title || 'Untitled note' }</h5>
      <p className="item__subtitle">{ moment(props.note.updatedAt).format('M/DD/YY') }</p>
    </div>
  );
};

NoteListItem.propTypes = {
  note: React.PropTypes.object.isRequired,
};

export default createContainer((props) => {
  return { props };
}, NoteListItem);
