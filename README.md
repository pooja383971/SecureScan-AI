# 🛡️ SecureScan AI

> AI-Powered Security Scanning Platform for Websites and Android Applications.

[![Live Demo](https://img.shields.io/badge/🚀%20LIVE%20DEMO-SecureScan%20AI-success?style=for-the-badge)](https://secure-scan-ai-psi.vercel.app/)
[![Frontend](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)](https://secure-scan-ai-psi.vercel.app/)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge)](https://securescan-ai-1.onrender.com/)
[![React](https://img.shields.io/badge/React-JavaScript-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-Java-6DB33F?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

---

## 🚀 Live Project

### ⭐ [🔗 OPEN SECURESCAN AI — LIVE DEMO](https://secure-scan-ai-psi.vercel.app/)

**Frontend:** React.js + Vercel  
**Backend:** Spring Boot + Render  
**Database:** MySQL

### Deployment

| Component | Technology | Link |
|---|---|---|
| 🌐 Frontend | React + Vercel | [Live Application](https://secure-scan-ai-psi.vercel.app/) |
| ⚙️ Backend | Spring Boot + Render | [Backend](https://securescan-ai-1.onrender.com/) |
| 🗄️ Database | MySQL | Private / Server-side |

> 🔒 Database credentials and connection details are not publicly exposed.

---

# 📌 Project Overview

**SecureScan AI** is a full-stack cybersecurity platform designed to help users analyze websites and Android applications for potential security risks.

The platform provides a centralized dashboard where users can:

- Register and securely log in
- Scan websites
- Analyze Android APK files
- View security scores
- Review vulnerabilities
- View scan history
- Generate security reports
- Manage their profile and settings

The application follows a modern full-stack architecture using **React.js for the frontend**, **Spring Boot for the backend**, and **MySQL for data persistence**.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- Token-based authentication
- Protected routes
- User-specific data
- Profile management

## 🌐 Website Security Scanner

The website scanner analyzes:

- SSL Certificate
- HTTPS
- DNS
- Security Headers
- Security Risk
- Overall Security Score

## 📱 APK Security Scanner

The APK scanner provides:

- APK file analysis
- Package information
- Certificate information
- Permission information
- Malware detection information
- Risk-level classification

## 📊 Security Dashboard

The dashboard provides:

- Overall security score
- Recent scans
- Security statistics
- Scan recommendations
- Quick navigation

## 📜 Scan History

Users can view:

- Previous scans
- Scan type
- Scan status
- Security score
- Scan date

## 📄 Security Reports

Users can:

- View scan results
- Generate reports
- Download security reports

## 👤 User Management

- User Profile
- Account Settings
- Notifications
- User-specific scan information

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │        USER          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │       Vercel         │
                    └──────────┬───────────┘
                               │
                         HTTPS / REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Spring Boot Backend │
                    │       Render         │
                    └──────────┬───────────┘
                               │
                  ┌────────────┴────────────┐
                  │                         │
                  ▼                         ▼
        ┌──────────────────┐      ┌──────────────────┐
        │      MySQL       │      │ Security Scanner │
        │     Database     │      │     Services     │
        └──────────────────┘      └──────────────────┘

User
  │
  ▼
Register / Login
  │
  ▼
Dashboard
  │
  ▼
New Scan
  │
  ├───────────────┐
  │               │
  ▼               ▼
Website Scan    APK Scan
  │               │
  ▼               ▼
Security        APK Analysis
Analysis
  │               │
  └───────┬───────┘
          │
          ▼
   Security Results
          │
          ▼
    Security Score
          │
          ▼
   Recommendations
          │
          ▼
 Reports / History
🛠️ Technology Stack
Frontend
React.js
JavaScript
HTML5
CSS3
Axios
React Router
React Toastify
Vite
Backend
Java
Spring Boot
Spring Web
Spring Data JPA
Hibernate
Spring Security
REST APIs
Maven
Database
MySQL
Deployment
Vercel — Frontend
Render — Backend
MySQL — Database
Development Tools
Git
GitHub
VS Code
Postman
npm
Maven
📂 Project Structure
SecureScan-AI/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── securescan/
│   │       │           └── backend/
│   │       │               ├── controller/
│   │       │               ├── service/
│   │       │               ├── repository/
│   │       │               ├── entity/
│   │       │               ├── dto/
│   │       │               └── config/
│   │       │
│   │       └── resources/
│   │
│   └── pom.xml
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
🔌 Main API Endpoints
Authentication
POST /api/auth/register
POST /api/auth/login
Website Scanner
POST /api/website/scan
APK Scanner
POST /api/apk/scan
Website Report
POST /api/reports/website/pdf
🔒 Security

SecureScan AI uses several security practices:

Token-based authentication
Protected frontend routes
CORS configuration
HTTPS deployment
Server-side database access
Environment variables for sensitive configuration
Separation between frontend and backend
No public database credentials

⚠️ Never commit passwords, API keys, database credentials, JWT secrets, or .env files to GitHub.

⚙️ Local Installation
1. Clone Repository
git clone https://github.com/pooja383971/SecureScan-AI.git
cd SecureScan-AI
2. Backend
cd backend

Configure your MySQL database and environment variables.

Run:

mvn spring-boot:run

Backend:

http://localhost:8080
3. Frontend

Open another terminal:

cd frontend

Install dependencies:

npm install

Run:

npm run dev

Frontend:

http://localhost:5173
🧪 API Testing

The REST APIs can be tested using Postman.

Example Login Request:

POST /api/auth/login
Content-Type: application/json

Example request:

{
  "email": "user@example.com",
  "password": "your-password"
}
📈 Future Enhancements
AI-based vulnerability detection
CVE database integration
Advanced APK static analysis
Automated vulnerability classification
Enhanced security analytics
Email security notifications
Role-based access control
CI/CD security scanning
Docker deployment
Advanced AI security recommendations
🎯 Project Objectives

The main objectives of SecureScan AI are:

Provide an easy-to-use cybersecurity scanning platform.
Analyze websites for common security risks.
Analyze Android applications for security concerns.
Provide understandable security scores.
Provide security recommendations.
Maintain scan history.
Generate security reports.
Demonstrate a production-style full-stack deployment.
🌐 Deployment Links
⭐ Live Application
🚀 Launch SecureScan AI
⚙️ Backend
Spring Boot Backend — Render
🗄️ Database

MySQL is used as the application's database and is kept private on the server side.

👩‍💻 Developer
Pooja Kumari

B.Tech — Computer Science & Engineering

⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
