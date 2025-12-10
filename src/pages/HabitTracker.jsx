import { useState } from "react";
import "./HabitTracker.css";

export default function HabitTracker() {
  const habitNames = [
    "No more than 3 coffees",
    "Bed by 10pm",
    "8 Hours Sleep",
    "Go to Gym",
    "Wake up at 7am",
    "Read before Bed",
    "Make Bed",
    "Eat Healthy Dinner",
    "No Sugar",
    "Meditate for 10 Minutes",
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // INISIAL STATE
  const [progress, setProgress] = useState(() => {
    const p = {};
    habitNames.forEach((h) => {
      p[h] = Array(days.length).fill(false);
    });
    return p;
  });

  // -----------------------------
  // TOGGLE CELL + HIT API UPDATE
  // -----------------------------
  const toggleCell = async (habit, dayIndex) => {
    const newValue = !progress[habit][dayIndex];

    try {
      // CALL API
      const res = await fetch("/api/habit/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          habit_name: habit,
          day: dayIndex + 1,
          is_done: newValue,
        }),
      });

      if (!res.ok) throw new Error("Update gagal");

      // UPDATE STATE SAAT API SUKSES
      setProgress((prev) => ({
        ...prev,
        [habit]: prev[habit].map((v, idx) =>
          idx === dayIndex ? newValue : v
        ),
      }));
    } catch (err) {
      console.error(err);
      alert("Gagal update ke server");
    }
  };

  return (
    <div className="tracker-container">
      <h1>January Habit Tracker</h1>

      <table className="habit-table">
        <colgroup>
          <col style={{ width: "180px" }} />
          {days.map((_, i) => (
            <col key={i} style={{ width: "35px" }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th className="habit-title">DAILY HABITS</th>

            {days.map((d) => (
              <th key={d} className="day-header">
                {d}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {habitNames.map((habit) => (
            <tr key={habit}>
              <td className="habit-name">{habit}</td>

              {progress[habit].map((checked, i) => (
                <td
                  key={i}
                  className={`cell ${checked ? "checked" : ""}`}
                  onClick={() => toggleCell(habit, i)}
                >
                  {checked ? "✔" : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
