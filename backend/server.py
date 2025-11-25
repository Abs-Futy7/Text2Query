# server.py
import os
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any
from dotenv import load_dotenv

load_dotenv()  # loads .env in backend folder if present

from db import save_fileobj_csv_to_sqlite, get_table_columns, execute_sql, initialize_empty_db
from text2sql_llm import generate_sql

DB_PATH = os.getenv("DB_PATH", "dynamic.db")
TABLE_NAME = os.getenv("TABLE_NAME", "uploaded_table")

initialize_empty_db(DB_PATH)

app = FastAPI(title="Text-to-SQL Backend")

# Allow local Next.js dev origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"ok": True, "message": "Text-to-SQL backend running."}

@app.post("/upload_csv")
async def upload_csv(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are accepted.")
    try:
        cols = save_fileobj_csv_to_sqlite(file.file, table_name=TABLE_NAME, db_path=DB_PATH)
        return {"ok": True, "table": TABLE_NAME, "columns": cols}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class AskRequest(BaseModel):
    question: str

@app.post("/ask")
async def ask(req: AskRequest):
    # get columns for prompt
    cols = get_table_columns(TABLE_NAME, DB_PATH)
    if not cols:
        raise HTTPException(status_code=400, detail="No table found. Upload a CSV first.")
    # generate SQL via LLM
    sql = generate_sql(TABLE_NAME, cols, req.question)
    # basic safety: ensure SQL is SELECT-like
    if not sql.lower().strip().startswith("select"):
        # to be safe, refuse to execute non-selects
        raise HTTPException(status_code=400, detail="Generated SQL is not a SELECT statement.")
    # run query
    try:
        results = execute_sql(sql, TABLE_NAME, DB_PATH)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"SQL execution error: {e}")
    return {"ok": True, "sql": sql, "results": results}

@app.get("/schema")
def schema():
    cols = get_table_columns(TABLE_NAME, DB_PATH)
    return {"ok": True, "table": TABLE_NAME, "columns": cols}
