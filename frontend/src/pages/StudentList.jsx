import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getStudents, updateStudent, deleteStudent } from "../api/studentApi.js";
import StudentForm from "../components/StudentForm.jsx";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const location = useLocation();
  const [notice, setNotice] = useState(location.state?.notice || "");

  async function loadStudents() {
    setLoading(true);
    setError("");
    try {
      setStudents(await getStudents());
    } catch (err) {
      setError(`${err.message} Make sure the backend is running on port 5000.`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this student record?")) return;
    try {
      await deleteStudent(id);
      setNotice("Student record deleted successfully.");
      await loadStudents();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdate(student) {
    try {
      await updateStudent(editingStudent.id, student);
      setEditingStudent(null);
      setNotice("Student record updated successfully.");
      await loadStudents();
    } catch (err) {
      throw err;
    }
  }

  return (
    <section className="page-section">
      <div className="page-heading heading-row">
        <div>
          <div className="eyebrow">ASSESSMENT RECORDS</div>
          <h1>Student Skill List</h1>
          <p>View, update, and remove student skill assessment records.</p>
        </div>
        <button className="button secondary" onClick={loadStudents}>↻ Refresh</button>
      </div>

      {notice && <div className="alert success">{notice}<button onClick={() => setNotice("")}>×</button></div>}
      {error && <div className="alert error">{error}</div>}

      {editingStudent && (
        <div className="panel edit-panel">
          <div className="heading-row">
            <h2>Update Student Record</h2>
            <button className="text-button" onClick={() => setEditingStudent(null)}>Cancel</button>
          </div>
          <StudentForm initialData={editingStudent} onSubmit={handleUpdate} submitLabel="Update Student Record" />
        </div>
      )}

      <div className="panel list-panel">
        {loading ? <p className="empty-state">Loading student records...</p> :
          students.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">▤</div>
              <h2>No student records yet</h2>
              <p>Add a student assessment to see the record here.</p>
            </div>
          ) : (
            <>
              <div className="list-summary"><strong>{students.length}</strong> student record(s) found</div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Technical Skills</th>
                      <th>Aptitude</th>
                      <th>Communication</th>
                      <th>Readiness</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td>
                          <strong>{student.studentName}</strong>
                          <span className="sub-cell">{student.registerNumber}</span>
                          <span className="sub-cell">{student.department} · {student.year}</span>
                        </td>
                        <td>{Array.isArray(student.technicalSkills) ? student.technicalSkills.join(", ") : student.technicalSkills}</td>
                        <td><span className="score">{student.aptitudeScore}/100</span></td>
                        <td>{student.communicationSkills}</td>
                        <td><span className={`status ${student.placementReadiness.toLowerCase().replaceAll(" ", "-")}`}>{student.placementReadiness}</span></td>
                        <td>
                          <div className="action-group">
                            <button className="small-button edit" onClick={() => { setEditingStudent(student); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Edit</button>
                            <button className="small-button delete" onClick={() => handleDelete(student.id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
      </div>
    </section>
  );
}
