import { useState } from "react";
import Habits from "./pages/Habits";
import HabitList from "./pages/HabitList";

export default function App() {
  const [refresh, setRefresh] = useState(false);
console.log("App rendered!");

  return (
    <div style={{ 
      maxWidth: 500, 
      margin: "0 auto",
      padding: "20px",
      fontFamily: "sans-serif"}}>
      <h1>Habit Tracker</h1>
      <HabitList onAdded={() => setRefresh(!refresh)} />
      <Habits refresh={refresh} />
    </div>
  );
}
