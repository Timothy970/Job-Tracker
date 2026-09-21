# 🚀 JobTrackr — Modern Job Application & Architecture Portfolio Tracker

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Styled Components](https://img.shields.io/badge/Styled_Components-💅-DB7093?logo=styled-components&logoColor=white)](https://styled-components.com/)
[![React Query](https://img.shields.io/badge/TanStack_Query-v4-FF4154?logo=react-query&logoColor=white)](https://tanstack.com/query)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

**JobTrackr** is a production-grade full-stack MERN platform engineered to organize, monitor, and visualize both your **job application search pipeline** and your **software project engineering portfolio**. 

From tracking interview stages to managing multi-component project architectures, environment variables (`.env` files), dual-hosted endpoints (Frontend & Backend URLs), and real-time recruitment analytics, JobTrackr delivers a modern, high-performance developer experience with dark/light mode support and instant reactivity.

---

## ✨ Key Features & Modules

### 🛠️ 1. Architecture Portfolio & Multi-Endpoint Project Tracker
- **Multi-Component Architecture**: Track complex projects composed of Frontend, Backend, Mobile Apps, Microservices, SDKs, or Custom CLI tools.
- **Dual Hosted URLs (FE & BE)**: Track separate live deployment endpoints for Frontend (`https://my-app.vercel.app`) and Backend API (`https://api.render.com`), or a single hosted URL.
- **Architecture Blueprints**: One-click preset blueprints (BE & FE, Monolith, Pure Mobile, FE+BE+Mobile, Microservices, SDK).
- **Environment Variable (`.env`) Vault**:
  - Component-level `.env` block management.
  - One-click secret masking/revealing toggle.
  - Copy `.env` to clipboard or download `.env` file directly.
  - Support for shared `.env` indicators and API consumption notes.
- **Project Duplication**: Instantly clone projects and architecture components.
- **Multi-Format Exporting**: Export project portfolios as **JSON**, **CSV**, or formatted **Markdown** reports.

### 💼 2. End-to-End Job Application Pipeline
- **Pipeline Management**: Create, edit, and track job applications with status, job location, company, and contract type (`full-time`, `part-time`, `internship`).
- **Status Pills**: Visual indicators for `Pending` (Amber), `Interview` (Purple), `Accepted` (Green), and `Declined` (Red).

### 🔍 3. Compact Top Filter Toolbars & Responsive Controls
- **Space-Efficient Top Toolbars**: Redesigned filter bars taking ~60% less screen height with micro-labels and 38px controls.
- **One-Click Animated Reset**: Animated refresh/reset icon button (`<FiRotateCcw />`) for instant filter clearing.
- **Debounced Live Search**: Real-time keyword filtering across project titles, descriptions, stack tags, company names, and repository URLs.
- **Responsive Layouts**: Seamless multi-column grid scaling across Desktop, Tablet, and Mobile smartphones.

### ⚡ 4. Real-Time Data Sync & Tab Navigation
- **Zero-Delay Cache Invalidation**: Adding, editing, or deleting projects/jobs immediately invalidates the React Query cache and updates the UI without page reloads.
- **Tab Navigation Sync**: Configured with `staleTime: 0` and `refetchOnMount: 'always'`, ensuring navigating between sidebar tabs always fetches fresh data from the server.

### 📊 5. Analytics, Visualizations & System Intelligence
- **Platform Analytics**: Interactive application velocity trend charts with toggleable **Area Charts** and **Bar Charts**.
- **Status Distribution**: Real-time Recharts Doughnut breakdown for job applications and project status metrics.
- **System Administration Dashboard (Admin Only)**:
  - System candidate roster & live platform application feed.
  - Top target companies & top application locations leaderboards.
  - One-click printable executive reports.

### 🌓 6. Dynamic Theme System & Security
- **Dark & Light Mode**: Persistent slate palette themes with smooth transitions.
- **JWT & HTTP-Only Cookies**: Secure authentication flow with hashed passwords (`bcryptjs`) and request validation.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 18](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Styling**: [Styled Components](https://styled-components.com/) + Modern CSS3 Tokens
- **State & Query Cache**: [@tanstack/react-query](https://tanstack.com/query)
- **Routing**: [React Router DOM v6](https://reactrouter.com/) (Loaders & Actions)
- **Data Visualizations**: [Recharts](https://recharts.org/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) (Feather, FontAwesome, HiIcons)
- **Notifications & Utilities**: [React Toastify](https://fkhadra.github.io/react-toastify/), [Day.js](https://day.js.org/)

### Backend
- **Runtime & Server**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose ODM](https://mongoosejs.com/)
- **Auth & Security**: [JWT](https://jwt.io/), [bcryptjs](https://github.com/dcodeIO/bcrypt.js), [Helmet](https://helmetjs.github.io/), [express-validator](https://express-validator.github.io/)
- **File & Media Handling**: [Multer](https://github.com/expressjs/multer) (with 5MB content-length safety limits), [Cloudinary](https://cloudinary.com/), [Datauri](https://github.com/nib-health-funds/datauri)

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster connection URI)

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/Timothy970/Job-Tracker.git
cd Job-Tracker
```

---

### Step 2: Install Dependencies

#### On Windows (PowerShell / CMD):
```bash
# Install root (backend) dependencies
cmd /c npm install

# Install client (frontend) dependencies
cmd /c npm --prefix client install
```

#### On macOS / Linux:
```bash
npm run setup-project
```

---

### Step 3: Environment Configuration

Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Configure `.env` settings:
```env
PORT=5100
NODE_ENV=development
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/JobTrackr?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1d
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
```

---

### Step 4: Run in Development Mode

Launch both backend API server and frontend development server with hot reloading:

```bash
# Windows
cmd /c npm run dev

# macOS / Linux
npm run dev
```

- **Frontend Application**: [http://localhost:5173](http://localhost:5173)
- **Backend API Server**: [http://localhost:5100](http://localhost:5100)

---

### Step 5: Build for Production

To build the optimized client bundle and serve via Express:

```bash
# Windows
cmd /c npm run setup-production-app
cmd /c npm start

# macOS / Linux
npm run setup-production-app
npm start
```
Access the application at [http://localhost:5100](http://localhost:5100).

---

## 📡 API Endpoints Summary

### Authentication & User
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Register candidate account | Public |
| `POST` | `/api/v1/auth/login` | Authenticate & issue JWT cookie | Public |
| `GET` | `/api/v1/auth/logout` | Clear auth token cookie | Authenticated |
| `GET` | `/api/v1/users/current-user` | Get profile details | Authenticated |
| `PATCH` | `/api/v1/users/update-user` | Update profile info & avatar | Authenticated |
| `GET` | `/api/v1/users/admin/app-stats`| Platform analytics & roster | Admin Only |

### Project Architecture & Portfolio
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/v1/projects` | List projects (paginated & filtered) | Authenticated |
| `POST` | `/api/v1/projects` | Create new project & components | Authenticated |
| `GET` | `/api/v1/projects/:id` | Get single project architecture | Authenticated |
| `PATCH` | `/api/v1/projects/:id` | Update project & live URLs | Authenticated |
| `DELETE` | `/api/v1/projects/:id` | Remove project | Authenticated |
| `GET` | `/api/v1/projects/export` | Export portfolio (JSON/CSV/Markdown) | Authenticated |
| `GET` | `/api/v1/projects/stats` | Project type & tech stack metrics | Authenticated |

### Job Applications
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/v1/jobs` | List job applications (filtered) | Authenticated |
| `POST` | `/api/v1/jobs` | Create job application | Authenticated |
| `GET` | `/api/v1/jobs/:id` | Get single job details | Authenticated |
| `PATCH` | `/api/v1/jobs/:id` | Update job application | Authenticated |
| `DELETE` | `/api/v1/jobs/:id` | Remove job application | Authenticated |
| `GET` | `/api/v1/jobs/stats` | Monthly application trends | Authenticated |

---

## 📄 License

This project is licensed under the [ISC License](file:///d:/my_projects/Job-Tracker/LICENSE).
