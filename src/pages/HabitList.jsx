import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/habits";

function HabitList() {
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const getHabitList = async () => {
    const data = await api.getHabitList();
    setHabits(data);
  }

  // GET habits on load
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setHabits(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // UPDATE
      const res = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const updated = await res.json();
      setHabits(habits.map((h) => (h.id === editingId ? updated : h)));
      setEditingId(null);
    } else {
      // ADD
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const newHabit = await res.json();
      setHabits([...habits, newHabit]);
    }

    setName("");
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setHabits(habits.filter((h) => h.id !== id));
  };

  const openEdit = (habit) => {
    setEditingId(habit.id);
    setName(habit.name);
    setShowForm(true);
  };

  return (
    <div className="container">
      <h1>Habit Tracker</h1>

      <button className="btn primary" onClick={() => setShowForm(true)}>
        + Add Habit
      </button>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Habit Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((h, i) => (
            <tr key={h.id}>
              <td>{i + 1}</td>
              <td>{h.name}</td>
              <td>
                <button className="btn edit" onClick={() => openEdit(h)}>
                  Edit
                </button>
                <button className="btn delete" onClick={() => handleDelete(h.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {habits.length === 0 && (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No habits added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showForm && (
        <div className="modal">
          <form onSubmit={handleSubmit} className="card">
            <h2>{editingId ? "Edit Habit" : "Add New Habit"}</h2>

            <input
              type="text"
              placeholder="Habit name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div className="actions">
              <button type="submit" className="btn primary">
                Save
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setName("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default HabitList;
