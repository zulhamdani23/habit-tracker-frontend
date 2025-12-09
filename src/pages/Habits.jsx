import { useEffect, useState } from "react";
import axios from "axios";

export default function Habits({ refresh }) {
  const [habits, setHabits] = useState([]);
  const [todayCompleted, setTodayCompleted] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    load();
  }, [refresh]);

  async function load() {
    const res = await axios.get("http://localhost:5000/habits");
    setHabits(res.data);
  }

  async function toggle(habitId) {
    await axios.post("http://localhost:5000/check", {
      habitId,
      date: today,
    });

    // reload list
    const completedRes = await axios.get(`http://localhost:5000/check/${today}`);
    setTodayCompleted(completedRes.data);
  }

  useEffect(() => {
    axios.get(`http://localhost:5000/check/${today}`).then((res) => {
      setTodayCompleted(res.data);
    });
  }, []);

  return (
    <div>
      <h3>Today's Habits ({today})</h3>
      {habits.map((h) => (
        <div key={h.id}>
          <input
            type="checkbox"
            checked={todayCompleted.includes(h.id)}
            onChange={() => toggle(h.id)}
          />
          {h.name}
        </div>
      ))}
    </div>
  );
}
