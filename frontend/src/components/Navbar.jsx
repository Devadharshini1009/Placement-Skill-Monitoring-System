import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-mark">PS</span>
        <span>Skill<span className="brand-light">Track</span></span>
      </Link>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/add-student">Add Student Skills</NavLink>
        <NavLink to="/students">Student Skill List</NavLink>
      </nav>
    </header>
  );
}
