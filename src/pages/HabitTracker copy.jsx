import { useState, useEffect } from "react";
import "./HabitTracker.css";
import api from "../services/api"

export default function HabitTracker() {
  const [habitList, setHabitList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getHabitList = async () => {
    const data = await api.getHabitList();
    setHabitList(data);
  }

  useEffect(() => {
  const fetchData = async () => {
    getHabitList();
    setLoading(false);
  };
  fetchData();
  }, []);

  const habitNamesDummy = [
    "Shalat Subuh di Mesjid"
  ];

  // const habitNames = habitNamesDummy
  const habitNames = habitList

  // -----------------------------
  // STATE BULAN & TAHUN
  // -----------------------------
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  // -----------------------------
  // HITUNG HARI PER BULAN & TAHUN
  // -----------------------------
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate(); 
  };

  const days = Array.from({ length: getDaysInMonth(month, year) }, (_, i) => i + 1);

  // -----------------------------
  // PROGRESS STATE (DYNAMIC LENGTH)
  // -----------------------------
  const [progress, setProgress] = useState({});

  // Reset progress saat bulan/tahun berubah
  useEffect(() => {
    // if (loading) return;
    if (habitNames.length === 0) return; 
    const p = {};
    habitNames.forEach((h) => {
      p[h] = Array(days.length).fill(false);
    });
    setProgress(p);
  }, [habitNames, month, year]);

  // -----------------------------
  // TOGGLE CELL + CALL API
  // -----------------------------
  const toggleCell = async (habit, dayIndex) => {
    const newValue = !progress[habit][dayIndex];

    try {


      // const res = await api.putHabit(payload)
      // const res = await fetch("/api/habit/update", {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     habitName: habit,
      //     year,
      //     month: month + 1,
      //     day: dayIndex + 1,
      //     isDone: newValue
      //   }),
      // });

      const res = {"ok" : true}

      // res.ok = true;

      if (!res.ok) throw new Error("Update gagal");

      setProgress((prev) => ({
        ...prev,
        [habit]: prev[habit].map((v, idx) => (idx === dayIndex ? newValue : v)),
      }));
    } catch (err) {
      console.error(err);
      alert("Gagal update ke server");
    }
  };

  return (
    <div className="tracker-container">
      {/* ------------------------ */}
      {/* DROPDOWN PILIH BULAN/TAHUN */}
      {/* ------------------------ */}
      <div className="month-year-select">
        <select className ="sel" value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {monthNames.map((m, i) => (
            <option key={i} value={i}>
              {m}
            </option>
          ))}
        </select>

        <select className ="sel" value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {Array.from({ length: 5 }, (_, i) => currentYear - 2 + i).map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </div>
      <h4>Habit Tracker {monthNames[month]} {year}</h4>
      {/* ------------------------ */}
      {/* TABEL HABIT */}
      {/* ------------------------ */}
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

              {progress[habit]?.map((checked, i) => (
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

      
      <div>
        <a href="/update-habit" target="_blank">
          <button className="btn">Update List Habit</button>
        </a>
      </div>

    </div>

  );
}
