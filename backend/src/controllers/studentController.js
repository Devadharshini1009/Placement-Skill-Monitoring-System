import { students } from "../data/studentStore.js";

const requiredFields = [
  "studentName",
  "registerNumber",
  "department",
  "year",
  "technicalSkills",
  "aptitudeScore",
  "communicationSkills",
  "placementReadiness"
];

function validateStudent(data) {
  const missing = requiredFields.filter((field) => {
    const value = data[field];
    return value === undefined || value === null || String(value).trim() === "";
  });

  if (missing.length) {
    return `Please provide: ${missing.join(", ")}`;
  }

  const score = Number(data.aptitudeScore);
  if (!Number.isFinite(score) || score < 0 || score > 100) {
    return "Aptitude score must be between 0 and 100.";
  }

  return null;
}

export function getAllStudents(req, res) {
  res.status(200).json(students);
}

export function getStudentById(req, res) {
  const student = students.find((item) => item.id === req.params.id);
  if (!student) {
    return res.status(404).json({ message: "Student record not found." });
  }
  res.status(200).json(student);
}

export function createStudent(req, res) {
  const error = validateStudent(req.body);
  if (error) return res.status(400).json({ message: error });

  const student = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ...req.body,
    aptitudeScore: Number(req.body.aptitudeScore),
    createdAt: new Date().toISOString()
  };

  students.push(student);
  res.status(201).json({ message: "Student skill record added successfully.", student });
}

export function updateStudent(req, res) {
  const index = students.findIndex((item) => item.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Student record not found." });
  }

  const updatedData = { ...students[index], ...req.body };
  const error = validateStudent(updatedData);
  if (error) return res.status(400).json({ message: error });

  updatedData.aptitudeScore = Number(updatedData.aptitudeScore);
  students[index] = updatedData;

  res.status(200).json({
    message: "Student skill record updated successfully.",
    student: students[index]
  });
}

export function deleteStudent(req, res) {
  const index = students.findIndex((item) => item.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Student record not found." });
  }

  students.splice(index, 1);
  res.status(200).json({ message: "Student skill record deleted successfully." });
}
