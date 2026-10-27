import React, { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-markdown";

const labFiles = import.meta.glob(
  ["/labs/**/*.{md,py,html,js,css,txt,csv}", "/labs/**/.gitignore"],
  { query: "?raw", import: "default", eager: true },
);
const courseFiles = import.meta.glob(
  ["/course/**/*.md", "/solutions/**/*.md", "/templates/**/*.md"],
  { query: "?raw", import: "default", eager: true },
);

const courseMaterials = [
  { path: "/course/COURSE_MAP.md", title: "Course map", group: "COURSE" },
  { path: "/course/STUDENT_WORKBOOK.md", title: "Student workbook", group: "COURSE" },
  { path: "/course/INSTRUCTOR_GUIDE.md", title: "Instructor guide", group: "COURSE" },
  { path: "/course/ASSESSMENT_RUBRICS.md", title: "Assessment rubrics", group: "COURSE" },
  { path: "/course/AI_PROMPT_LIBRARY.md", title: "AI prompt library", group: "COURSE" },
  { path: "/solutions/REFERENCE_SOLUTIONS.md", title: "Reference expectations", group: "INSTRUCTOR" },
  { path: "/templates/PROJECT_BRIEF.md", title: "Project brief", group: "TEMPLATES" },
  { path: "/templates/BUG_REPORT.md", title: "Bug report", group: "TEMPLATES" },
  { path: "/templates/TEST_PLAN.md", title: "Test plan", group: "TEMPLATES" },
  { path: "/templates/README_TEMPLATE.md", title: "README template", group: "TEMPLATES" },
].map((material) => ({ ...material, content: courseFiles[material.path] }));

const modules = [
  {
    id: 1,
    title: "Your first Python program",
    project: "Smart calculator",
    topic: "Variables, input, conditions & functions",
    duration: "3 lessons · 45 min",
    color: "lavender",
    icon: "terminal",
    description:
      "Get comfortable in VS Code, run your first Python program, and turn a simple calculator into a useful tool.",
    outcome: "Build a calculator with four operations and safe error handling.",
    practice:
      "Try 12 + 8, decimals, negative numbers, invalid input, and division by zero.",
    run: "py calculator.py",
    path: "labs/lab01_calculator/README.md",
  },
  {
    id: 2,
    title: "Make sense of student marks",
    project: "Marks manager",
    topic: "Lists, dictionaries, validation & calculations",
    duration: "3 lessons · 50 min",
    color: "peach",
    icon: "chart",
    description:
      "Organize sample student records and use Python to calculate results while guarding against invalid data.",
    outcome: "Validate unique IDs and marks from 0 to 100, then calculate totals and averages.",
    practice: "Test a duplicate ID and marks below 0 or above 100.",
    run: "py marks_manager.py",
    path: "labs/lab02_marks/README.md",
  },
  {
    id: 3,
    title: "Track everyday expenses",
    project: "Expense tracker",
    topic: "CSV files, dates & Decimal money",
    duration: "3 lessons · 55 min",
    color: "mint",
    icon: "wallet",
    description:
      "Keep fictional expense records between runs and calculate a trustworthy monthly total.",
    outcome: "Save valid dates and positive amounts to a CSV file.",
    practice: "Add an expense, restart the program, and check that it is still there.",
    run: "py expense_tracker.py",
    path: "labs/lab03_expense_tracker/README.md",
  },
  {
    id: 4,
    title: "Bring a to-do list to life",
    project: "To-do web app",
    topic: "HTML, CSS, JavaScript & browser storage",
    duration: "4 lessons · 1 hr",
    color: "blue",
    icon: "check",
    description:
      "Create a small interactive web app that can add, edit, complete, filter, and delete tasks.",
    outcome: "Build CRUD actions, task counts, filters, and persistence with localStorage.",
    practice: "Refresh the page and test a task containing HTML-like text.",
    run: "Open labs/lab04_todo_web/index.html",
    path: "labs/lab04_todo_web/README.md",
  },
  {
    id: 5,
    title: "Save your first registrations",
    project: "Student registration",
    topic: "Flask, SQLite & server-side validation",
    duration: "4 lessons · 1 hr",
    color: "peach",
    icon: "database",
    description:
      "Connect a small Flask app to SQLite and learn how forms, routes, and records work together.",
    outcome: "Create, find, and delete records with server-side validation and parameterized queries.",
    practice: "Try a duplicate ID, an invalid email, a search, and a deletion.",
    run: "python app.py",
    path: "labs/lab05_student_web/README.md",
  },
  {
    id: 6,
    title: "Explore a sales dashboard",
    project: "Sales dashboard",
    topic: "Pandas, Streamlit, charts & filters",
    duration: "4 lessons · 1 hr",
    color: "lavender",
    icon: "chart",
    description:
      "Turn fictional sales data into an interactive dashboard with filters and useful summaries.",
    outcome: "Validate data and keep KPIs, charts, empty states, and downloads in sync with filters.",
    practice: "Change the filters and confirm every metric updates.",
    run: "streamlit run app.py",
    path: "labs/lab06_dashboard/README.md",
  },
  {
    id: 7,
    title: "Understand APIs without the mystery",
    project: "API lookup",
    topic: "HTTP, JSON, timeouts & errors",
    duration: "3 lessons · 50 min",
    color: "blue",
    icon: "globe",
    description:
      "See how applications request data from other services, beginning with a safe simulated response.",
    outcome: "Explain HTTP and JSON, and know how timeouts and response validation protect an app.",
    practice: "Run the mock and identify why its output is simulated, not live.",
    run: "py api_lookup.py",
    path: "labs/lab07_api_lookup/README.md",
  },
  {
    id: 8,
    title: "Build an AI study helper",
    project: "AI study assistant",
    topic: "Model integration, mock mode & secrets",
    duration: "4 lessons · 1 hr",
    color: "mint",
    icon: "spark",
    description:
      "Explore the shape of an AI-powered feature without needing an API key or calling a live model.",
    outcome: "Use mock mode and understand provider adapters, privacy, cost, and secret handling.",
    practice: "Try different topics, difficulty levels, blank input, and failure cases.",
    run: "streamlit run app.py",
    path: "labs/lab08_ai_study/README.md",
  },
  {
    id: 9,
    title: "Create a report from data",
    project: "Report generator",
    topic: "CSV validation & HTML generation",
    duration: "3 lessons · 50 min",
    color: "peach",
    icon: "file",
    description:
      "Read fictional marks from a CSV file and transform them into a useful HTML report.",
    outcome: "Validate columns and marks, summarize results, and escape HTML safely.",
    practice: "Check what happens when a column is missing or a mark is invalid.",
    run: "py report_generator.py",
    path: "labs/lab09_report_generator/README.md",
  },
  {
    id: 10,
    title: "Keep inventory in check",
    project: "Inventory and orders",
    topic: "Relational data, transactions & business rules",
    duration: "4 lessons · 1 hr",
    color: "blue",
    icon: "boxes",
    description:
      "Model products and orders, then protect your stock when an order cannot be fulfilled.",
    outcome: "Keep stock nonnegative and roll back failed orders without changing inventory.",
    practice: "Place an order that is larger than the available stock.",
    run: "py inventory.py",
    path: "labs/lab10_inventory/README.md",
  },
  {
    id: 11,
    title: "Test, review & release",
    project: "Quality and release",
    topic: "Automated tests, Git & rollback",
    duration: "3 lessons · 55 min",
    color: "lavender",
    icon: "shield",
    description:
      "Turn a working project into one you can explain, reproduce, test, and safely improve.",
    outcome: "Prepare setup instructions, a smoke test, a secret-safe repository, and rollback steps.",
    practice: "Apply the release checklist to one of your earlier projects.",
    run: "Use the checklist in the lab folder",
    path: "labs/lab11_quality_release/README.md",
  },
  {
    id: 12,
    title: "Make something of your own",
    project: "Capstone",
    topic: "Requirements, architecture, testing & demo",
    duration: "8 milestones · your pace",
    color: "mint",
    icon: "flag",
    description:
      "Bring the course together in a scoped project you can build one feature at a time.",
    outcome: "Deliver requirements, source, tests, a README, a demo, limitations, and a reflection.",
    practice: "Choose an idea, define acceptance criteria, then build and test in small steps.",
    run: "Start with the capstone README",
    path: "labs/lab12_capstone/README.md",
  },
];

const prompts = [
  {
    tag: "REQUIREMENTS",
    title: "Turn an idea into requirements",
    text: "Act as a product analyst. Convert this idea into target user, problem statement, user stories, measurable acceptance criteria, assumptions, non-goals and risks. Keep the first version achievable in [TIME].",
  },
  {
    tag: "PLAN",
    title: "Plan before code",
    text: "Plan [PROJECT] for a beginner using VS Code. Recommend a simple stack, explain why, show the folder tree, dependencies, exact run commands, tests and security considerations. Do not generate code yet.",
  },
  {
    tag: "GENERATE",
    title: "Generate complete files",
    text: "Implement [FEATURE]. Give complete contents for every new or changed file with exact paths. Do not use unexplained placeholders or omit sections. Include setup commands, sample input/output and tests.",
  },
  {
    tag: "EXPLAIN",
    title: "Explain code",
    text: "Explain this code to a beginner: purpose, important lines, variables, sample execution, assumptions, likely errors and a small modification exercise. [PASTE CODE]",
  },
  {
    tag: "DEBUG",
    title: "Debug with context",
    text: "OS: [OS]. Command: [COMMAND]. Expected: [EXPECTED]. Actual: [ACTUAL]. Full error: [ERROR]. Relevant code: [CODE]. Diagnose causes in order, give the smallest safe fix and a verification test. Do not claim it works until I test it.",
  },
  {
    tag: "TEST",
    title: "Generate useful tests",
    text: "Create tests for normal cases, boundary values, invalid input, empty data, missing files and recovery. Include setup, action and expected result. Use [FRAMEWORK]. Do not alter code merely to make tests pass.",
  },
  {
    tag: "REVIEW",
    title: "Review code",
    text: "Review correctness, readability, duplication, validation, errors, security, tests and documentation. Rank findings by severity, name exact files/functions, and propose small fixes with regression tests.",
  },
  {
    tag: "SECURITY",
    title: "Review security safely",
    text: "Check credential exposure, unsafe rendering, injection, weak validation, permissions, file handling and sensitive logs. Explain fixes and state what cannot be verified. Do not ask for real secrets.",
  },
  {
    tag: "REFACTOR",
    title: "Refactor without behavior changes",
    text: "Refactor [FILE] for readability without changing behavior. State intended changes, provide complete changed files and regression tests, and explain the result.",
  },
  {
    tag: "README",
    title: "Write a reproducible README",
    text: "Create a README with purpose, features, requirements, structure, setup, configuration, run commands, sample usage, tests, data/privacy notes, limitations and troubleshooting. Ensure commands match the project.",
  },
  {
    tag: "GIT",
    title: "Learn Git with a coach",
    text: "Teach me to inspect status, review changes, commit logical changes, read history and recover a local mistake. Explain commands first. Warn before destructive commands; do not casually recommend force push.",
  },
  {
    tag: "CAPSTONE",
    title: "Build a capstone in stages",
    text: "Help build [IDEA] in stages: requirements, MVP, architecture, data model, tests, one feature at a time, review, documentation and demo. Ask me to confirm requirements before implementation.",
  },
  {
    tag: "VERIFY",
    title: "Verify AI output",
    text: "List technical claims needing verification and show how to check each using official documentation, local commands or tests. Distinguish facts from assumptions.",
  },
  {
    tag: "HINT",
    title: "Learn in hint mode",
    text: "Do not reveal the full solution immediately. Give one hint at a time, ask me to predict behavior, then let me try. If wrong, explain the misconception and suggest a minimal correction.",
  },
  {
    tag: "OFFLINE",
    title: "Design an offline alternative",
    text: "Design an offline version of [PROJECT] using fixtures or mocked responses. Clearly label simulated behavior and provide repeatable tests. Never imply mock output is live data.",
  },
];

const iconPaths = {
  terminal: <><path d="m4 17 6-5-6-5" /><path d="M12 19h8" /></>,
  chart: <><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-5 5" /></>,
  wallet: <><rect x="3" y="6" width="18" height="15" rx="2" /><path d="M3 10h18M16 15h.01" /><path d="M6 6V4a2 2 0 0 1 2-2h10" /></>,
  check: <><path d="m5 12 4 4L19 6" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
  database: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5M3 12a9 3 0 0 0 18 0" /></>,
  globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></>,
  code: <><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16" /></>,
  spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" /><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" /></>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></>,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></>,
  boxes: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5M12 8v5" /></>,
  shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  flag: <><path d="M4 22V4" /><path d="M4 4c6-4 10 4 16 0v12c-6 4-10-4-16 0" /></>,
  user: <><path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="8" r="5" /></>,
};

function Icon({ name, size = 20, className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name] || iconPaths.spark}
    </svg>
  );
}

const PROFILE_STORAGE_KEY = "fieldnotes-learner-profiles-v1";
const LEGACY_PROGRESS_KEY = "fieldnotes-completed-modules";

function isValidCompletedModules(value) {
  return (
    Array.isArray(value) &&
    value.every((id) => Number.isInteger(id) && id >= 1 && id <= modules.length)
  );
}

function languageForFile(filename) {
  const extension = filename.split(".").pop().toLowerCase();
  const languages = {
    py: "python",
    js: "javascript",
    html: "markup",
    css: "css",
    sh: "bash",
    json: "json",
    sql: "sql",
    md: "markdown",
  };
  return languages[extension] || "text";
}

function renderPrismTokens(tokens, prefix = "token") {
  return tokens.map((token, index) => {
    const key = `${prefix}-${index}`;
    if (typeof token === "string") return <React.Fragment key={key}>{token}</React.Fragment>;
    const aliases = Array.isArray(token.alias) ? token.alias.join(" ") : token.alias || "";
    return (
      <span className={`token ${token.type} ${aliases}`} key={key}>
        {Array.isArray(token.content)
          ? renderPrismTokens(token.content, key)
          : typeof token.content === "string"
            ? token.content
            : token.content}
      </span>
    );
  });
}

function parseCsvRow(row) {
  const cells = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < row.length; index += 1) {
    const character = row[index];
    if (character === '"' && quoted && row[index + 1] === '"') {
      cell += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      cells.push(cell);
      cell = "";
    } else {
      cell += character;
    }
  }
  cells.push(cell);
  return cells;
}

function CsvTable({ source }) {
  const rows = source.trim().split(/\r?\n/).map(parseCsvRow);
  const [headers = [], ...records] = rows;
  return (
    <div className="csv-table-wrap">
      <table className="csv-table">
        <thead><tr>{headers.map((header, index) => <th key={`${header}-${index}`}>{header}</th>)}</tr></thead>
        <tbody>
          {records.map((record, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((_, columnIndex) => <td key={columnIndex}>{record[columnIndex] || ""}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HighlightedCode({ source, language }) {
  const grammar = Prism.languages[language];
  const tokens = grammar ? Prism.tokenize(source, grammar) : [source];
  return (
    <div className="highlighted-code">
      <pre><code className={`language-${language}`}>{renderPrismTokens(tokens)}</code></pre>
    </div>
  );
}

function MarkdownDocument({ source }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        pre({ children }) {
          return React.isValidElement(children)
            ? React.cloneElement(children, { block: true })
            : children;
        },
        code({ className, children, block }) {
          const sourceCode = String(children).replace(/\n$/, "");
          const language = className?.match(/language-([\w-]+)/)?.[1] || "text";
          if (!block) return <code className="markdown-inline-code">{children}</code>;
          return <HighlightedCode source={sourceCode} language={language} />;
        },
      }}
    >
      {source}
    </ReactMarkdown>
  );
}

function getLabFiles(module) {
  const labFolder = module.path.slice(0, module.path.lastIndexOf("/"));
  return Object.entries(labFiles)
    .filter(([path]) => path.startsWith(`/${labFolder}/`))
    .map(([path, content]) => ({
      path: path.slice(1),
      name: path.slice(path.lastIndexOf("/") + 1),
      content,
    }))
    .sort((a, b) => {
      if (a.name === "README.md") return -1;
      if (b.name === "README.md") return 1;
      return a.name.localeCompare(b.name);
    });
}

function loadProfileState() {
  try {
    const saved = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!saved) return { store: { activeUsername: null, users: {} }, error: "" };

    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed.users !== "object" || parsed.users === null) {
      throw new Error("The saved learner profiles have an invalid format.");
    }

    const validUsers = Object.entries(parsed.users).every(
      ([username, profile]) =>
        typeof username === "string" &&
        profile &&
        typeof profile.displayName === "string" &&
        isValidCompletedModules(profile.completedModules),
    );
    if (
      !validUsers ||
      (parsed.activeUsername !== null &&
        (typeof parsed.activeUsername !== "string" || !parsed.users[parsed.activeUsername]))
    ) {
      throw new Error("The saved learner profiles could not be read.");
    }

    return {
      store: { activeUsername: parsed.activeUsername, users: parsed.users },
      error: "",
    };
  } catch (error) {
    return {
      store: { activeUsername: null, users: {} },
      error: `Could not read saved learner data: ${error.message}`,
    };
  }
}

function App() {
  const [activeView, setActiveView] = useState("Overview");
  const [search, setSearch] = useState("");
  const [profileState, setProfileState] = useState(() => {
    const initial = loadProfileState();
    return {
      ...initial,
      dialogOpen: !initial.store.activeUsername || Boolean(initial.error),
    };
  });
  const [selectedModule, setSelectedModule] = useState(null);
  const [resourcesModule, setResourcesModule] = useState(null);
  const [copiedPrompt, setCopiedPrompt] = useState("");
  const activeProfile = profileState.store.users[profileState.store.activeUsername];
  const completedModules = activeProfile?.completedModules || [];
  const progress = Math.round((completedModules.length / modules.length) * 100);
  const nextModule =
    modules.find((module) => !completedModules.includes(module.id)) || modules[modules.length - 1];

  const filteredModules = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return modules;
    return modules.filter((module) =>
      `${module.title} ${module.project} ${module.topic}`.toLowerCase().includes(query),
    );
  }, [search]);

  function saveProfileStore(nextStore) {
    try {
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(nextStore));
      setProfileState((current) => ({ ...current, store: nextStore, error: "" }));
      return true;
    } catch (error) {
      setProfileState((current) => ({
        ...current,
        error: `Could not save learner data in this browser: ${error.message}`,
      }));
      return false;
    }
  }

  function addLearner(displayName) {
    const cleanName = displayName.trim().replace(/\s+/g, " ");
    const username = cleanName.toLowerCase();
    if (cleanName.length < 2 || cleanName.length > 32) {
      return "Enter a username between 2 and 32 characters.";
    }
    if (!/^[a-zA-Z0-9][a-zA-Z0-9._ -]{1,31}$/.test(cleanName)) {
      return "Use letters, numbers, spaces, dots, underscores, or hyphens.";
    }
    if (profileState.store.users[username]) {
      return "That username already exists. Select it from the learner list.";
    }

    let completed = [];
    if (Object.keys(profileState.store.users).length === 0) {
      try {
        const legacyProgress = window.localStorage.getItem(LEGACY_PROGRESS_KEY);
        if (legacyProgress) {
          const parsed = JSON.parse(legacyProgress);
          if (!isValidCompletedModules(parsed)) {
            return "Existing saved progress could not be read. Clear the browser's saved course data before creating a profile.";
          }
          completed = [...new Set(parsed)].sort((a, b) => a - b);
        }
      } catch (error) {
        return `Could not read existing course progress: ${error.message}`;
      }
    }

    const nextStore = {
      activeUsername: username,
      users: {
        ...profileState.store.users,
        [username]: { displayName: cleanName, completedModules: completed },
      },
    };
    if (saveProfileStore(nextStore)) {
      setProfileState((current) => ({ ...current, dialogOpen: false }));
    }
    return "";
  }

  function selectLearner(username) {
    const nextStore = { ...profileState.store, activeUsername: username };
    if (saveProfileStore(nextStore)) {
      setProfileState((current) => ({ ...current, dialogOpen: false }));
    }
  }

  function resetLocalProfiles() {
    try {
      window.localStorage.removeItem(PROFILE_STORAGE_KEY);
      window.localStorage.removeItem(LEGACY_PROGRESS_KEY);
      setProfileState({
        store: { activeUsername: null, users: {} },
        error: "",
        dialogOpen: true,
      });
      return "";
    } catch (error) {
      return `Could not clear local learner data: ${error.message}`;
    }
  }

  function toggleComplete(moduleId) {
    const nextCompleted = completedModules.includes(moduleId)
      ? completedModules.filter((id) => id !== moduleId)
      : [...completedModules, moduleId].sort((a, b) => a - b);
    saveProfileStore({
      ...profileState.store,
      users: {
        ...profileState.store.users,
        [profileState.store.activeUsername]: {
          ...activeProfile,
          completedModules: nextCompleted,
        },
      },
    });
  }

  async function copyPrompt(prompt) {
    await navigator.clipboard.writeText(prompt.text);
    setCopiedPrompt(prompt.tag);
    window.setTimeout(() => setCopiedPrompt(""), 1800);
  }

  function selectView(view) {
    setSearch("");
    setActiveView(view);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview" onClick={() => selectView("Overview")}>
          <span className="brand-mark"><Icon name="spark" size={19} /></span>
          <span className="brand-name">fieldnotes<span>.</span></span>
        </a>
        <div className="workspace-label">YOUR LEARNING SPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          {[
            ["Overview", "chart"],
            ["Curriculum", "terminal"],
            ["Prompt library", "spark"],
            ["Course materials", "file"],
          ].map(([label, icon]) => (
            <button
              aria-label={label}
              className={`nav-link ${activeView === label ? "active" : ""}`}
              key={label}
              onClick={() => selectView(label)}
              type="button"
            >
              <Icon name={icon} size={18} />
              <span>{label}</span>
              {label === "Curriculum" && <span className="nav-count">12</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <span className="note-icon"><Icon name="shield" size={17} /></span>
            <p><strong>A note on AI</strong><br />Your curiosity is the best tool. Verify what AI suggests.</p>
            <button type="button" onClick={() => selectView("Course materials")}>Read the guide <span>↗</span></button>
          </div>
          <button
            aria-label="Switch learner profile"
            className="profile"
            onClick={() => setProfileState((current) => ({ ...current, dialogOpen: true }))}
            type="button"
          >
            <div className="avatar">{activeProfile?.displayName?.[0]?.toUpperCase() || <Icon name="user" size={16} />}</div>
            <div><strong>{activeProfile?.displayName || "Choose learner"}</strong><span>Local learner profile</span></div>
            <span className="profile-dots">···</span>
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumbs"><span>My learning</span><span className="crumb-slash">/</span><strong>{activeView}</strong></div>
          <div className="topbar-actions">
            <label className="search-box">
              <Icon name="spark" size={16} />
              <input
                aria-label="Search lessons"
                placeholder="Search lessons..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  if (event.target.value) setActiveView("Curriculum");
                }}
              />
              <kbd>⌘ K</kbd>
            </label>
            <button
              className="icon-button"
              type="button"
              aria-label="Open course materials"
              onClick={() => selectView("Course materials")}
            >
              <Icon name="file" size={19} />
            </button>
            <button
              className="icon-button user-switch-button"
              type="button"
              aria-label="Switch learner profile"
              onClick={() => setProfileState((current) => ({ ...current, dialogOpen: true }))}
            >
              {activeProfile?.displayName?.[0]?.toUpperCase() || <Icon name="user" size={17} />}
            </button>
          </div>
        </header>

        <div className="page-content">
          {profileState.error && (
            <div className="storage-error" role="alert">
              <Icon name="shield" size={17} />
              <span>{profileState.error}</span>
            </div>
          )}
          {activeView === "Overview" && (
            <Overview
              completedModules={completedModules}
              nextModule={nextModule}
              openModule={setSelectedModule}
              progress={progress}
              setView={selectView}
            />
          )}
          {activeView === "Curriculum" && (
            <Curriculum
              completedModules={completedModules}
              filteredModules={filteredModules}
              openModule={setSelectedModule}
              search={search}
            />
          )}
          {activeView === "Prompt library" && (
            <PromptLibrary copiedPrompt={copiedPrompt} copyPrompt={copyPrompt} />
          )}
          {activeView === "Course materials" && <CourseGuide />}
        </div>
      </main>

      {selectedModule && (
        <ModuleDialog
          completed={completedModules.includes(selectedModule.id)}
          module={selectedModule}
          onOpenFiles={() => {
            setResourcesModule(selectedModule);
            setSelectedModule(null);
          }}
          onClose={() => setSelectedModule(null)}
          onToggleComplete={() => toggleComplete(selectedModule.id)}
        />
      )}
      {resourcesModule && (
        <LabFilesDialog
          files={getLabFiles(resourcesModule)}
          module={resourcesModule}
          onClose={() => setResourcesModule(null)}
        />
      )}
      {profileState.dialogOpen && (
        <ProfileDialog
          activeUsername={profileState.store.activeUsername}
          error={profileState.error}
          isRequired={!activeProfile}
          onAdd={addLearner}
          onReset={resetLocalProfiles}
          onClose={() => {
            if (activeProfile) setProfileState((current) => ({ ...current, dialogOpen: false }));
          }}
          onSelect={selectLearner}
          users={profileState.store.users}
        />
      )}
    </div>
  );
}

function Overview({ completedModules, nextModule, openModule, progress, setView }) {
  const featuredModules = modules.slice(0, 4);
  const journey = [
    { number: "01", title: "Get comfortable", caption: "Python & first programs", ids: [1, 2, 3] },
    { number: "02", title: "Build for people", caption: "Web & databases", ids: [4, 5, 6] },
    { number: "03", title: "Connect & create", caption: "APIs & AI", ids: [7, 8] },
    { number: "04", title: "Make it reliable", caption: "Reports, tests & release", ids: [9, 10, 11] },
    { number: "05", title: "Make it yours", caption: "Capstone project", ids: [12] },
  ];
  const currentJourneyStep = journey.findIndex((step) =>
    step.ids.some((id) => !completedModules.includes(id)),
  );
  return (
    <>
      <section className="welcome-row">
        <div>
          <p className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT CHAPTER STARTS HERE</p>
          <h1>Small steps.<br /><span>Real things you can build.</span></h1>
          <p className="welcome-copy">
            A hands-on introduction to coding with AI. No experience needed, just a little curiosity.
          </p>
        </div>
        <div className="welcome-illustration" aria-hidden="true">
          <div className="illustration-orbit orbit-one" />
          <div className="illustration-orbit orbit-two" />
          <div className="illustration-sun"><Icon name="spark" size={29} /></div>
          <span className="float-card float-code">{"{ }"}</span>
          <span className="float-card float-cursor">↗</span>
          <span className="illustration-caption">MAKE · TEST · LEARN</span>
        </div>
      </section>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-icon stat-violet"><Icon name="terminal" size={18} /></span>
          <div><strong>12</strong><span>hands-on modules</span></div>
          <span className="stat-decoration">01—12</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon stat-peach"><Icon name="chart" size={18} /></span>
          <div><strong>5–7 <small>hrs / week</small></strong><span>at your own pace</span></div>
          <span className="stat-decoration">YOUR PACE</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon stat-green"><Icon name="flag" size={18} /></span>
          <div><strong>{progress}%</strong><span>course progress</span></div>
          <span className="mini-progress"><i style={{ width: `${progress}%` }} /></span>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="course-column">
          <div className="section-heading">
            <div><p className="section-kicker">PICK UP WHERE YOU LEFT OFF</p><h2>Your learning path</h2></div>
            <button className="text-button" type="button" onClick={() => setView("Curriculum")}>All modules <span>→</span></button>
          </div>
          <article className="continue-card">
            <div className={`continue-art ${nextModule.color}`}>
              <span className="lesson-number">MODULE {String(nextModule.id).padStart(2, "0")}</span>
              <div className="lesson-art-icon"><Icon name={nextModule.icon} size={28} /></div>
              <span className="art-line art-line-one" /><span className="art-line art-line-two" />
              <span className="art-bottom-label">FIELDNOTE / {String(nextModule.id).padStart(2, "0")}</span>
            </div>
            <div className="continue-details">
              <div className="module-meta"><span className="module-chip">UP NEXT</span><span>{nextModule.duration}</span></div>
              <h3>{nextModule.title}</h3>
              <p>{nextModule.topic}</p>
              <div className="continue-footer">
                <span>{completedModules.length} of 12 modules complete</span>
                <button className="primary-button" type="button" onClick={() => openModule(nextModule)}>
                  {completedModules.length ? "Continue learning" : "Start learning"} <span>→</span>
                </button>
              </div>
              <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
            </div>
          </article>

          <div className="section-heading modules-heading">
            <div><p className="section-kicker">A LITTLE, THEN A LITTLE MORE</p><h2>Start with the foundations</h2></div>
            <span className="muted-caption">MODULES 01—04</span>
          </div>
          <div className="module-list">
            {featuredModules.map((module) => (
              <ModuleRow
                completed={completedModules.includes(module.id)}
                key={module.id}
                module={module}
                onClick={() => openModule(module)}
              />
            ))}
          </div>
        </section>

        <aside className="right-column">
          <section className="journey-card">
            <div className="aside-heading"><h3>The journey</h3><span className="journey-count">12 weeks</span></div>
            <div className="journey-list">
              {journey.map((step, index) => {
                const done = step.ids.every((id) => completedModules.includes(id));
                const current = index === currentJourneyStep;
                const status = done ? "done" : current ? "current" : "";
                return (
                <div className={`journey-item ${status}`} key={step.number}>
                  <span className="journey-marker">{done ? "✓" : step.number}</span>
                  <div><strong>{step.title}</strong><span>{step.caption}</span></div>
                  {current && <span className="current-tag">NOW</span>}
                </div>
                );
              })}
            </div>
            <button className="journey-link" type="button" onClick={() => setView("Curriculum")}>Explore the full curriculum <span>↗</span></button>
          </section>

          <section className="tip-card">
            <span className="tip-kicker"><Icon name="spark" size={15} /> A THOUGHT TO KEEP</span>
            <blockquote>“AI can help you move faster. Understanding helps you go further.”</blockquote>
            <button type="button" onClick={() => setView("Prompt library")}>Find a useful prompt <span>→</span></button>
            <span className="tip-decoration">✳</span>
          </section>

          <div className="privacy-note"><Icon name="shield" size={17} /><p><strong>Keep your learning safe.</strong> Never share passwords, API keys, or real personal records with an AI assistant.</p></div>
        </aside>
      </div>
      <footer className="page-footer"><span>FIELDNOTES FOR CURIOUS MINDS</span><span>Made for learning, one small build at a time.</span></footer>
    </>
  );
}

function ModuleRow({ module, completed, onClick }) {
  return (
    <button className="module-row" type="button" onClick={onClick}>
      <span className={`module-icon ${module.color}`}><Icon name={module.icon} size={18} /></span>
      <span className="module-row-copy">
        <span className="module-row-title">{module.title}</span>
        <span className="module-row-subtitle">{module.project} <i>·</i> {module.topic}</span>
      </span>
      <span className="module-row-time">{completed ? "COMPLETED" : module.duration}</span>
      <span className={`module-row-arrow ${completed ? "is-done" : ""}`}>{completed ? "✓" : "↗"}</span>
    </button>
  );
}

function Curriculum({ completedModules, filteredModules, openModule, search }) {
  const grouped = [
    { title: "The foundations", range: "01 — 04", ids: [1, 2, 3, 4] },
    { title: "Build with data", range: "05 — 08", ids: [5, 6, 7, 8] },
    { title: "Make it reliable", range: "09 — 12", ids: [9, 10, 11, 12] },
  ];
  return (
    <section className="inner-page">
      <p className="eyebrow"><span className="eyebrow-dot" /> THE FULL LEARNING PATH</p>
      <div className="inner-title-row"><div><h1>Course curriculum</h1><p>One project at a time. Learn by making, testing, and reflecting.</p></div><div className="curriculum-total"><strong>{completedModules.length}<span> / 12</span></strong><small>modules complete</small></div></div>
      {search ? (
        <section className="curriculum-group">
          <div className="group-heading"><h2>Search results</h2><span>{filteredModules.length} FOUND</span></div>
          {filteredModules.length ? filteredModules.map((module) => (
            <ModuleRow key={module.id} module={module} completed={completedModules.includes(module.id)} onClick={() => openModule(module)} />
          )) : <p className="empty-search">No lessons match “{search}”. Try a topic like Python, data, or AI.</p>}
        </section>
      ) : grouped.map((group) => (
        <section className="curriculum-group" key={group.title}>
          <div className="group-heading"><h2>{group.title}</h2><span>MODULES {group.range}</span></div>
          <div className="module-list">
            {modules.filter((module) => group.ids.includes(module.id)).map((module) => (
              <ModuleRow key={module.id} module={module} completed={completedModules.includes(module.id)} onClick={() => openModule(module)} />
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}

function PromptLibrary({ copiedPrompt, copyPrompt }) {
  return (
    <section className="inner-page">
      <p className="eyebrow"><span className="eyebrow-dot" /> YOUR AI SIDEKICK, USED THOUGHTFULLY</p>
      <div className="inner-title-row"><div><h1>A better way to ask</h1><p>Use a prompt as a starting point. Add your context, then verify the answer.</p></div><span className="prompt-spark"><Icon name="spark" size={26} /></span></div>
      <div className="prompt-grid">
        {prompts.map((prompt, index) => (
          <article className="prompt-card" key={prompt.tag}>
            <div className="prompt-card-top"><span className="prompt-tag">{prompt.tag}</span><span className="prompt-index">{String(index + 1).padStart(2, "0")}</span></div>
            <h2>{prompt.title}</h2>
            <p>{prompt.text}</p>
            <button className="copy-button" type="button" onClick={() => copyPrompt(prompt)}>
              <Icon name="file" size={16} /> {copiedPrompt === prompt.tag ? "Copied to clipboard" : "Copy prompt"}
            </button>
          </article>
        ))}
      </div>
      <div className="prompt-reminder"><Icon name="shield" size={19} /><div><strong>Before you paste anything</strong><p>Never share secrets, passwords, API keys, confidential information, or real student records with an AI assistant.</p></div></div>
      <p className="source-note">All 15 prompts are adapted from <code>course/AI_PROMPT_LIBRARY.md</code>. Never share secrets or confidential data.</p>
    </section>
  );
}

function CourseGuide() {
  const [selectedPath, setSelectedPath] = useState("/course/COURSE_MAP.md");
  const selectedMaterial = courseMaterials.find((material) => material.path === selectedPath);

  return (
    <section className="inner-page">
      <p className="eyebrow"><span className="eyebrow-dot" /> COURSE KNOWLEDGE &amp; TEACHING RESOURCES</p>
      <div className="inner-title-row"><div><h1>Course materials</h1><p>Explore the complete course pack, instructor references, and project templates.</p></div><span className="guide-icon"><Icon name="file" size={25} /></span></div>
      <div className="materials-layout">
        <nav aria-label="Course documents" className="materials-sidebar">
          {["COURSE", "INSTRUCTOR", "TEMPLATES"].map((group) => (
            <div className="materials-group" key={group}>
              <span className="materials-group-label">{group}</span>
              {courseMaterials.filter((material) => material.group === group).map((material) => (
                <button
                  aria-current={material.path === selectedPath ? "page" : undefined}
                  className={`material-link ${material.path === selectedPath ? "selected" : ""}`}
                  key={material.path}
                  onClick={() => setSelectedPath(material.path)}
                  type="button"
                >
                  <Icon name={group === "TEMPLATES" ? "file" : group === "INSTRUCTOR" ? "shield" : "book"} size={15} />
                  <span>{material.title}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>
        <article className="material-document">
          {selectedMaterial?.content ? (
            <>
              <div className="material-document-header">
                <div><span>{selectedMaterial.group}</span><strong>{selectedMaterial.title}</strong></div>
                <code>{selectedMaterial.path.slice(1)}</code>
              </div>
              <div className="markdown-body"><MarkdownDocument source={selectedMaterial.content} /></div>
            </>
          ) : (
            <div className="files-empty-state"><Icon name="file" size={24} /><p>This course document could not be loaded.</p></div>
          )}
        </article>
      </div>
      <p className="source-note">Documents are rendered from the course, solutions, and templates folders in this project.</p>
    </section>
  );
}

function ProfileDialog({
  activeUsername,
  error,
  isRequired,
  onAdd,
  onClose,
  onReset,
  onSelect,
  users,
}) {
  const [username, setUsername] = useState("");
  const [formError, setFormError] = useState("");
  const [resetError, setResetError] = useState("");
  const learnerList = Object.entries(users);

  function submitLearner(event) {
    event.preventDefault();
    setFormError(onAdd(username));
  }

  function resetTracking() {
    if (!window.confirm("Clear all locally saved learner profiles and course progress in this browser?")) {
      return;
    }
    setResetError(onReset());
  }

  return (
    <div
      className="dialog-backdrop profile-backdrop"
      onMouseDown={(event) => {
        if (!isRequired && event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="profile-dialog-title"
        aria-modal="true"
        className="module-dialog profile-dialog"
        role="dialog"
      >
        {!isRequired && (
          <button aria-label="Close learner profiles" className="dialog-close" onClick={onClose} type="button">×</button>
        )}
        <div className="profile-dialog-content">
          <span className="profile-dialog-icon"><Icon name="user" size={22} /></span>
          <p className="eyebrow"><span className="eyebrow-dot" /> PROGRESS SAVED ON THIS BROWSER</p>
          <h2 id="profile-dialog-title">{isRequired ? "Who’s learning today?" : "Learner profiles"}</h2>
          <p className="profile-dialog-copy">
            Add a username to keep each learner’s course progress separate on this device.
            No account or password is needed.
          </p>

          {error && <p className="profile-error" role="alert">{error}</p>}
          {learnerList.length > 0 && (
            <div className="learner-list" aria-label="Saved learner profiles">
              {learnerList.map(([key, profile]) => (
                <button
                  aria-current={key === activeUsername ? "true" : undefined}
                  className={`learner-option ${key === activeUsername ? "selected" : ""}`}
                  key={key}
                  onClick={() => onSelect(key)}
                  type="button"
                >
                  <span className="avatar">{profile.displayName[0].toUpperCase()}</span>
                  <span className="learner-option-name">{profile.displayName}</span>
                  <span className="learner-option-progress">{profile.completedModules.length}/12 complete</span>
                  {key === activeUsername && <span className="learner-active-label">ACTIVE</span>}
                </button>
              ))}
            </div>
          )}

          <form className="learner-form" onSubmit={submitLearner}>
            <label htmlFor="learner-username">{learnerList.length ? "ADD ANOTHER LEARNER" : "CHOOSE A USERNAME"}</label>
            <div className="learner-form-row">
              <input
                autoFocus={isRequired}
                autoComplete="off"
                id="learner-username"
                maxLength={32}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setFormError("");
                }}
                placeholder="e.g. Alex"
                value={username}
              />
              <button className="primary-button" type="submit">Add learner <span>→</span></button>
            </div>
            <span className="learner-hint">2–32 characters · letters, numbers, spaces, dots, _ or -</span>
            {formError && <p className="profile-error" role="alert">{formError}</p>}
          </form>

          <div className="profile-local-note">
            <Icon name="shield" size={16} />
            <p>This is a local profile, not a secure login. Progress stays in this browser and is not shared across devices.</p>
          </div>
          {(error || resetError) && (
            <button className="reset-local-button" onClick={resetTracking} type="button">
              Reset saved learner data
            </button>
          )}
          {resetError && <p className="profile-error" role="alert">{resetError}</p>}
        </div>
      </section>
    </div>
  );
}

function ModuleDialog({ module, completed, onClose, onOpenFiles, onToggleComplete }) {
  return (
    <div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section aria-labelledby="dialog-title" aria-modal="true" className="module-dialog" role="dialog">
        <button aria-label="Close module details" className="dialog-close" onClick={onClose} type="button">×</button>
        <div className={`dialog-art ${module.color}`}><span>FIELDNOTE / {String(module.id).padStart(2, "0")}</span><Icon name={module.icon} size={34} /></div>
        <div className="dialog-content">
          <p className="eyebrow"><span className="eyebrow-dot" /> MODULE {String(module.id).padStart(2, "0")} · {module.duration.toUpperCase()}</p>
          <h2 id="dialog-title">{module.title}</h2>
          <p className="dialog-description">{module.description}</p>
          <div className="detail-block"><span>WHAT YOU'LL MAKE</span><strong>{module.project}</strong><p>{module.outcome}</p></div>
          <div className="detail-block"><span>TRY THIS</span><p>{module.practice}</p></div>
          <div className="run-command"><span>START HERE</span><code>{module.run}</code></div>
          <button className="browse-files-button" onClick={onOpenFiles} type="button">
            <Icon name="file" size={16} /> View lab instructions &amp; files <span>→</span>
          </button>
          <button className={`primary-button complete-button ${completed ? "completed-button" : ""}`} onClick={onToggleComplete} type="button">
            {completed ? "✓  Marked complete — undo" : "Mark module complete"} <span>{completed ? "" : "→"}</span>
          </button>
        </div>
      </section>
    </div>
  );
}

function LabFilesDialog({ files, module, onClose }) {
  const [selectedPath, setSelectedPath] = useState(
    files.find((file) => file.name === "README.md")?.path || files[0]?.path || "",
  );
  const selectedFile = files.find((file) => file.path === selectedPath);
  const isMarkdown = selectedFile?.name.toLowerCase().endsWith(".md");
  const isCsv = selectedFile?.name.toLowerCase().endsWith(".csv");
  const language = selectedFile ? languageForFile(selectedFile.name) : "text";

  return (
    <div
      className="dialog-backdrop files-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="files-dialog-title"
        aria-modal="true"
        className="files-dialog"
        role="dialog"
      >
        <header className="files-header">
          <div className={`files-header-icon ${module.color}`}><Icon name={module.icon} size={22} /></div>
          <div className="files-header-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> LAB {String(module.id).padStart(2, "0")} · {files.length} FILES</p>
            <h2 id="files-dialog-title">{module.project}</h2>
          </div>
          <button aria-label="Close lab files" className="dialog-close" onClick={onClose} type="button">×</button>
        </header>
        <div className="files-browser">
          <nav aria-label="Lab files" className="files-sidebar">
            <span className="files-sidebar-label">PROJECT FILES</span>
            <span className="files-folder"><Icon name="file" size={15} /> {module.path.slice(0, module.path.lastIndexOf("/")).split("/").pop()}</span>
            {files.map((file) => (
              <button
                aria-current={file.path === selectedPath ? "page" : undefined}
                className={`file-item ${file.path === selectedPath ? "selected" : ""}`}
                key={file.path}
                onClick={() => setSelectedPath(file.path)}
                type="button"
              >
                <Icon name={file.name.endsWith(".md") ? "file" : file.name.endsWith(".py") ? "terminal" : "code"} size={14} />
                <span>{file.name}</span>
              </button>
            ))}
            {files.length === 0 && <p className="files-empty">No lab files are available for this module yet.</p>}
          </nav>
          <section aria-label={selectedFile?.name || "File preview"} className="file-preview">
            {selectedFile ? (
              <>
                <div className="file-preview-toolbar">
                  <span>{selectedFile.path}</span>
                  <span className="file-format">{isMarkdown ? "DOCUMENT" : isCsv ? "DATA TABLE" : language.toUpperCase()}</span>
                </div>
                {isMarkdown ? (
                  <div className="markdown-body lab-markdown"><MarkdownDocument source={selectedFile.content} /></div>
                ) : isCsv ? (
                  <CsvTable source={selectedFile.content} />
                ) : (
                  <HighlightedCode source={selectedFile.content} language={language} />
                )}
              </>
            ) : (
              <div className="files-empty-state"><Icon name="file" size={24} /><p>Select a file to preview it.</p></div>
            )}
          </section>
        </div>
        <footer className="files-footer">
          <span>Read-only preview · Files are part of the course materials.</span>
          <button className="files-done-button" onClick={onClose} type="button">Done</button>
        </footer>
      </section>
    </div>
  );
}

export default App;
