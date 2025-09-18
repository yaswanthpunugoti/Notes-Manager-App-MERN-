import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/notes`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setDescription("");
      setShowModal(false);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/notes${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotes();
  };

  useEffect(() => {
    if (!token) navigate("/login");
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-white shadow px-6 py-4">
        <h1 className="text-2xl font-bold text-indigo-600">📒 My Notes</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Notes Grid */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No notes yet. Click + to add one!
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {note.title}
              </h3>
              <p className="text-gray-600 mt-2">{note.description}</p>
              <div className="flex justify-end mt-4 space-x-2">
                <button className="px-3 py-1 bg-yellow-400 rounded-lg text-sm">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Add Note Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-xl hover:bg-indigo-700 text-2xl"
      >
        +
      </button>

      {/* Modal for Adding Note */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Note</h2>
            <form onSubmit={handleAddNote} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
