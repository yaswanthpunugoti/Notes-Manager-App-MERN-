import React from 'react';

export default function NoteItem({ note, onEdit, onDelete }) {
  return (
    <div className="note">
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      <div className="note-actions">
        {onEdit && <button onClick={()=>onEdit(note)}>Edit</button>}
        <button onClick={()=>onDelete(note._id)}>Delete</button>
      </div>
    </div>
  );
}
