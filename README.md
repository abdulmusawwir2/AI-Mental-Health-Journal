# Mental Health Journal & AI Wellness Chatbot

A full-stack web application designed to help users track their mental well-being through secure journaling, AI-powered sentiment analysis, and a supportive chatbot companion.

##LIVE
frontend:https://ai-mental-health-journal-frontend.onrender.com/
backend:https://ai-mental-health-journal-levb.onrender.com

## 🌟 Features

*   **Secure Authentication**: User registration and login protected by JWT.
*   **Private Journal**: Write daily entries that are encrypted and stored securely.
*   **AI Mood Analysis**: Google Gemini AI analyzes your journal entries to detect your mood (e.g., Happy, Anxious, Calm) and provides supportive insights.
*   **Wellness Dashboard**: Track your journaling consistency and emotional trends.
*   **AI Companion Chat**: Have open, supportive conversations with an AI trained to listen and provide non-medical wellness guidance.

## 🚀 Getting Started

### Prerequisites

*   Node.js installed.
*   MongoDB Atlas Account (or local MongoDB).
*   Google Gemini API Key.

### 1. Backend Setup (Server)

1.  Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
2.  Install dependencies (if not already done):
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` folder with your credentials:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    GEMINI_API_KEY=your_google_gemini_api_key
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```
    *Server runs on http://localhost:5000*

### 2. Frontend Setup (UI)

1.  Open a new terminal and navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies (if not already done):
    ```bash
    npm install
    ```
3.  Start the application:
    ```bash
    npm run dev
    ```
    *App runs on http://localhost:5173*

## 📖 How to Use

1.  **Register**: Open the app in your browser. Click "Get Started" to create an account.
2.  **Dashboard**: After login, you'll see your dashboard. It gives you a quick overview of your stats.
3.  **Journaling**:
    *   Click **"New Entry"**.
    *   Write about your day or feelings.
    *   Click **"Analyze & Save"**.
    *   Wait a moment for the AI to process. It will save your entry and show you a **Mood Tag** and a **Helpful Insight**.
4.  **Chat**:
    *   Click **"AI Chat"** in the navigation.
    *   Type a message to the AI. It acts as a supportive friend.
    *   The chat history is saved, so you can continue conversations later.

## 🛠️ Tech Stack

*   **Frontend**: React, Vite, Tailwind CSS
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB
*   **AI**: Google Gemini API
