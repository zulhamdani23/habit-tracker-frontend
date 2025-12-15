import HabitTracker from "./pages/HabitTracker";
import HabitList from "./pages/HabitList";
import { BrowserRouter, Route, Routes } from "react-router";

const AppContent = () => {
  return (
    <>
      <Routes>
          <Route path="/" element={<HabitTracker />} />
          <Route path="/update-habit" element={<HabitList />} />
      </Routes>
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
