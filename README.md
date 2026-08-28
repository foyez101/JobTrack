# JobTrack

A full-stack job application tracker built with **React**, **FastAPI**, and **PostgreSQL**. JobTrack helps job seekers organize applications, track status changes over time, and manage their job search from one dashboard — instead of scattered spreadsheets and notes.

Built as a personal learning project to practice full-stack development, REST API design, database integration, and JWT authentication.

---

## Features

- 🔐 **User authentication** — register, login, JWT-based sessions, protected routes
- 📋 **Application tracking** — add, edit, and delete job applications
- 🔄 **Status updates** — move an application through Applied → Shortlisted → Assessment → Interview → Offer / Rejected / Withdrawn over time
- 📊 **Dashboard** — live stats (total applications, interviews, offers, rejections) calculated from real data
- 🔒 **User-scoped data** — each user only sees and manages their own applications
- 🎨 **Dark UI** — built with Tailwind CSS

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Styling | Tailwind CSS |
| Routing | React Router |
| Backend | Python, FastAPI |
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| Authentication | JWT (python-jose), bcrypt password hashing (passlib) |
| Version Control | Git + GitHub |

---

## Project Structure

```
JobTrack/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models/          # SQLAlchemy models (User, Application)
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── routes/          # API routes (auth, applications)
│   │   └── services/        # Database connection, auth utilities, dependencies
│   ├── requirements.txt
│   └── .env                 # Not committed — see setup below
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, Sidebar, ApplicationCard, StatusBadge, ProtectedRoute
│   │   ├── pages/           # Dashboard, Applications, AddApplication, EditApplication, Login, Register
│   │   ├── context/         # AuthContext
│   │   └── services/        # api.js — all backend calls
│   └── package.json
└── README.md
```

---

## Setup Guide (Run This Project Locally)

### Prerequisites

Make sure these are installed on your machine first:

- [Python 3.10+](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/) (includes npm)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/foyez101/JobTrack.git
cd JobTrack
```

### 2. Set up the database

Open a terminal and connect to PostgreSQL as the admin user:

```bash
psql -U postgres
```

Then create the database:

```sql
CREATE DATABASE jobtrack;
\q
```

### 3. Set up the backend

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

- **Windows:** `venv\Scripts\activate`
- **Mac/Linux:** `source venv/bin/activate`

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside `backend/` with the following (replace with your own values):

```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/jobtrack
SECRET_KEY=your-own-random-secret-string
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`, and interactive docs at `http://127.0.0.1:8000/docs`. Tables are created automatically on first run.

### 4. Set up the frontend

Open a **new terminal**, from the project root:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### 5. Use the app

- Go to `http://localhost:5173` — you'll be redirected to the Register page
- Create an account, then log in
- Start adding job applications

---

## Future Plans

Features considered but not yet built:

- 🔍 Search and filter applications by company, position, status, or job type
- 📅 Interview tracking — dedicated interview date/time/type/meeting-link management, separate from a single status field
- 📈 Analytics with charts — interview rate, offer rate, rejection rate visualized over time
- 📄 Pagination for large application lists
- 🤖 AI features — paste a job description and resume to get a match score, missing skills, and recommendations
- 📧 Email reminders for upcoming interviews
- 🚀 Deployment — frontend on Vercel, backend on Render/Railway, with a live public URL

---

## Known Limitations

- No search, filtering, or sorting on the Applications page yet — everything is shown in one unsorted list
- No dedicated Interviews table/feature — interview info can only be tracked via the `notes` field on an application
- No analytics charts — the Dashboard only shows basic counts, not trends over time
- No pagination — every application loads at once, which won't scale well with a large number of entries
- No password reset / "forgot password" flow
- No email verification on registration
- Not yet deployed — runs locally only
- `SECRET_KEY` and database credentials are managed via a local `.env` file, which is fine for development but would need proper secret management for production

---

## Problems Faced (and What I Learned)

Building this taught me a lot about real-world development friction, not just writing code:

- **Git remote URL mismix-up** — accidentally set the git remote's URL to the literal text `origin` instead of the actual GitHub URL, causing a confusing prompt loop in VS Code. Fixed by directly inspecting and correcting it with `git remote set-url origin <url>` in the terminal instead of relying on the GUI prompts.
- **Committing from the wrong folder** — ran `git add .` and `git commit` from inside `backend/`, which meant only that subfolder's changes were scoped and the actual frontend edits never got committed. Learned to always run git commands from the project root.
- **`uvicorn: command not found`** — happened whenever the Python virtual environment (`venv`) wasn't activated in a new terminal. `uvicorn` (and other installed packages) are only accessible with `(venv)` active.
- **`ModuleNotFoundError` for installed packages** — `python-jose` and `passlib` appeared to install successfully as part of a combined `pip install` command, but silently failed. Had to reinstall each package individually and verify with `pip show <package>` before trusting an install actually worked.
- **bcrypt/passlib version incompatibility** — a newer version of `bcrypt` (5.x) caused registration to fail with a 500 error, since `passlib` 1.7.4 wasn't fully compatible with it. Fixed by pinning `bcrypt==4.0.1`.
- **Duplicate class definition bug** — a `NameError` and later a `Table already defined` SQLAlchemy error turned out to be caused by pasting new code as an *append* instead of a full *replace*, leaving two copies of the same class in one file. Learned to always verify a file's full contents after an edit, rather than assuming a change applied cleanly.
- **Forgetting to restart both servers** — after closing terminals or restarting the PC, both the backend (`uvicorn`) and frontend (`npm run dev`) need to be manually restarted each time, or the app shows "site can't be reached."
- **Schema field name mismatches** — the backend used `snake_case` (e.g. `company_name`) while early frontend dummy data used `camelCase` (e.g. `company`), causing blank fields until the mismatch was found and fixed.
- **Forgotten authentication headers** — after adding JWT auth to the backend, existing frontend API calls broke (`Failed to fetch` / 401 errors) until every request was updated to attach the `Authorization: Bearer <token>` header.
- **Adding a new database column to an existing table** — SQLAlchemy's `Base.metadata.create_all()` only creates missing tables, not new columns on existing tables. Had to manually drop and let the table be recreated during development (acceptable here since it wasn't production data).

---

## License

Personal learning project — free to reference or fork.
