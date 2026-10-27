# Student Workbook

## Lab record
For every lab, record: problem/use case, target user, inputs, outputs, business rules, AI prompts used, tests run, errors found, fix applied, independent extension, and reflection.

## Lab 1 — Smart calculator
Run `python labs/lab01_calculator/calculator.py`. Test `12 + 8`, decimals, negative numbers, invalid input, division by zero, and exit. Acceptance: four operations, safe invalid-input handling, repeated calculations. Extension: exponentiation/history.

## Lab 2 — Student marks manager
Run `python labs/lab02_marks/marks_manager.py`. Sample fictional students are included. Test duplicate IDs and marks outside 0–100. Acceptance: correct totals/averages and clear validation. Extension: subject-wise high/low scores.

## Lab 3 — Expense tracker
Run `python labs/lab03_expense_tracker/expense_tracker.py`. Add fictional date/category/description/amount records and restart to confirm persistence. Acceptance: CSV storage, valid dates, positive Decimal amounts, monthly total. Extension: budget alerts.

## Lab 4 — To-do web app
Open `labs/lab04_todo_web/index.html` in a browser. Test add/edit/delete/complete/filter/refresh and HTML-like text. Acceptance: CRUD, task counts, localStorage and safe text rendering. Extension: priorities and due dates.

## Lab 5 — Student registration
Read `labs/lab05_student_web/README.md`, install dependencies, run the Flask app. Test duplicate ID, invalid email, search and deletion. Acceptance: SQLite persistence, server-side validation and parameterized queries. Use fictional data only.

## Lab 6 — Sales dashboard
Read `labs/lab06_dashboard/README.md`. Use the supplied fictional CSV. Change filters and confirm KPIs/charts update. Acceptance: validated columns, correct totals, empty-result handling and CSV download.

## Lab 7 — API lookup
Run `python labs/lab07_api_lookup/api_lookup.py`. Default response is explicitly simulated, not live data. Extension: select an API with official documentation and implement live mode with timeouts and safe configuration.

## Lab 8 — AI study assistant
Read `labs/lab08_ai_study/README.md`. Mock mode works without an API key. Try multiple topics, difficulty levels, empty input and failure handling. Extension: quiz scoring.

## Lab 9 — Report generator
Run `python labs/lab09_report_generator/report_generator.py`. It reads fictional marks and writes HTML. Test missing columns and invalid marks. Extension: PDF output.

## Lab 10 — Inventory and orders
Run `python labs/lab10_inventory/inventory.py`. Add a product, place an order, then attempt to order more than stock. Acceptance: stock never becomes negative and failed orders do not change stock. Extension: order cancellation.

## Lab 11 — Quality and release
Apply `labs/lab11_quality_release/RELEASE_CHECKLIST.md` to an earlier project. Use Git, tests, `.gitignore`, documented setup, smoke tests and rollback instructions.

## Lab 12 — Capstone
Choose a library manager, booking prototype, budget dashboard, student portal, inventory tool, document summarizer, feedback dashboard or task tracker. Deliver requirements, architecture/data model, source, sample data, tests, README, screenshots/demo, limitations and reflection.

## Reflection questions
1. Which test found a defect?
2. Which AI suggestion did you independently verify?
3. What data must never be pasted into an AI assistant?
4. What would need to change before real users could safely use this app?
