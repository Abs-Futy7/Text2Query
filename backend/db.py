# db.py
import sqlite3
from pathlib import Path
import pandas as pd
from typing import List, Dict, Any
import os

DB_PATH = os.getenv("DB_PATH", "dynamic.db")
TABLE_NAME = os.getenv("TABLE_NAME", "uploaded_table")

def save_csv_to_sqlite(file_path: str, table_name: str = TABLE_NAME, db_path: str = DB_PATH) -> List[str]:
    """
    Reads CSV from file_path and writes to sqlite table. Returns the column names.
    """
    df = pd.read_csv(file_path)
    conn = sqlite3.connect(db_path)
    # sanitize table_name? Basic assumption: trusted single-user dev
    df.to_sql(table_name, conn, if_exists="replace", index=False)
    conn.close()
    return df.columns.tolist()

def save_fileobj_csv_to_sqlite(fileobj, table_name: str = TABLE_NAME, db_path: str = DB_PATH) -> List[str]:
    """
    Accepts a file-like object (UploadFile.file) and writes to sqlite.
    """
    df = pd.read_csv(fileobj)
    conn = sqlite3.connect(db_path)
    df.to_sql(table_name, conn, if_exists="replace", index=False)
    conn.close()
    return df.columns.tolist()

def get_table_columns(table_name: str = TABLE_NAME, db_path: str = DB_PATH) -> List[str]:
    conn = sqlite3.connect(db_path)
    cursor = conn.execute(f"PRAGMA table_info({table_name});")
    rows = cursor.fetchall()
    conn.close()
    return [r[1] for r in rows]  # second col is name

def execute_sql(query: str, table_name: str = TABLE_NAME, db_path: str = DB_PATH) -> List[Dict[str, Any]]:
    """
    Execute the query and return results as list of dicts (col->value).
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(query)
    rows = cursor.fetchall()
    cols = [description[0] for description in cursor.description] if cursor.description else []
    data = [dict(zip(cols, row)) for row in rows]
    conn.close()
    return data

def initialize_empty_db(db_path: str = DB_PATH):
    """
    Creates an empty DB if missing (no tables).
    """
    Path(db_path).parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(db_path)
    conn.close()
