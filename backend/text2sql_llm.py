# text2sql_llm.py
import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser



def build_prompt_for_table(table: str, columns: list[str], user_question: str) -> ChatPromptTemplate:
    col_str = ", ".join(columns)
    template = f"""
        You are an expert at converting natural language to SQL.
        Table: {table}
        Columns: {col_str}

        Rules:
        - Return ONLY the SQL query.
        - Use the table name exactly as given.
        - Use column names exactly as given (case-sensitive).
        - Do NOT include code fences (```), or the word "sql".
        - Use double quotes around string literals if needed (SQLite accepts both but be consistent).
        - Only produce queries safe for read-only analysis (prefer SELECT). Do not output DDL or data-modifying statements.

        Convert the following English question into an appropriate SQL query (for SQLite). Question: {{user_question}}
        """
    return ChatPromptTemplate.from_template(template)

def generate_sql(table: str, columns: list[str], user_question: str, api_key: str | None = None, model_name: str | None = None) -> str:
    if api_key is None:
        api_key = os.environ.get("GROQ_API_KEY")
    if model_name is None:
        model_name = "llama-3.1-8b-instant"

    prompt = build_prompt_for_table(table, columns, user_question)
    llm = ChatGroq(api_key=api_key, model_name=model_name)
    chain = prompt | llm | StrOutputParser()
    # invoke returns string (StrOutputParser ensures that)
    response = chain.invoke({"user_question": user_question})
    # basic safety: strip whitespace
    return response.strip()
