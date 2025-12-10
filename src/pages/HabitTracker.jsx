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

  const [progress, setProgress] = useState(() => {
    const p = {};
    habitNames.forEach((h) => {
      p[h] = Array(31).fill(false);
    });
    return p;
  });

  const toggleCell = (habit, dayIndex) => {
    setProgress((prev) => ({
      ...prev,
      [habit]: prev[habit].map((val, idx) =>
        idx === dayIndex ? !val : val
      ),
    }));
  };

  return (
    <div className="tracker-container">
      <h1>January Habit Tracker</h1>

      <div className="tracker-grid">

        <div className="grid-row header">
          <div className="habit-title">DAILY HABITS</div>

          {days.map((d, i) => (
            <div
              key={d}
              className={`day-cell week-${Math.floor(i / 7) + 1}`}
            >
              {d}
            </div>
          ))}
        </div>

        {habitNames.map((habit) => (
          <div key={habit} className="grid-row">
            <div className="habit-name">{habit}</div>

            {progress[habit].map((checked, i) => (
              <div
                key={i}
                className={`cell week-${Math.floor(i / 7) + 1} ${
                  checked ? "checked" : ""
                }`}
                onClick={() => toggleCell(habit, i)}
              >
                {checked ? "✔" : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
