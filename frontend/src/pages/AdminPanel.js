import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import NoteItem from '../components/NoteItem';

export default function AdminPanel(){
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [err, setErr] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (e) { setErr('Could not load users (admin only)'); }
  };
  const fetchNotes = async () => {
    try {
      const res = await api.get('/admin/notes');
      setNotes(res.data);
    } catch (e) { setErr('Could not load notes (admin only)'); }
  };

  useEffect(()=>{ fetchUsers(); fetchNotes(); }, []);

  const deleteNote = async (id) => {
    if (!window.confirm('Delete this note as admin?')) return;
    try {
      await api.delete(`/admin/notes/${id}`);
      setNotes(prev => prev.filter(n => n._id !== id));
    } catch (e) { setErr('Admin delete failed'); }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      {err && <p className="error">{err}</p>}
      <section>
        <h3>Registered Users</h3>
        {users.length===0 ? <p>No users found.</p> : (
          <ul>
            {users.map(u=> <li key={u._id}>{u.name || '-'} — {u.email} — {u.role}</li>)}
          </ul>
        )}
      </section>

      <section>
        <h3>All Notes</h3>
        {notes.length===0 ? <p>No notes found.</p> : notes.map(n=> (
          <div key={n._id}>
            <p><strong>{n.title}</strong> by {n.user?.email || 'unknown'}</p>
            <p>{n.description}</p>
            <button onClick={()=>deleteNote(n._id)}>Delete note</button>
            <hr/>
          </div>
        ))}
      </section>
    </div>
  );
}
