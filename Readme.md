
## 📊 Data Catalog

A geospatial dataset catalog web app built with **FastAPI** (backend), **React** (frontend), and **SQLite** (database). It allows you to search, browse, and inspect geospatial datasets with key metadata.

---

### 📁 Project Structure

```
data_catalog/
│
├── backend/
│   ├── data_cat.py         # FastAPI app
│   ├── data_catalog.db     # database
│   ├── venv/               # Python virtual environment
│   └── updated_data.xlsx   # Your source Excel file (optional)
│
└── frontend/
    ├── public/
    │   └── logo.png   
    │   └── index.html     # Project logo (ensure it's here)
    ├── src/
    │   └── App.js          # Main React component
    ├── package.json
    └── ...
```

---

## 🚀 Getting Started

### 🔧 Backend Setup (FastAPI + SQLite)

1. **Open PowerShell**, navigate to the backend directory:

```powershell
cd path\to\data_catalog\backend
```

2. **Activate the virtual environment:**

```powershell
.\venv\Scripts\activate
```

3. **Install dependencies** (only needed once):

```bash
pip install -r requirements.txt
# or individually
pip install fastapi uvicorn pandas openpyxl
```

4. **Run the FastAPI server:**

```bash
python -m uvicorn data_cat:app --reload
```

It will be available at: [http://localhost:8000](http://localhost:8000)

---

### 🖼 Frontend Setup (React)

1. **Open Git Bash or terminal**, navigate to frontend:

```bash
cd path/to/data_catalog/frontend
```

2. **Install frontend dependencies:**

```bash
npm install
```

3. **Start the React app:**

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 💾 Database Notes

* The database is built from the Excel file automatically on first run.
* If your Excel structure changes, the backend dynamically adapts.
* You can switch to PostgreSQL (e.g. with **pgAdmin**) by modifying the DB connection logic.

---

## 💡 Features

* 🔎 Search datasets by title or source and more
* 📦 Dynamic metadata display
* ⚡ React frontend with icons for format
* 🛠 Built from Excel files
* 📡 REST API with `/datasets`, `/search`, `/datasets/{id}`



---

## 📄 License

MIT License. Contributions welcome!

---
