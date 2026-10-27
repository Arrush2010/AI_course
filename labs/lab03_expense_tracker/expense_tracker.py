import csv
from datetime import date
from decimal import Decimal, InvalidOperation
from pathlib import Path
FIELDS = ["date", "category", "description", "amount"]
def ensure(path):
    if not Path(path).exists():
        with open(path, "w", newline="", encoding="utf-8") as f: csv.DictWriter(f, fieldnames=FIELDS).writeheader()
def add(path, day, category, description, amount_text):
    try:
        day = date.fromisoformat(day).isoformat()
        amount = Decimal(amount_text).quantize(Decimal("0.01"))
    except (ValueError, InvalidOperation): raise ValueError("Use a valid YYYY-MM-DD date and numeric amount.")
    if amount <= 0 or not category.strip() or not description.strip(): raise ValueError("Amount must be positive; category and description are required.")
    ensure(path)
    with open(path, "a", newline="", encoding="utf-8") as f:
        csv.DictWriter(f, fieldnames=FIELDS).writerow({"date":day,"category":category.strip(),"description":description.strip(),"amount":f"{amount:.2f}"})
def read(path):
    ensure(path); rows=[]
    with open(path, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            try:
                date.fromisoformat(row["date"]); amount=Decimal(row["amount"])
                if amount <= 0: raise ValueError()
                rows.append({**row, "money":amount})
            except (ValueError, InvalidOperation, KeyError): print("Skipping malformed row:", row)
    return rows
def monthly_total(path, month):
    return sum((r["money"] for r in read(path) if r["date"].startswith(month)), Decimal("0.00"))
def main():
    path="expenses.csv"; ensure(path)
    print("1 Add  2 List  3 Monthly total  4 Quit")
    choice=input("Choose: ").strip()
    try:
        if choice=="1":
            add(path,input("Date: "),input("Category: "),input("Description: "),input("Amount: "))
            print("Saved.")
        elif choice=="2":
            for r in read(path): print(r["date"],r["category"],r["description"],r["amount"])
        elif choice=="3":
            month=input("Month YYYY-MM: ").strip(); date.fromisoformat(month+"-01")
            print("Total:", monthly_total(path,month))
        else: print("Goodbye.")
    except (ValueError, OSError) as e: print("Could not complete operation:",e)
if __name__=="__main__": main()
