# Angular Expandable Multi-Select Table

An interactive, hierarchical data table built with Angular that renders nested JSON records with expandable child rows and persistent multi-row selection.

## Features

- **JSON Data Binding:** Loads structured hierarchical row data from `src/rows-data.json`.
- **Recursive Expand & Collapse:** Supports multi-level parent-child hierarchies (e.g., `2` -> `2.1` -> `2.1.1`) with visual depth indentation.
- **Persistent Multi-Row Selection:** Clicking any row toggles its selection state and highlights it with a distinct background color (`#dbeafe`) that remains active until the row is clicked again.
- **Independent Controls:** Expanding or collapsing parent rows does not alter active row selections.

## Project Structure

```text
├── src/
│   ├── index.html        # Application entry HTML
│   ├── main.ts           # Standalone Angular component, state signals, and table logic
│   └── rows-data.json    # Hierarchical JSON dataset
└── package.json
