# 🚀 JobTrackr — Modern Job Application Management System

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Styled Components](https://img.shields.io/badge/Styled_Components-💅-DB7093?logo=styled-components&logoColor=white)](https://styled-components.com/)
[![React Query](https://img.shields.io/badge/TanStack_Query-v4-FF4154?logo=react-query&logoColor=white)](https://tanstack.com/query)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

**JobTrackr** is a full-stack MERN application engineered to streamline the entire job search workflow. From application submission to interview scheduling and final outcomes, JobTrackr delivers real-time analytics, status pipelines, customizable filtering, and a modern user experience with seamless dark and light mode support.

---

## ✨ Key Features

- **📊 Comprehensive Analytics & Data Visualizations**
  - Interactive monthly application trends with toggleable **Area Charts** and **Bar Charts**.
  - Real-time **Doughnut / Status Breakdown Charts** comparing pending, interview, and declined counts.
  - KPI Stat summary cards with responsive hover elevation.

- **💼 End-to-End Application Tracking**
  - Create, view, edit, and delete job applications with company, position, status, job location, and job type.
  - Distinct status pill badges with subtle dot indicators (`Pending`, `Interview`, `Declined`).

- **🔍 Smart Search & Multi-Parametric Filtering**
  - Instant debounced keyword search across job titles and companies.
  - Multi-criteria filtering by **Status** (`all`, `pending`, `interview`, `declined`), **Type** (`all`, `full-time`, `part-time`, `internship`), and **Sort Order** (`latest`, `oldest`, `a-z`, `z-a`).
  - One-click filter reset.

- **🌓 Dynamic Dark & Light Mode**
  - Seamless theme switcher with persistent local storage preferences and smooth transitions.
  - Custom-tailored slate palettes and glassmorphic UI elements across all themes.

- **🔐 Robust Authentication & Security**
  - Secure JWT authentication stored in HTTP-only cookies.
  - Password hashing via `bcryptjs`, request validation, and sanitization.
  - Interactive password visibility toggles on login and registration forms.

- **🛡️ Advanced System Administration & Platform Intelligence**
  - **Executive KPI Dashboard**: Total registered candidates, tracked jobs, interviews scheduled, and pending submissions.
  - **Platform Application Velocity**: Monthly interactive trend visualization with Area/Bar toggle.
  - **Global Status & Contract Breakdown**: Real-time Doughnut chart distribution and percentage progress metrics.
  - **Recruitment Insights Leaderboards**: Top target companies and top application locations.
  - **User & Activity Directory**: Candidate registry roster and live platform-wide application feed.
  - **Report Exporting**: One-click print/export summary reports.

- **👤 User Profile & Avatar Uploads**
  - Update personal information and profile photos with cloud storage powered by **Cloudinary** and **Multer**.

- **📱 Fully Responsive Design**
  - Tailored for all viewports from mobile smartphones to ultra-wide desktop monitors.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 18](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Styling**: [Styled Components](https://styled-components.com/) + Modern CSS3 Design Tokens
- **State & Server Cache**: [@tanstack/react-query](https://tanstack.com/query)
- **Routing**: [React Router DOM v6](https://reactrouter.com/) (Data APIs & loaders/actions)
- **Charts & Data Viz**: [Recharts](https://recharts.org/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) (Feather, FontAwesome, Bootstrap, Material Design)
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/)
- **Dates**: [Day.js](https://day.js.org/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose ODM](https://mongoosejs.com/)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Security**: [Helmet](https://helmetjs.github.io/), [express-mongo-sanitize](https://github.com/fiznool/express-mongo-sanitize), [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit), [cookie-parser](https://github.com/expressjs/cookie-parser)
- **File Uploads**: [Multer](https://github.com/expressjs/multer), [Cloudinary](https://cloudinary.com/), [Datauri](https://github.com/nib-health-funds/datauri)
- **Validation**: [express-validator](https://express-validator.github.io/)

---

## 🚀 Quick Start & Local Setup

### Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v16.0 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster connection URI)
- [Cloudinary Account](https://cloudinary.com/) (Free account for profile avatar uploads)

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/Timothy970/Job-Tracker.git
cd Job-Tracker
```

---

### Step 2: Install Dependencies

#### On Windows / Powershell / CMD:
```bash
# Install root (backend) dependencies
npm.cmd install

# Install client (frontend) dependencies
npm.cmd --prefix client install
```

#### On macOS / Linux:
```bash
# Convenience script to install both root and client dependencies
npm run setup-project
```

---

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Configure the following variables in your `.env` file:
```env
PORT=5100
NODE_ENV=development
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/JobTrackr?retryWrites=true&w=majority
JWT_SECRET=your_jwt_super_secret_key_here
JWT_EXPIRES_IN=1d
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

---

### Step 4: Run in Development Mode

Run both the backend server and frontend development server simultaneously with hot reloading:

```bash
# Windows
npm.cmd run dev

# macOS / Linux
npm run dev
```

- **Frontend Client**: [http://localhost:5173](http://localhost:5173)
- **Backend API Server**: [http://localhost:5100](http://localhost:5100)

---

### Step 5: (Optional) Seed Database with Sample Jobs

To populate your dashboard with mock jobs data for testing:

1. Register a new user in the app with the email: `john@gmail.com`.
2. Stop the running server (`Ctrl + C`).
3. Run the seed script:
   ```bash
   node populate.js
   ```
4. Restart the server (`npm.cmd run dev` or `npm run dev`) and sign in as `john@gmail.com` to explore the populated dataset.

---

### Step 6: Build for Production

To build the client bundle and run the unified Express production server:

```bash
# Build frontend and prepare production dependencies
npm.cmd run setup-production-app   # On Windows
# or: npm run setup-production-app  # On Linux/macOS

# Start unified server
npm.cmd start
```
The full application will be served at `http://localhost:5100/`.

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Register a new user | Public |
| `POST` | `/api/v1/auth/login` | Authenticate user & issue JWT cookie | Public |
| `GET` | `/api/v1/auth/logout` | Clear auth token cookie | Authenticated |
| `GET` | `/api/v1/users/current-user` | Get logged-in user profile | Authenticated |
| `PATCH` | `/api/v1/users/update-user` | Update profile info & avatar | Authenticated |
| `GET` | `/api/v1/users/admin/app-stats`| Get overall user and job counts | Admin Only |
| `GET` | `/api/v1/jobs` | Get paginated & filtered jobs list | Authenticated |
| `POST` | `/api/v1/jobs` | Create a new job application | Authenticated |
| `GET` | `/api/v1/jobs/:id` | Get single job details | Authenticated |
| `PATCH` | `/api/v1/jobs/:id` | Update job application details | Authenticated |
| `DELETE` | `/api/v1/jobs/:id` | Remove a job application | Authenticated |
| `GET` | `/api/v1/jobs/stats` | Get application metrics & monthly trends | Authenticated |

---

## 📂 Project Structure

```text
Job-Tracker/
├── client/                     # Frontend React application (Vite)
│   ├── public/                 # Static public assets
│   ├── src/
│   │   ├── assets/             # Wrappers (styled-components), images, SVG icons
│   │   ├── components/         # Reusable UI components (Navbar, Sidebar, Charts, etc.)
│   │   ├── pages/              # Route pages (Landing, Login, Register, Dashboard, Stats, etc.)
│   │   ├── utils/              # Axios customFetch instance, nav links, constants
│   │   ├── App.jsx             # React Router configuration & query client provider
│   │   ├── index.css           # Modern design tokens, variables, & global styling
│   │   └── main.jsx            # React root entry point
│   ├── index.html              # HTML shell & font imports
│   ├── package.json            # Client dependencies
│   └── vite.config.js          # Vite configuration & backend proxy
├── controllers/                # Express request handlers (auth, jobs, user)
├── errors/                     # Custom error classes (Bad Request, Unauthenticated, etc.)
├── middleware/                 # Auth verification, error handling, validation, multer
├── models/                     # Mongoose schemas (JobModel, UserModel)
├── routes/                     # Express route declarations (auth, jobs, user)
├── utils/                      # Constants, password hashing, token creation
├── .env.example                # Sample environment configuration
├── populate.js                 # Mock database seeding script
├── server.js                   # Main Express application entry point
├── package.json                # Backend dependencies & root run scripts
└── README.md                   # Project documentation
```

---

## 🏷️ GitHub Repository Metadata

- **Short Description**:
  > 🚀 A modern full-stack MERN application to organize, monitor, and visualize job search pipelines with real-time analytics, filtering, and light/dark mode.

- **Repository Topics / Tags**:
  `react`, `nodejs`, `express`, `mongodb`, `mern-stack`, `vite`, `styled-components`, `react-query`, `recharts`, `job-tracker`, `job-search`, `dashboard`, `jwt-authentication`, `data-visualization`, `dark-mode`

---

## 📄 License

This project is licensed under the [ISC License](file:///d:/my_projects/Job-Tracker/LICENSE).
