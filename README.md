# Angular Expandable Multi-Select Table

An interactive hierarchical data table built with Angular that renders nested JSON records with expandable child rows and persistent multi-row selection.

## Features

- **JSON Data Source:** Loads structured hierarchical row data from `src/rows-data.json`.
- **Recursive Expand & Collapse:** Supports multi-level parent-child hierarchies (`2` → `2.1` → `2.1.1`) with depth-based indentation.
- **Persistent Multi-Row Selection:** Clicking any row toggles its selection state and highlights it with a light blue background (`#dbeafe`) that remains active until the row is clicked again.
- **Decoupled Interactions:** Expanding or collapsing parent rows does not affect active row selections.

## Project Structure

```text
├── src/
│   ├── index.html        # Application entry HTML
│   ├── main.ts           # Standalone Angular component, reactive state signals, and table UI
│   └── rows-data.json    # Hierarchical JSON dataset
├── angular.json          # Angular workspace configuration
├── package.json          # Dependencies and npm scripts
└── tsconfig.json         # TypeScript configuration
```

## Local Setup & Installation

### 1. Prerequisites

Ensure **Node.js (LTS)** and **npm** are installed on your machine:

```bash
node -v
npm -v
```

If not installed, download and install Node.js LTS from [nodejs.org](https://nodejs.org/).

### 2. Clone the Repository

```bash
git clone https://github.com/prash-spartanx/angular-expandable-table
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Application

```bash
npm start
```

*(Alternatively, if Angular CLI is installed globally, you can run `ng serve -o`.)*

Once compiled, open your browser and navigate to:

```text
http://localhost:4200
```

## How to Test & Verify Functionality

1. **Initial Data Load:**
   - Verify that top-level rows **`1`**, **`2`**, and **`4`** render with their respective `Text 1` and `Text 2` values loaded from `src/rows-data.json`.
   - Confirm child rows (`2.1` and `2.1.1`) are hidden initially.

2. **Expand & Collapse Hierarchy:**
   - Click the expand arrow (`▸`) next to row **`2`** → row **`2.1`** appears indented underneath it.
   - Click the expand arrow (`▸`) next to row **`2.1`** → row **`2.1.1`** appears indented underneath `2.1`.
   - Click the collapse arrows (`▾`) again → child rows collapse cleanly.

3. **Multi-Row Selection & Persistent Highlight:**
   - Click on row **`1`**, row **`2`**, and row **`2.1`** → all clicked rows change background color to light blue (`#dbeafe`) simultaneously, and the **Selected IDs** summary updates to reflect all active selections.
   - Click an already-selected row (e.g., row **`1`**) a second time → its background resets to white while the other selected rows remain highlighted.
   - Expand or collapse a parent row while rows are selected → verify that existing row highlights remain intact.
