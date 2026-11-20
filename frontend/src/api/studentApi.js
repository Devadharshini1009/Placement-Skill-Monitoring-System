const API_URL = "http://localhost:5000/api/students";

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }
  return data;
}

export function getStudents() {
  return request(API_URL);
}

export function addStudent(student) {
  return request(API_URL, {
    method: "POST",
    body: JSON.stringify(student)
  });
}

export function updateStudent(id, student) {
  return request(`${API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(student)
  });
}

export function deleteStudent(id) {
  return request(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}
