import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">STUDENT DEVELOPMENT · PLACEMENT READINESS</div>
        <h1>Build skills.<br /><span>Track readiness.</span></h1>
        <p>
          A simple platform to record student skill assessments, review technical
          and aptitude performance, and monitor placement readiness.
        </p>
        <div className="hero-actions">
          <Link className="button primary" to="/add-student">Add Student Skills</Link>
          <Link className="button secondary" to="/students">View Student List</Link>
        </div>
      </div>
      <div className="hero-card">
        <div className="card-top"><span>PLACEMENT MONITOR</span><span className="live-dot">● LIVE</span></div>
        <div className="hero-icon">✦</div>
        <h2>Student Skill Profile</h2>
        <p>Capture skills and assess readiness in one place.</p>
        <div className="mini-stat"><span>Technical skills</span><strong>Track & review</strong></div>
        <div className="mini-stat"><span>Aptitude score</span><strong>0–100</strong></div>
        <div className="mini-stat"><span>Readiness</span><strong>Ready / In Progress</strong></div>
      </div>
    </section>
  );
}
