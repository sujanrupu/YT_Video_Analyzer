# 📺 YouTube Video Analyzer 🔍

This project analyzes YouTube videos by summarizing content, extracting keywords, generating probable Q&A, translating summaries, and creating quizzes — all powered by Google Gemini AI.

---

## 🚀 Live Deployment Links

https://video-analysis-frontend.vercel.app/


---

## 🏗 Project Structure

```
yt-video-analyzer/
├── backend/       # Spring Boot REST API
│   └── src/main/java/com/sujan/analyzer/
├── frontend/      # React Frontend
│   └── src/components/
```

---

# 💻 Technologies Used

- **Backend**: Spring Boot 3.x (Java 17)
- **Frontend**: React + TailwindCSS
- **AI Model**: Google Gemini Generative AI (via API)
- **Build Tools**: Maven, Node.js
- **Deployment**: Render (Backend), Netlify (Frontend)

---

# ⚙️ Backend Setup (Spring Boot)

### Prerequisites

- Java 17+
- Maven
- Google Gemini API Key

### Setup Steps

```bash
cd backend
```

1. Place your API Key in:

```properties
src/main/resources/application.properties

server.port=5000
gemini.api.key=YOUR_GEMINI_API_KEY_HERE
```

2. Run the backend:

```bash
mvn spring-boot:run
```

API runs at `http://localhost:5000`

---

# 🎨 Frontend Setup (React)

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Steps

```bash
cd frontend
npm install
npm start
```

App runs at `http://localhost:3000`

Ensure your frontend API calls target your backend (localhost or deployed URL).

---

# 📚 Features

✅ Summarize YouTube Videos  
✅ Extract Top Keywords  
✅ Translate Summaries (e.g., Hindi, Bengali)  
✅ Ask Custom Questions  
✅ Generate Probable Q&A  
✅ Auto-Generate MCQ Quizzes  
✅ Visual Quiz Score Feedback  
✅ Fully Responsive Dark Mode Interface  

---

# 🌍 API Endpoints (Backend)

| Method | Endpoint           | Description                             |
|--------|-------------------|-----------------------------------------|
| POST   | `/api/summary`     | Generate video summary and keywords     |
| POST   | `/api/question`    | Ask questions based on the video        |
| POST   | `/api/translate`   | Translate summary to another language   |
| POST   | `/api/probable-qa` | Generate probable Q&A pairs             |
| POST   | `/api/quiz`        | Generate MCQ quiz from summary          |
| POST   | `/api/quiz-score`  | Submit quiz answers and get score       |

---


# 🧑‍💻 Author

Developed by **Sujan Ghosh**  

---

# 📌 Future Improvements

- Google Gemini SDK for actual AI calls  
- Persistent database for quiz history  
- Enhanced multilingual support  
- Better error handling & input validation  
