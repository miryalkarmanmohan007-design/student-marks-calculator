# GradeFlow — Student Marks Calculator

A React + Vite frontend demo featuring signup, login, a dashboard, marks calculation, grading, saved results and logout.

## Run locally

1. Install Node.js 20.19+ or 22.12+.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL shown in your terminal (usually http://localhost:5173).

## Grading

Five subjects, each out of 100. Passing requires at least 35 marks in **every** subject. Overall grades for passing students: A+ >=90, A >=80, B >=70, C >=60, D >=50, E below 50. Any failed subject means grade F.

## Important security note

This is a frontend-only classroom demo. Accounts and results are stored in the browser's localStorage. Passwords are stored in plain text and must **never** be used for real accounts. A production version requires server-side authentication, password hashing, authorization, and a database.
