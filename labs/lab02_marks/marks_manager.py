SAMPLE = [
    {"id": "S001", "name": "Asha", "marks": [80, 70, 90]},
    {"id": "S002", "name": "Ravi", "marks": [65, 75, 70]},
    {"id": "S003", "name": "Meera", "marks": [90, 85, 95]},
]
def validate_marks(marks, maximum=100):
    if not marks or any(not isinstance(x, (int, float)) or x < 0 or x > maximum for x in marks):
        raise ValueError(f"Provide marks between 0 and {maximum}.")
def summary(student):
    validate_marks(student["marks"])
    marks = student["marks"]
    return {"id": student["id"], "name": student["name"], "total": sum(marks), "average": sum(marks)/len(marks)}
def add_student(students, sid, name, marks):
    if any(s["id"] == sid for s in students): raise ValueError("Duplicate student ID.")
    validate_marks(marks)
    students.append({"id": sid, "name": name.strip(), "marks": list(marks)})
def main():
    print("Fictional Student Marks Manager")
    for s in SAMPLE:
        r = summary(s)
        print(f'{r["id"]} {r["name"]}: total={r["total"]}, average={r["average"]:.2f}')
if __name__ == "__main__": main()
