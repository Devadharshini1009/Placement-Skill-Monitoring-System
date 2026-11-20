import { useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm.jsx";
import { addStudent } from "../api/studentApi.js";

export default function AddStudent() {
  const navigate = useNavigate();

  async function handleAdd(student) {
    await addStudent(student);
    navigate("/students", { state: { notice: "Student skill record added successfully." } });
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <div className="eyebrow">STUDENT ASSESSMENT</div>
        <h1>Add Student Skills</h1>
        <p>Enter the student's details and current placement skill assessment.</p>
      </div>
      <div className="panel">
        <StudentForm onSubmit={handleAdd} submitLabel="Save Student Record" />
      </div>
    </section>
  );
}
