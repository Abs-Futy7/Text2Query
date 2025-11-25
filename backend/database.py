import sqlite3

# Establish a connection to the SQLite database
connection = sqlite3.connect('app_database.db')

# Create a cursor object to interact with the database
cursor = connection.cursor()

# Function to initialize the database with a sample table

create_table_query = """ 
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100),
    course VARCHAR(100),
    section VARCHAR(10),
    marks INT
    
);
"""

cursor.execute(create_table_query)

#Insert sample data into the table
insert_data_query = """
INSERT INTO users (name, course, section, marks) VALUES(?, ?, ?, ?);
"""

sample_data = [
    ('Alice', 'Mathematics', 'A1', 85),
    ('Bob', 'Science', 'B1', 90),
    ('Charlie', 'History', 'C1', 78),
    ('Diana', 'Mathematics', 'A2', 92)
]

cursor.executemany(insert_data_query, sample_data)
connection.commit()

# Display all records from the table

data = cursor.execute("""SELECT * FROM users""")

for row in data:
    print(row)

# Close the cursor and connection
if connection:
    cursor.close()
    connection.close()