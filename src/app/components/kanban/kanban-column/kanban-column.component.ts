import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanColumn } from '../util';
import { KanbanGroupComponent } from '../kanban-group/kanban-group.component';

export interface KanbanColumnProps {
  column: KanbanColumn;
  customClass?: string;
}

@Component({
  selector: 'app-kanban-column',
  standalone: true,
  imports: [CommonModule, KanbanGroupComponent],
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.css'],
})
export class KanbanColumnComponent {
  @Input() set column(value: KanbanColumn) {
    if (!value) {
      throw new Error('Column is required for kanban column');
    }
    this._column = value;
  }
  get column(): KanbanColumn {
    return this._column;
  }
  private _column!: KanbanColumn;

  @Input() set customClass(value: string) {
    this._customClass = value || '';
  }
  get customClass(): string {
    return this._customClass;
  }
  private _customClass = '';

  @Output() groupCollapsedChange = new EventEmitter<{assignee: string, collapsed: boolean}>();

  onGroupCollapsedChange(assignee: string, collapsed: boolean): void {
    this.groupCollapsedChange.emit({ assignee, collapsed });
  }

  getTotalItemCount(): number {
    return this.column.groups.reduce((total, group) => total + group.items.length, 0);
  }

  getStatusDisplayName(): string {
    // Convert status to display-friendly format
    switch (this.column.status) {
      case 'InProgress':
        return 'In Progress';
      default:
        return this.column.status;
    }
  }

  getStatusClass(): string {
    return `status-${this.column.status.toLowerCase()}`;
  }

  getSortedGroups() {
    return [...this.column.groups].sort((a, b) => {
      const nameA = a.assignee?.toLowerCase() || '';
      const nameB = b.assignee?.toLowerCase() || '';
      return nameA.localeCompare(nameB);
    });
  }
}
