import csv, html
from pathlib import Path
from collections import defaultdict
HERE=Path(__file__).resolve().parent
def load(path):
 with open(path,newline="",encoding="utf-8") as f:
  reader=csv.DictReader(f);required={"student_id","name","subject","marks"}
  if required-set(reader.fieldnames or []):raise ValueError("CSV is missing required columns.")
  rows=[]
  for n,r in enumerate(reader,start=2):
   try:
    mark=float(r["marks"])
    if not 0<=mark<=100:raise ValueError()
    rows.append({**r,"mark":mark})
   except ValueError:print(f"Skipping invalid row {n}.")
  return rows
def make_html(rows):
 groups=defaultdict(list)
 for r in rows:groups[(r["student_id"],r["name"])].append(r["mark"])
 body=[]
 for (sid,name),marks in sorted(groups.items()):
  body.append("<tr><td>"+html.escape(sid)+"</td><td>"+html.escape(name)+"</td><td>"+str(len(marks))+"</td><td>"+f"{sum(marks):.2f}"+"</td><td>"+f"{sum(marks)/len(marks):.2f}"+"</td></tr>")
 if not body:body=["<tr><td colspan='5'>No valid records</td></tr>"]
 return "<!doctype html><html lang='en'><meta charset='utf-8'><title>Marks Report</title><body><h1>Fictional Marks Report</h1><table border='1'><tr><th>ID</th><th>Name</th><th>Subjects</th><th>Total</th><th>Average</th></tr>"+"".join(body)+"</table></body></html>"
def main():
 try:
  rows=load(HERE/"marks.csv");(HERE/"report.html").write_text(make_html(rows),encoding="utf-8");print("Created report.html")
 except (OSError,ValueError) as e:print("Report failed:",e)
if __name__=="__main__":main()
