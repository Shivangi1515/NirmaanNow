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
    <a href="https://github.com/features/actions"><img src="https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Actions" /></a>
  </p>
</div>

---

## 📖 Overview

**NirmaanNow** isn't just a habit tracker—it's a holistic, highly technological environment designed to help you architect a better life. Featuring an ethereal UI and an omnipresent AI companion powered by Google Gemini, NirmaanNow learns your habits, tracks your moods, and provides deeply personalized insights.

## ✨ Core Features

* 🤖 **Context-Aware Gemini AI:** An omnipresent AI companion (`OmniAssistant`) with **Conversation Memory**. It reads your habits and moods to give personalized, empathetic advice. Features native **Voice Input (Speech-to-Text)** and a beautiful typewriter text-reveal UI.
* 📈 **Advanced Analytics:** High-end data visualizations using `Recharts` to map your emotional and productivity trends.
* 🎯 **Smart Habit & Goal Tracking:** Visually rewarding milestone tracking and progress bars.
* 📓 **Serene Journaling:** A beautiful, distraction-free environment for daily reflection.
* 🔐 **Secure Authentication:** Integrated Google OAuth and secure JWT-based authentication.
* 🚀 **Automated CI/CD:** Seamlessly deployed using GitHub Actions with Google Workload Identity Federation (Keyless Auth).

---

## 🛠️ Technology Stack

### Frontend Architecture
* **Framework:** React 19 + Vite (TypeScript)
* **Styling:** Tailwind CSS with a custom-built Design System.
* **Animations:** Framer Motion
* **AI Integration:** `@google/generative-ai` (Gemini 1.5 Flash) & Web Speech API
* **Data Visualization:** Recharts

### Backend Architecture
* **Runtime:** Node.js + Express.js
* **Database:** MongoDB (Mongoose ORM)
* **Security:** JWT Authentication, Bcrypt password hashing.
* **API:** RESTful endpoints for habits, moods, goals, and journaling.

### Infrastructure & Deployment
* **Containerization:** Multi-stage Docker build separating frontend static assets and backend Node server.
* **CI/CD:** GitHub Actions for automated building, testing, and deployment.
* **Security:** **Workload Identity Federation (WIF)** for keyless, secure authentication between GitHub and GCP.
* **Cloud Hosting:** Google Cloud Run for highly available, serverless execution.

---

## 🚀 DevOps & CI/CD

This project uses a robust CI/CD pipeline to ensure every push to `main` is automatically:
1. **Linted**: Code quality checks for the frontend.
2. **Built**: Multi-stage Docker containerization.
3. **Pushed**: Images are stored securely in Google Container Registry (GCR).
4. **Deployed**: Automatically deployed to Google Cloud Run with zero downtime.

---

## ☁️ Live Deployment

NirmaanNow is fully containerized and deployed on **Google Cloud Run**.



---
<div align="center">
  <i>Designed & Developed to help you build better. Start Now.</i>
</div>
