from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from browser

# Create table if not exists
def init_db():
    conn = sqlite3.connect("notes.db")
    c = conn.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)")
    conn.commit()
    conn.close()

@app.route("/notes", methods=["GET"])
def get_notes():
    conn = sqlite3.connect("notes.db")
    c = conn.cursor()
    c.execute("SELECT * FROM notes")
    rows = c.fetchall()
    conn.close()
    return jsonify(rows)

@app.route("/notes", methods=["POST"])
def add_note():
    data = request.json
    conn = sqlite3.connect("notes.db")
    c = conn.cursor()
    c.execute("INSERT INTO notes (content) VALUES (?)", (data["content"],))
    conn.commit()
    conn.close()
    return jsonify({"message": "Note added"}), 201

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
