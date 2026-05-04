<div align="center">
  
  # NirmaanNow 🧠✨
  
  **An Elite AI-Powered Life Operating System** <br/>
  *Build Better. Start Now.*

  <p align="center">
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" /></a>
    <a href="https://cloud.google.com/run"><img src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white" alt="GCP" /></a>
    <a href="https://ai.google.dev/"><img src="https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge&logo=google-bard&logoColor=white" alt="Gemini" /></a>
  </p>
</div>

---

## 📖 Overview

**NirmaanNow** isn't just a habit tracker—it's a holistic, highly technological environment designed to help you architect a better life. Featuring an ethereal, glassmorphic UI and an omnipresent AI companion powered by Google Gemini, NirmaanNow learns your habits, tracks your moods, and provides deeply personalized insights.

## ✨ Core Features

* 🤖 **Context-Aware Gemini AI:** An omnipresent AI companion (`OmniAssistant`) that reads your habits and moods to give personalized, empathetic advice. Features native **Voice Input (Speech-to-Text)** and a beautiful typewriter text-reveal UI.
* 🌌 **Ethereal Glassmorphism Design:** A deep cosmic navy aesthetic, floating glass panels, glowing accents, and fluid `Framer Motion` micro-animations.
* 📈 **Advanced Analytics:** High-end data visualizations using `Recharts` to map your emotional and productivity trends.
* 🎯 **Smart Habit & Goal Tracking:** Visually rewarding milestone tracking and progress bars.
* 📓 **Serene Journaling:** A beautiful, distraction-free environment for daily reflection.
* 🔐 **Secure Authentication:** Integrated Google OAuth and secure JWT-based email/password authentication.

---

## 🛠️ Technology Stack

### Frontend Architecture
* **Framework:** React 19 + Vite (TypeScript)
* **Styling:** Tailwind CSS with a custom-built Glassmorphism Design System.
* **Animations:** Framer Motion
* **AI Integration:** `@google/generative-ai` & Web Speech API
* **Data Visualization:** Recharts
* **Icons:** Lucide React

### Backend Architecture
* **Runtime:** Node.js + Express.js
* **Database:** MongoDB (Mongoose ORM)
* **Security:** JWT Authentication, Bcrypt password hashing.
* **API:** RESTful endpoints for habits, moods, goals, and journaling.

### Infrastructure & Deployment
* **Containerization:** Multi-stage Docker build separating frontend static assets and backend Node server.
* **Cloud Hosting:** Google Cloud Run for highly available, serverless execution.

---

## 🚀 Architecture

This platform leverages modern web technologies to provide a seamless, highly responsive user experience. 
The architecture is divided into a robust React frontend and a secure Node.js backend, containerized via Docker for reliable deployment.

---

## 💻 Local Development Setup

To run NirmaanNow locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/Shivangi1515/NirmaanNow.git
cd NirmaanNow
```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and configure environment variables.
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and set up your environment.
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` folder:
```env
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```
Start the Vite development server:
```bash
npm run dev
```
**Access the app at:** `http://localhost:5173`

---

## ☁️ Live Deployment

NirmaanNow is fully containerized and deployed on **Google Cloud Run**.

🔗 **Live Platform:** [https://nirmaannow-wywy5r7gga-uc.a.run.app](https://nirmaannow-wywy5r7gga-uc.a.run.app)

---
<div align="center">
  <i>Designed & Developed to help you build better. Start Now.</i>
</div>
