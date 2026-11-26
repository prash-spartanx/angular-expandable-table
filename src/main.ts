import '@angular/compiler';
import { Component, computed, OnInit, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import rowsData from './rows-data.json';

export interface TableRow {
  id: string;
  text1: string;
  text2: string;
  children: TableRow[];
}

interface RowsResponse {
  rows: TableRow[];
}

export interface FlattenedRow {
  row: TableRow;
  depth: number;
  hasChildren: boolean;
}

@Component({
  selector: 'app-root',
  template: `
    <main class="container">
      <h2>Expandable Multi-Select Table</h2>
      <p class="hint">
        Click any row to toggle highlight. Click the arrow on parent rows to expand or collapse children.
      </p>

      <div class="selection-summary">
        Selected IDs:
        @if (selectedIds().size === 0) {
          <span>None</span>
        } @else {
          <span>{{ selectedIdsText() }}</span>
        }
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Text 1</th>
            <th>Text 2</th>
          </tr>
        </thead>
        <tbody>
          @for (item of visibleRows(); track item.row.id) {
            <tr
              [class.selected]="isSelected(item.row.id)"
              [class.child-row]="item.depth > 0"
              (click)="toggleSelect(item.row.id)"
            >
              <td>
                <div
                  class="id-cell"
                  [style.padding-left.px]="item.depth * 24"
                >
                  @if (item.hasChildren) {
                    <button
                      type="button"
                      class="expand-btn"
                      [attr.aria-label]="isExpanded(item.row.id) ? 'Collapse row ' + item.row.id : 'Expand row ' + item.row.id"
                      (click)="toggleExpand(item.row.id, $event)"
                    >
                      {{ isExpanded(item.row.id) ? '▾' : '▸' }}
                    </button>
                  } @else {
                    <span class="expand-spacer"></span>
                  }
                  <span>{{ item.row.id }}</span>
                </div>
              </td>
              <td>{{ item.row.text1 }}</td>
              <td>{{ item.row.text2 }}</td>
            </tr>
          }
        </tbody>
      </table>
    </main>
  `,
  styles: [
    `
    .container {
      max-width: 780px;
      margin: 2rem auto;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .hint {
      color: #555;
      margin-bottom: 0.75rem;
    }

    .selection-summary {
      margin-bottom: 1rem;
      font-size: 0.95rem;
      font-weight: 500;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #d0d7de;
    }

    .data-table th,
    .data-table td {
      padding: 0.65rem 0.85rem;
      border-bottom: 1px solid #e5e7eb;
      text-align: left;
    }

    .data-table th {
      background-color: #f6f8fa;
      font-weight: 600;
    }

    .data-table tbody tr {
      background-color: #ffffff;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }

    .data-table tbody tr:hover {
      background-color: #f3f4f6;
    }

    .data-table tbody tr.selected,
    .data-table tbody tr.selected:hover {
      background-color: #dbeafe;
    }

    .id-cell {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .expand-btn {
      width: 1.5rem;
      height: 1.5rem;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      background: #ffffff;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
    }

    .expand-btn:hover {
      background: #e2e8f0;
    }

    .expand-spacer {
      display: inline-block;
      width: 1.5rem;
    }
  `,
  ],
})
export class App implements OnInit {
  readonly rootRows = signal<TableRow[]>([]);
  readonly expandedIds = signal<Set<string>>(new Set());
  readonly selectedIds = signal<Set<string>>(new Set());

  readonly selectedIdsText = computed(() =>
    Array.from(this.selectedIds()).join(', ')
  );

  readonly visibleRows = computed<FlattenedRow[]>(() => {
    const result: FlattenedRow[] = [];
    const expanded = this.expandedIds();

    const traverse = (nodes: TableRow[], depth: number) => {
      for (const node of nodes) {
        const hasChildren =
          Array.isArray(node.children) && node.children.length > 0;
        result.push({ row: node, depth, hasChildren });

        if (hasChildren && expanded.has(node.id)) {
          traverse(node.children, depth + 1);
        }
      }
    };

    traverse(this.rootRows(), 0);
    return result;
  });

  ngOnInit(): void {
    const data = rowsData as RowsResponse;
    this.rootRows.set(data.rows ?? []);
  }

  toggleExpand(rowId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.expandedIds.update((prev) => {
      const next = new Set(prev);
      if (next.has(rowId)) {
        next.delete(rowId);
      } else {
        next.add(rowId);
      }
      return next;
    });
  }

  toggleSelect(rowId: string): void {
    this.selectedIds.update((prev) => {
      const next = new Set(prev);
      if (next.has(rowId)) {
        next.delete(rowId);
      } else {
        next.add(rowId);
      }
      return next;
    });
  }

  isExpanded(rowId: string): boolean {
    return this.expandedIds().has(rowId);
  }

  isSelected(rowId: string): boolean {
    return this.selectedIds().has(rowId);
  }
}

bootstrapApplication(App);
