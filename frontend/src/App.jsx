import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import AddStudent from "./pages/AddStudent.jsx";
import StudentList from "./pages/StudentList.jsx";
import "./styles.css";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="*" element={<div className="panel"><h2>Page not found</h2><p>Use the navigation links to continue.</p></div>} />
        </Routes>
      </main>
      <footer>Placement Skill Monitoring Management System · FSWD Assignment 2</footer>
    </div>
  );
}
