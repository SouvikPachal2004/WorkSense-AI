# WorkSense AI 🧠

**AI-Powered Workplace Productivity Monitoring Platform**

Real-time computer vision, deep learning, and behavioral ML that transforms live camera data into actionable productivity insights — for remote, office, and hybrid teams.

---

## 🚀 Features

- **YOLOv8 Employee Detection** — Real-time multi-person detection with bounding boxes
- **Attention & Focus Tracking** — Eye gaze, head pose, facial landmark analysis
- **Pose & Posture Analysis** — MediaPipe-based slouch and fatigue detection
- **Phone Usage Detection** — YOLO object detection for distractions
- **Productivity Score Engine** — Random Forest ML scoring (0–100)
- **Burnout Detection** — Time-series prediction of burnout risk
- **Anomaly Detection** — Isolation Forest & Autoencoders
- **AI Recommendation Engine** — Personalized focus and break suggestions
- **Multi-Employee Tracking** — DeepSORT unique ID tracking
- **Role-Based Dashboards** — Separate Admin and Employee views

---

## 🗂️ Project Structure

```
WorkSense-AI/
├── frontend/
│   ├── index.html              # Landing page
│   ├── css/
│   │   ├── variables.css       # Theme system (dark/light)
│   │   ├── index.css           # Landing page styles
│   │   ├── dashboard.css       # Shared dashboard styles
│   │   ├── login.css           # Login/signup styles
│   │   ├── employee.css        # Employee panel styles
│   │   ├── emp-dashboard.css   # Employee dashboard styles
│   │   └── reports.css         # Reports page styles
│   ├── js/
│   │   ├── index.js            # Landing page logic
│   │   ├── login.js            # Auth + role routing
│   │   ├── dashboard.js        # Admin dashboard charts
│   │   ├── emp-dashboard.js    # Employee dashboard charts
│   │   ├── admin.js            # Admin panel logic
│   │   ├── employee.js         # Employee panel logic
│   │   ├── analytics.js        # Analytics charts
│   │   └── reports.js          # Reports logic
│   └── pages/
│       ├── login.html          # Login / Sign Up (role selector)
│       ├── dashboard.html      # Admin real-time dashboard
│       ├── employee-dashboard.html  # Employee personal dashboard
│       ├── employee.html       # Employee management panel
│       ├── admin.html          # Admin control panel
│       ├── analytics.html      # Advanced analytics
│       └── reports.html        # Reports & export
├── backend/
│   ├── app.py                  # Flask application entry point
│   ├── config.py               # Configuration
│   ├── extensions.py           # Flask extensions (MongoDB, JWT)
│   └── routes/
│       ├── auth.py             # Authentication routes
│       ├── employees.py        # Employee data routes
│       ├── analytics.py        # Analytics API routes
│       ├── alerts.py           # Alert management routes
│       ├── reports.py          # Report generation routes
│       └── ai_feed.py          # AI/CV data feed routes
└── ml/
    └── (ML models and scripts — coming soon)
```

---

## 🎨 Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | HTML5, CSS3, JavaScript, Chart.js       |
| Backend    | Python Flask, REST API                  |
| Database   | MongoDB                                 |
| AI/CV      | OpenCV, YOLOv8, MediaPipe, TensorFlow   |
| ML         | Scikit-learn, Random Forest, K-Means    |
| Auth       | JWT (Flask-JWT-Extended)                |

---

## 🔐 Role-Based Access

| Role     | Access                                                      |
|----------|-------------------------------------------------------------|
| Admin    | Full dashboard, team analytics, employee management, alerts |
| Employee | Personal dashboard, my stats, AI tips, posture log          |

---

## ⚙️ Setup & Run

### Frontend
Open `frontend/index.html` in a browser, or serve with any static server:
```bash
npx serve frontend
```

### Backend
```bash
cd backend
pip install flask flask-cors flask-pymongo flask-jwt-extended
python app.py
```

### Environment Variables
Create a `.env` file in `backend/`:
```
MONGO_URI=mongodb://localhost:27017/worksense_ai
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret
```

---

## 📸 Screenshots

> Landing page, Admin Dashboard, Employee Dashboard, Analytics — all with dark/light theme support.

---

## 📄 License

MIT License — Free to use for all users.

---

Built with ❤️ using AI + Computer Vision
