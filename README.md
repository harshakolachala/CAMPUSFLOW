# CAMPUSFLOW - Integrated Academic and Examination Management System

CampusFlow is a comprehensive platform designed to streamline academic operations, including syllabus management, hall ticket generation, seating allocation, and club event coordination.

## 🚀 Quick Start (Windows)

**PREREQUISITE**: You **must** have Node.js installed.
1.  Download and install from [nodejs.org](https://nodejs.org/).
2.  Restart your computer or terminal after installation.

### Automatic Startup
Double-click the **`start_app.bat`** file in this folder.
It will automatically:
1.  Install all dependencies.
2.  Setup the database.
3.  Launch both Client and Server.

---

### Manual Startup
If you prefer running commands manually:

#### 1. Start Backend (Server)
```bash
cd server
npm install
npx prisma db push
npm run dev
```
*Runs on: http://localhost:3000*

#### 2. Start Frontend (Client)
```bash
cd client
npm install
npm run dev
```
*Runs on: http://localhost:5173*

## Features

-   **Role-Based Access**: JWT authentication, protected API routes, permission checks, and specialized dashboards for students, faculty, admins, seating managers, and club coordinators.
-   **Study Support**: Upload a PDF syllabus, extract topics with NLP, and explore the generated interactive mind map.
-   **Examination Management**: Printable hall tickets and randomized seating plans with database persistence and CSV export.
-   **Club Events**: Students and coordinators submit event proposals; administrators approve or reject them.

## Configuration

The client uses `VITE_API_URL` when supplied and otherwise connects to `http://localhost:3000/api`. Set a strong `JWT_SECRET` for the server outside local development.

Dependencies are installed from the lockfiles and are intentionally not committed. Run `npm install` in both `client` and `server` when using the manual startup instructions.

## Project Structure

-   `client/`: React + TypeScript + Tailwind CSS frontend.
-   `server/`: Node.js + Express backend with SQLite database.

## Technology Stack

-   **Frontend**: React, TypeScript, Tailwind CSS, Vite, Lucide React (Icons), React Router DOM.
-   **Backend**: Node.js, Express, TypeScript.
-   **Database**: SQLite (configured via Prisma).
