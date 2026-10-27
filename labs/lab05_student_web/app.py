from flask import Flask, request, redirect, url_for, render_template_string
import sqlite3, re
from pathlib import Path
app=Flask(__name__); DB=Path(__file__).with_name("students.db")
PAGE='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Student Register</title><body style="font-family:system-ui;max-width:850px;margin:2rem auto"><h1>Student Registration</h1><p>{{message}}</p><form method="post" action="/add"><input name="sid" placeholder="Student ID" required><input name="name" placeholder="Name" required><input name="email" placeholder="Email" required><input name="course" placeholder="Course" required><button>Add</button></form><form><input name="q" value="{{q}}" placeholder="Search ID/name"><button>Search</button></form><table border="1" cellpadding="6"><tr><th>ID</th><th>Name</th><th>Email</th><th>Course</th></tr>{% for s in rows %}<tr>{% for x in s %}<td>{{x}}</td>{% endfor %}</tr>{% endfor %}</table><p>Fictional data only. Educational demo.</p></body></html>'''
def db():
 c=sqlite3.connect(DB); c.execute("CREATE TABLE IF NOT EXISTS students(sid TEXT PRIMARY KEY,name TEXT NOT NULL,email TEXT NOT NULL,course TEXT NOT NULL)"); return c
@app.get("/")
def index():
 q=request.args.get("q","").strip()
 with db() as c:
  rows=c.execute("SELECT * FROM students WHERE sid LIKE ? OR name LIKE ? ORDER BY sid",(f"%{q}%",f"%{q}%")).fetchall()
 return render_template_string(PAGE,rows=rows,q=q,message=request.args.get("message",""))
@app.post("/add")
def add():
 vals=[request.form.get(k,"").strip() for k in ["sid","name","email","course"]]
 if not all(vals) or not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+",vals[2]): return redirect(url_for("index",message="Enter all fields and a valid email."))
 try:
  with db() as c:c.execute("INSERT INTO students VALUES(?,?,?,?)",vals)
 except sqlite3.IntegrityError:return redirect(url_for("index",message="Student ID already exists."))
 return redirect(url_for("index",message="Student added."))
if __name__=="__main__":
 with db():pass
 app.run(debug=True)
