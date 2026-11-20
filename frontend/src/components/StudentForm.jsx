import { useEffect, useState } from "react";

const emptyForm = {
  studentName: "",
  registerNumber: "",
  department: "Information Technology",
  year: "3rd Year",
  email: "",
  technicalSkills: "",
  aptitudeScore: "",
  communicationSkills: "Average",
  placementReadiness: "In Progress"
};

export default function StudentForm({ initialData, onSubmit, submitLabel }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        ...emptyForm,
        ...initialData,
        technicalSkills: Array.isArray(initialData.technicalSkills)
          ? initialData.technicalSkills.join(", ")
          : initialData.technicalSkills || ""
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const payload = {
      ...form,
      technicalSkills: form.technicalSkills.split(",").map((skill) => skill.trim()).filter(Boolean),
      aptitudeScore: Number(form.aptitudeScore)
    };

    try {
      await onSubmit(payload);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      {error && <div className="alert error">{error}</div>}
      <div className="form-grid">
        <label>
          Student Name *
          <input name="studentName" value={form.studentName} onChange={handleChange} placeholder="Enter student name" required />
        </label>
        <label>
          Register Number *
          <input name="registerNumber" value={form.registerNumber} onChange={handleChange} placeholder="Enter register number" required />
        </label>
        <label>
          Department *
          <input name="department" value={form.department} onChange={handleChange} required />
        </label>
        <label>
          Year *
          <select name="year" value={form.year} onChange={handleChange}>
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>
        </label>
        <label className="full-width">
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="student@example.com" />
        </label>
        <label className="full-width">
          Technical Skills * <span className="hint">(Separate skills using commas)</span>
          <input name="technicalSkills" value={form.technicalSkills} onChange={handleChange} placeholder="Java, Python, React, SQL" required />
        </label>
        <label>
          Aptitude Score (0–100) *
          <input type="number" name="aptitudeScore" min="0" max="100" value={form.aptitudeScore} onChange={handleChange} placeholder="e.g. 80" required />
        </label>
        <label>
          Communication Skills *
          <select name="communicationSkills" value={form.communicationSkills} onChange={handleChange}>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Needs Improvement">Needs Improvement</option>
          </select>
        </label>
        <label className="full-width">
          Placement Readiness Status *
          <select name="placementReadiness" value={form.placementReadiness} onChange={handleChange}>
            <option value="Ready">Ready</option>
            <option value="In Progress">In Progress</option>
            <option value="Not Ready">Not Ready</option>
          </select>
        </label>
      </div>
      <button className="button primary" type="submit">{submitLabel}</button>
    </form>
  );
}
