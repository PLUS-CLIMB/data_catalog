from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import re
import pandas as pd

app = FastAPI(title="📊 Data Catalog API", description="A REST API for managing and searching datasets.", version="1.1")

DB_FILE = "data_catalog.db"
DATA_FILE = "updated_geospatialdata_evaluation.xlsx"

def sanitize_column_name(name):
    """ Convert column names into SQLite-friendly format """
    return re.sub(r'\W+', '_', name).lower()  # Replace non-word chars & lowercase

def create_database():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    # Load data from Excel
    df = pd.read_excel(DATA_FILE)
    df = df.fillna("")  # Handle NaN values
    
    # Sanitize column names
    df.columns = [sanitize_column_name(col) for col in df.columns]

    # Get SQL column definitions
    column_definitions = ", ".join([f'"{col}" TEXT' for col in df.columns])  

    # Drop table if it exists
    cursor.execute("DROP TABLE IF EXISTS catalog")

    # Create table dynamically
    create_table_query = f'CREATE TABLE catalog (id INTEGER PRIMARY KEY AUTOINCREMENT, {column_definitions})'
    cursor.execute(create_table_query)

    # Insert data
    placeholders = ", ".join(["?" for _ in df.columns])
    insert_query = f'INSERT INTO catalog ({", ".join(df.columns)}) VALUES ({placeholders})'
    
    cursor.executemany(insert_query, df.values.tolist())

    conn.commit()
    conn.close()

create_database()

@app.get("/")
def home():
    return {"message": "Welcome to the Data Catalog API! Use /datasets to retrieve dataset information."}

@app.get("/datasets")
def get_all_datasets():
    conn = sqlite3.connect(DB_FILE)
    df = pd.read_sql_query("SELECT * FROM catalog", conn)
    conn.close()
    return df.to_dict(orient="records")

@app.get("/datasets/search")
def search_datasets(
    keyword: str = Query(None, description="Search in dataset title or source"),
    source: str = Query(None, description="Filter by data source"),
    spatial_resolution: str = Query(None, description="Filter by spatial resolution"),
    temporal_resolution: str = Query(None, description="Filter by temporal resolution")
):
    query = "SELECT * FROM catalog WHERE 1=1"
    params = []
    
    if keyword:
        query += " AND (title LIKE ? OR source LIKE ?)"
        params.extend([f"%{keyword}%", f"%{keyword}%"])
    if source:
        query += " AND source = ?"
        params.append(source)
    if spatial_resolution:
        query += " AND spatial_resolution = ?"
        params.append(spatial_resolution)
    if temporal_resolution:
        query += " AND temporal_resolution = ?"
        params.append(temporal_resolution)
    
    conn = sqlite3.connect(DB_FILE)
    df = pd.read_sql_query(query, conn, params=params)
    conn.close()
    
    return df.to_dict(orient="records")

@app.get("/datasets/{dataset_id}")
def get_dataset(dataset_id: int):
    """Retrieve a specific dataset by ID"""
    conn = sqlite3.connect(DB_FILE)
    df = pd.read_sql_query("SELECT * FROM catalog WHERE id = ?", conn, params=(dataset_id,))
    conn.close()
    if df.empty:
        return {"error": "Dataset not found"}
    return df.to_dict(orient="records")[0]

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
