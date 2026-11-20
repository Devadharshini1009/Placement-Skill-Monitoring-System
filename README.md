# Placement Skill Monitoring Management System — Question 1

This project covers **Question 1** of FSWD Assignment 2:
- Home, Add Student Skills, and Student Skill List pages
- React Router: `BrowserRouter`, `Routes`, `Route`, and `Link`
- Student form: student details, technical skills, aptitude score, communication skills, placement readiness
- REST APIs: POST, GET, PUT, DELETE

## Requirements
- Node.js (LTS)
- VS Code

## 1. Run the backend
Open a terminal in VS Code:

```bash
cd backend
npm install
npm run dev
```

Backend runs at `http://localhost:5000`.

## 2. Run the frontend
Open a **second terminal**:

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`).

## Notes
- This Question 1 version uses temporary in-memory storage in the backend so it runs without MongoDB.
- Records remain available while the backend server is running; restarting the backend clears them.
- MongoDB/Mongoose will be added for Question 3.
- This version uses the browser `fetch()` API. Axios integration is a separate requirement in Question 2.

## API endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/students` | Retrieve all student records |
| GET | `/api/students/:id` | Retrieve one student |
| POST | `/api/students` | Add a student record |
| PUT | `/api/students/:id` | Update a student record |
| DELETE | `/api/students/:id` | Delete a student record |

## Suggested demonstration
1. Open Home page.
2. Navigate to Add Student Skills and submit a record.
3. Open Student Skill List and view the saved record.
4. Use Edit to update a record.
5. Use Delete to remove a record.
