import React, { useState, useEffect } from 'react';

export default function NoteForm({ onSubmit, initial }) {
  const [note, setNote] = useState({ title: '', description: '' });

  useEffect(() => {
    if (initial) setNote(initial);
  }, [initial]);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(note); setNote({title:'',description:''}); }}>
      <input placeholder="Title" required value={note.title} onChange={e=>setNote({...note, title:e.target.value})} />
      <textarea placeholder="Description" required value={note.description} onChange={e=>setNote({...note, description:e.target.value})} />
      <button type="submit">Save</button>
    </form>
  );
}
