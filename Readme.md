# Full Stack Project

This is a full stack project with a Python backend (FastAPI) and a Next.js frontend.

## 🗂 Project Structure

```
project-root/
│
├── backends/       # FastAPI backend
│   ├── app/
│   ├── environment.yml
│   └── ...
│
├── frontend/      # Next.js frontend
│   └── ...
│
└── README.md
```

## ⚙️ Backend Setup (FastAPI)

### 1. Create or Update Conda Environment
```bash
# Create the environment from the yml file
conda env update -f environment.yml --prune
```

### 2. Activate Environment
```bash
conda activate chatbot
```

### 3. Run the Backend Server
```bash
uvicorn app.main:app --reload
```
Assumes your FastAPI app is located at backends/app/main.py.

### 4. Export Updated Environment (if needed)
After installing new dependencies:
```bash
conda env export > environment.yml
```

## 💻 Frontend Setup (Next.js)

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The frontend will usually be available at http://localhost:3000.

## 📦 Dependencies

- **Backend**: Python, FastAPI, Uvicorn (see backends/environment.yml)
- **Frontend**: Next.js, React (see frontend/package.json)

## 📝 Notes

- Make sure both the backend and frontend are running in development.
- Update environment.yml and package.json whenever new dependencies are added.

## 📬 Feedback

For issues, suggestions, or contributions, feel free to open an issue or PR.