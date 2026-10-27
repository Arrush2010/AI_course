# AI-Assisted Application Development — Course Portal

A beginner-friendly, hands-on course for learning to build applications with AI. The course includes a React portal and a complete 12-module course pack with project labs, a student workbook, instructor guide, reusable prompts, assessment rubrics, templates, and reference solutions.

## Run the portal

Install Node.js, then from this folder:

```powershell
npm.cmd install
npm.cmd run dev
```

The development server uses this machine's current network address (`192.168.1.7`) on port `5174`. Open `http://192.168.1.7:5174` on this computer or another device on the same network. If your router assigns this computer a different IP address later, update the `dev` host in `package.json`. Allow access on Private networks if Windows Firewall prompts you.

The portal also supports a production build:

```powershell
npm.cmd run build
npm.cmd run preview
```

On first launch, add a learner username. Course completion is saved separately for each username in this browser, and remains available after a restart. Use the learner profile button to switch learners or add another one.

This is local progress tracking, not an account or secure login: profiles are stored in the browser on this device and are not shared across browsers or devices. Clearing browser data removes saved progress. The portal can migrate previously saved single-learner progress into the first username you add.

Open any curriculum module and select **View lab instructions & files** to browse its README, syntax-highlighted source code and tests, or tabular sample data directly in the portal. The **Course materials** section includes the course map, workbook, instructor guide, rubrics, all 15 AI prompts, instructor reference expectations, and reusable project templates, rendered with headings, lists, tables, and code formatting.

## Start the course

1. Install VS Code, Python 3.10+, and the Python extension.
2. Open this folder in VS Code.
3. Read `course/COURSE_MAP.md`, then `course/STUDENT_WORKBOOK.md`.
4. Open each `labs/labXX_.../README.md` and complete labs in order.

Windows: `py -m venv .venv` then `.venv\Scripts\Activate.ps1`  
macOS/Linux: `python3 -m venv .venv` then `source .venv/bin/activate`

Use each lab's README for its dependencies and run commands.

## Contents

- `src/`: React course portal
- `course/`: course map, workbook, instructor guide, prompt library, assessment rubrics
- `labs/`: 12 application use cases with sample scripts or starter projects
- `templates/`: project brief, bug report, test plan, README template
- `solutions/`: instructor reference expectations

## Responsible use

Samples use fictional data. Never paste secrets, passwords, API keys, confidential business records, or real student records into an AI assistant. Generated code must be run, reviewed, and tested. These are educational samples, not production-ready systems.
